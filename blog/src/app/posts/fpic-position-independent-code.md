---
title: Demystifying the -fPIC flag - Understanding Position-Independent Code with Example
publishedAt: 2024-07-20
description: ''
image: ''
tags: ['c', 'library']
category: 'Low Level'
draft: false 
---

# Position-independent code

When we compile for example a static library, that will be directly linked to the final executable, the compiler generates machine code for the functions we wrote in the library. This machine code, or instructions are stored in some place in the computer's memory. So, when we compile a static library libmatrix.a, the machine code for the functions in the library is stored in the library file. When we link the library to the final executable, the linker copies the machine code from the library file to the executable file, and the code is executed at the memory address where it was copied. So, the code is not position-independent, because it is executed at a fixed memory address, address which is known at compile time.

For example, if we have a function `add` in the library, and the machine code for the function is stored at memory address `0x1000`, the function will be executed at memory address `0x1000` when the program is run.

Buttt, what about in dynamic libraries (shared libraries) that are loaded at runtime by the operating system?

The dynamic linker loads the shared library into memory at a random memory address, so the memory addresses of the functions in the library are not known at compile time. 
For example, if two different processes load the same shared library, the library will be loaded at different memory addresses in each process, so the memory addresses of the functions in the library will be different in each process. If the code in the library uses absolute memory addresses to access functions or variables, the code break since those addresses would not be valid in the new address space of each process.

When you compile a program, the compiler generates machine code that contains memory addresses of functions and variables in the program. If the program is loaded at a different memory address, the memory addresses in the code will be incorrect, and the program will not run correctly. Position-independent code (PIC) solves this problem by using relative addressing instead of absolute addressing. Instead of using the actual memory address of a function or variable, the code uses an offset from the current instruction pointer to access the function or variable.

This is important for shared libraries, because the library can be loaded at any memory address by the dynamic linker, so the code in the library must be able to run at any memory address without modification. This is achieved by using relative addressing and avoiding absolute addresses in the code.

Let's illustrate this with a practical example. 

## Example

In a directory, create two files, `main.c` and `Makefile`:

`main.c`
```c
#include <stdio.h>

int		global_var = 42;

void	print_global_var(void)
{
	printf("Global variable: %d\n", global_var);
}

int	main(void)
{
	print_global_var();
	return (0);
}
```

`Makefile`
```make
all: example_no_fpic example_fpic

example_no_fpic:
	gcc -o example.o -c main.c
	gcc -o example example.o
	rm example.o
	objdump -d example > example_no_fpic.asm

example_fpic:
	gcc -o example.o -c main.c -fPIC
	gcc -o example example.o
	rm example.o
	objdump -d example > example_fpic.asm

clean:
	rm -f example* *.o *.asm
```

In this example, we have a simple C program that prints the value of a global variable. We compile this program twice: once without the `-fPIC` flag (producing `example_no_fpic`), and once with the `-fPIC` flag (producing `example_fpic`). We then disassemble the executables to see the difference in the assembly code with `objdump`

To compile and disassemble the example, run the following command:
```bash
make
```

This will generate two assembly files: `example_no_fpic.asm` and `exapmle_fpic.asm`.

Let's take a look at the assembly code for the `print_global_var` function in the `example_no_fpic` executable, let's take a look at how it is getting the value in the global variable `global_var`:

`example_no_fpic.asm`

```asm
0000000000001149 <print_global_var>:
    1149:	f3 0f 1e fa          	endbr64 
    114d:	55                   	push   %rbp
    114e:	48 89 e5             	mov    %rsp,%rbp
    1151:	8b 05 b9 2e 00 00    	mov    0x2eb9(%rip),%eax        # 4010 <global_var>
    1157:	89 c6                	mov    %eax,%esi
    1159:	48 8d 05 a4 0e 00 00 	lea    0xea4(%rip),%rax        # 2004 <_IO_stdin_used+0x4>
    1160:	48 89 c7             	mov    %rax,%rdi
    1163:	b8 00 00 00 00       	mov    $0x0,%eax
    1168:	e8 e3 fe ff ff       	call   1050 <printf@plt>
    116d:	90                   	nop
    116e:	5d                   	pop    %rbp
    116f:	c3                   	ret    
```

and now at the `example_fpic.asm`:

`example_fpic.asm`

```asm
0000000000001149 <print_global_var>:
    1149:	f3 0f 1e fa          	endbr64 
    114d:	55                   	push   %rbp
    114e:	48 89 e5             	mov    %rsp,%rbp
    1151:	48 8d 05 b8 2e 00 00 	lea    0x2eb8(%rip),%rax        # 4010 <global_var>
    1158:	8b 00                	mov    (%rax),%eax
    115a:	89 c6                	mov    %eax,%esi
    115c:	48 8d 05 a1 0e 00 00 	lea    0xea1(%rip),%rax        # 2004 <_IO_stdin_used+0x4>
    1163:	48 89 c7             	mov    %rax,%rdi
    1166:	b8 00 00 00 00       	mov    $0x0,%eax
    116b:	e8 e0 fe ff ff       	call   1050 <printf@plt>
    1170:	90                   	nop
    1171:	5d                   	pop    %rbp
    1172:	c3                   	ret    
```

Nice, let's compare them..

### Comparison

Without the -fPIC flag, the code uses an absolute memory address to access the global variable `global_var`. We can see it in the code:

```asm
mov   0x2eb9(%rip),%eax        # 4010 <global_var>
mov   %eax,%esi
```

In x86 intel assembly the `mov` instruction means `Load Value`. The `%rip` register is the `**Instruction Pointer Register**`, it holds the address of the next instruction to be executed. And the `%eax` is the `**Accumulator Register**`, it holds the value that is being loaded. The `0x2eb9` is the offset from the `%rip` register to the memory address of the global variable `global_var`. And finally, the `%esi` register is the `**Source Index Register**`, it holds the value that is being moved, it will be used later by printf function to print the variable into the screen.

So, in our case, we are 
* `loading the value` in the memory address `0x2eb9` + `%rip` into the `%eax` register
* `moving` the value in the `%eax` register to the `%esi` register

With the -fPIC flag, the code uses relative addressing to access the global variable `global_var`. We can see it in the code:

```asm
lea    0x2eb8(%rip),%rax        # 4010 <global_var>
mov    (%rax),%eax
mov    %eax,%esi
```

Here we have some new instructions and registers. The `lea` instruction means `Load Effective Address`, it loads the address of the memory location into the register, you can think of it like loading the pointer to the item we want to access. The `(%rax)` is the actual value computed by the `lea` instruction at the given pointer.

In this case, we are:
* `loading the value at the address of the pointer` of the global variable `global_var` into the `%rax` register
* `loading the value` in the memory address `%rax` into the `%eax` register
* `moving` the value in the `%eax` register to the `%esi` register

So, the code is position-independent because it does not use an absolute memory address to access the global variable `global_var`. Instead, it uses relative addressing to access the variable, so the code can run at any memory address without modification.

You can take a look at the source code of this blog post (here)[https://github.com/gabref/position-independent-magic].
{/* ::github{repo="gabref/position-independent-magic"} */}

And that's it! Now you know what position-independent code is and why it is important for shared libraries. If you want to learn more about shared libraries, take a look at this [post](../create-a-matrix-library-in-c/).
