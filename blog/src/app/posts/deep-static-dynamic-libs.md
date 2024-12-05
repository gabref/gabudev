---
title: Taking A Deeper Look Into Static And Dynamic Libraries
publishedAt: 2024-07-20
description: ''
image: ''
tags: ['libraries', 'dynamic', 'static']
category: 'Low Level'
draft: false 
---

In the world of C programming, understanding how to create and utilize libraries is crucial. Libraries allow us to reuse code, improve modularity, and optimize build times. In this article, we will dive deep into two types of libraries: static and dynamic libraries. So, let's explore their creation and the tools used to inspect them.

We will be using the code from the [Create a Matrix Library in C](../create-a-matrix-library-in-c/) article, so if you haven't read it yet, I recommend you to do so.

## Static Libraries

So, as we already seen in [this article](../create-a-matrix-library-in-c/), to create a static library, we run the following commands:

```bash
gcc -c src/matrix.c -o matrix.o
ar rcs libmatrix.a matrix.o
```

A static library is essentially an archive of object files. When you link a static library with your program, the linker copies the code from the library into the executable, which means the executable contains all the code it need to run.

### The `nm` Command to Check Symbols

The `nm` command can be used to list the symbols in object files and archive files. 

Wait, what are symbols? 
Symbols are the names of functions, variables, and other entities in a program that are used to refer to them in the code. So, when we compile a program, the linker creates a symbol table that maps the symbols in the code to the actual memory addresses where the functions and variables are stored. This way, when you call a function in your code, the linker knows where to find it in the compiled program.

Let's see the symbols in the static library we created:

```bash
nm libmatrix.a
```

You should see an output similar to this:

```bash
matrix.o:
0000000000000000 t allocate_matrix_data
                 U free
                 U malloc
000000000000015b T matrix_add
0000000000000071 T matrix_create
00000000000000dc T matrix_destroy
0000000000000395 T matrix_mul
00000000000005d1 T matrix_print
0000000000000278 T matrix_sub
000000000000051a T matrix_transpose
                 U printf
                 U putchar
                 U strdup
```

The output shows the symbols defined in the `matrix.o` object file. The `T` flag indicates that the symbol is defined in the object file, and the `U` flag indicates that the symbol is undefined (i.e., it is referenced but not defined) and needs to be resolved by the linker. That makes sense, because the `printf`, `putchar`, `strdup`, `malloc`, and `free` functions are standard library functions that are defined elsewhere. We didn't wrote them in our code, but we are refering them with the header `<stdio.h>` and `<stdlib.h>`. In bigger projects, usually the `nm` output can be quite extensive, so when analyzing the output, you can use `grep` to filter the result.

#### The `objdump` Command to Disassemble

The `objdump` command can be used to display information about object files, libraries and executables. A useful option is the `-t` flag, which displays the symbol table of the object file or library, pretty similar to the `nm` command.

```bash
objdump -t libmatrix.a
```

Another useful option is the `-D` flag, which disassembles the object file or library and displays the assembly code for the functions defined in the object file. Can be useful when working with third party libraries.

```bash
objdump -D libmatrix.a
```

Also when working with third party libraries, or when working with multiple cross platform compilers, I often use the `-a` flag, which displays all the information about the object file or library, including the symbol table, the disassembly, the section headers, and the architecture of the object file.

```bash
objdump -a libmatrix.a
```

The output is something similar to this:

```bash
libmatrix_c [main●] % objdump libmatrix_c_static.a -a
In archive libmatrix_c_static.a:

matrix.o:     file format elf64-x86-64
rw-r--r-- 0/0   4288 Jan  1 01:00 1970 matrix.o
```

## Dynamic Libraries

As we saw in the [create a library in C](../create-a-matrix-library-in-c/) article, to create a dynamic library we run the following commands:

```bash
gcc -shared -fPIC src/matrix.c -o libmatrix.so
```

The `-fPIC` flag is for position independent code, if you're interesented in understanding more about that, check out [this article](../demystifying-the-fPIC-flag-understanding-position-independent-code-with-examples/)

### The `ldd` Command to check dependencies

The `ldd` command prints the shared libraries required by each program or shared library.

```bash
ldd libmatrix.so
```

This command is useful to ensure that all the dependencies of a dynamic library are resolved. If any required libraries are missing, `ldd` will indicate which ones are not found.

### The `nm` to Inspect Symbols

```bash
nm libmatrix.so
```

Here we see much more info than we saw in the static library:

```bash
libmatrix_c [main●] % nm libmatrix.so
0000000000003e20 d _DYNAMIC
0000000000004000 d _GLOBAL_OFFSET_TABLE_
                 w _ITM_deregisterTMCloneTable
                 w _ITM_registerTMCloneTable
00000000000021e4 r __FRAME_END__
000000000000200c r __GNU_EH_FRAME_HDR
0000000000004050 d __TMC_END__
                 w __cxa_finalize@GLIBC_2.2.5
0000000000001170 t __do_global_dtors_aux
0000000000003e18 d __do_global_dtors_aux_fini_array_entry
0000000000004048 d __dso_handle
0000000000003e10 d __frame_dummy_init_array_entry
                 w __gmon_start__
0000000000001838 t _fini
0000000000001000 t _init
00000000000011b9 t allocate_matrix_data
0000000000004050 b completed.0
0000000000001100 t deregister_tm_clones
00000000000011b0 t frame_dummy
                 U free@GLIBC_2.2.5
                 U malloc@GLIBC_2.2.5
0000000000001314 T matrix_add
000000000000122a T matrix_create
0000000000001295 T matrix_destroy
000000000000154e T matrix_mul
000000000000178a T matrix_print
0000000000001431 T matrix_sub
00000000000016d3 T matrix_transpose
                 U printf@GLIBC_2.2.5
                 U putchar@GLIBC_2.2.5
0000000000001130 t register_tm_clones
                 U strdup@GLIBC_2.2.5
```

The output shows both defined and undefined symbols, with `T` and `U` flags similar to the static library, but also includes additional symbols related to dynamic linking.

To filter dynamic symbols only, you can use:

```bash
nm -D libmatrix.so
```

### The `objdump` Command to Disassemble

Very similarly to the static library, you can use the `objdump` command to disassemble and inspect the dynamic library. Here are some useful flags:

* `-a`: displays all available information about the object file or library, including symbol tables and disassembly
* `-d`: disassemble the object file or library to view the assembly code

For example, to disasseble the dynamic library and view the assembly code, you can use:
```bash
objdump -d libmatrix.so
```

This provides insights into the low-level implementation of the functions withing the dynamic library, which can be particularly useful for debugging or optimizing performance.

# Size of Executable and Performace
## A Simple Benchmarking Comparing Dynamic and Static Linking

One of the key differences between static and dynamic libraries, is how they impact the size of the final executable and performance. To illustrate these differences, let's perform a simple benchmark comparing the two. Of course, the difference in this little code will be minimal, in real production code the difference can be more significant.

I will be using the code available in my [repository in the simple-benchmark directory](https://github.com/gabref/crosslang-linking-examples/tree/main/simple-benchmark), using the lib code in the `libmatrix_c` directory.

First, let's create a main.c file that uses the matrix library:
```c
#include "../libmatrix_c/inc/matrix.h"
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define SIZE 700

// Function to initialize a matrix with specific values
void	initialize_matrix(t_matrix *matrix, double start_value)
{
	for (int i = 0; i < matrix->rows; i++)
		for (int j = 0; j < matrix->cols; j++)
			matrix->data[i][j] = start_value++;
}

// Function to populate a matrix with random values between 0 and 1
void	populate_matrix_random(t_matrix *matrix)
{
	srand(time(NULL)); // Seed for random number generation
	for (int i = 0; i < matrix->rows; i++)
		for (int j = 0; j < matrix->cols; j++)
			matrix->data[i][j] = (double)rand() / RAND_MAX;
}

void	pretty_print_matrix(const t_matrix *matrix)
{
	printf("%s\n", matrix->name);
	printf("┌");
	for (int j = 0; j < matrix->cols - 1; j++)
		printf("          ");
	printf("         ┐\n");
	for (int i = 0; i < matrix->rows; i++)
	{
		printf("│");
		for (int j = 0; j < matrix->cols; j++)
			printf("%8.3f ", matrix->data[i][j]);
		printf(" │\n");
		if (i < matrix->rows - 1)
		{
			printf("│");
			for (int j = 0; j < matrix->cols - 1; j++)
				printf("          ");
			printf("         │\n");
		}
	}
	printf("└");
	for (int j = 0; j < matrix->cols - 1; j++)
		printf("          ");
	printf("         ┘\n");
}

int	main(void)
{
	t_matrix	*A;
	t_matrix	*B;
	t_matrix	*C;
	t_matrix	*D;
	t_matrix	*E;
	t_matrix	*F;

	// Create two 2x2 matrices
	A = matrix_create(SIZE, SIZE, "A");
	B = matrix_create(SIZE, SIZE, "B");
	// Initialize matrices with specific values
	initialize_matrix(A, 1.0);
	initialize_matrix(B, 100.0);
	// Print initialized matrices
	printf("\nInitialized t_matrix A:\n\n");
	matrix_print(A);
	printf("\nInitialized t_matrix B:\n\n");
	matrix_print(B);
	C = matrix_add(A, B, "A + B");
	matrix_print(C);
	D = matrix_sub(A, B, "A - B");
	matrix_print(D);
	E = matrix_mul(A, B, "A * B");
	matrix_print(E);
	F = matrix_transpose(A, "Transpose of A");
	pretty_print_matrix(F);
	printf("\n-------------\n");
	// Populate matrices with random values
	populate_matrix_random(A);
	populate_matrix_random(B);
	// Print matrices with random values
	printf("\nMatrix A with random values:\n\n");
	matrix_print(A);
	printf("\nMatrix B with random values:\n\n");
	matrix_print(B);
	// Free matrices
	matrix_destroy(A);
	matrix_destroy(B);
	matrix_destroy(C);
	matrix_destroy(D);
	matrix_destroy(E);
	matrix_destroy(F);
	return (0);
}
```

## Measuring the Size of the Executable

First let's create two version of an executable, one statically linked and one dynamically linked with our libraries.

```bash
gcc -o matrix_example_static main.c -L../libmatrix_c/build -lmatrix_c_static
gcc -o matrix_example_dynamic main.c -L../libmatrix_c/build -lmatrix_c_dynamic
```

We can check the size of each executable:
```bash
simple-benchmark [main●●] % ls -l
total 44
-rw-r--r-- 1 gabre gabre  2418 Jul 20 13:47 main.c
-rwxr-xr-x 1 gabre gabre 16504 Jul 20 13:47 matrix_example_dynamic
-rwxr-xr-x 1 gabre gabre 16752 Jul 20 13:47 matrix_example_static
```

As you can see, the statically linked executable is slightly larger than the dynamically linked executable. This is because the statically linked executable contains all the code from the library, while the dynamically linked executable only contains references to the library functions. Of course, the difference in size will depend on the size of the library and the number of functions used in the executable, since this is a very small example, the difference is insignificant.

## Measuring Performance

Now let's create a simple sh script to run the two executables and measure the time it takes to run each one.

Create a benchmark.sh file with the following content:

```bash
#!/bin/bash

compile_executables() {
	gcc -o matrix_example_static main.c -L../libmatrix_c/build -lmatrix_c_static
	gcc -o matrix_example_dynamic main.c -L../libmatrix_c/build -lmatrix_c_dynamic
}

clean() {
	rm matrix_example_static
	rm matrix_example_dynamic
}

# Function to run an executable and capture the time
run_and_time() {
    { time LD_LIBRARY_PATH=../libmatrix_c/build ./$1 >/dev/null; } 2>&1 | grep real | awk '{print $2}'
}

# Function to convert time format to seconds
convert_to_seconds() {
    local time=$1
    local minutes=$(echo $time | cut -d'm' -f1)
    local seconds=$(echo $time | cut -d'm' -f2 | cut -d's' -f1)
    echo "scale=3; $minutes * 60 + $seconds" | bc
}

# Function to calculate average time
calculate_average() {
    local times=("$@")
    local total=0
    for time in "${times[@]}"; do
        total=$(echo "$total + $time" | bc)
    done
    local count=${#times[@]}
    echo "scale=3; $total / $count" | bc
}

# Compile executables
compile_executables

# Run and capture times for static executable
static_times=()
echo ""
echo "Running static executable..."
for i in {1..10}; do
    static_time=$(run_and_time matrix_example_static)
    static_time_seconds=$(convert_to_seconds $static_time)
    static_times+=($static_time_seconds)
    echo "Run $i: $static_time_seconds seconds"
done

# Run and capture times for dynamic executable
dynamic_times=()
echo ""
echo "Running dynamic executable..."
for i in {1..10}; do
    dynamic_time=$(run_and_time matrix_example_dynamic)
    dynamic_time_seconds=$(convert_to_seconds $dynamic_time)
    dynamic_times+=($dynamic_time_seconds)
    echo "Run $i: $dynamic_time_seconds seconds"
done

# Calculate averages
static_avg=$(calculate_average "${static_times[@]}")
dynamic_avg=$(calculate_average "${dynamic_times[@]}")

difference=$(echo "$static_avg - $dynamic_avg" | bc)
percentage_difference=$(echo "scale=3; ($difference / $static_avg) * 100" | bc)

# Size comparison
static_size=$(ls -l matrix_example_static  | awk '{print $5}')
dynamic_size=$(ls -l matrix_example_dynamic | awk '{print $5}')
size_difference=$(echo "$static_size - $dynamic_size" | bc)
percentage_difference_size=$(echo "scale=3; ($size_difference / $static_size) * 100" | bc)

# Print results
echo ""
echo "=============================================="
echo "Benchmark Results:"
echo "=============================================="
echo "Execution Time:"
echo "----------------------------------------------"
echo "Average time for static executable  : $static_avg seconds"
echo "Average time for dynamic executable : $dynamic_avg seconds"
echo "Difference in average time          : $difference seconds"
echo "Percentage difference in time       : $percentage_difference_time%"
echo
echo "Executable Sizes:"
echo "----------------------------------------------"
echo "Size of static executable  : $static_size bytes"
echo "Size of dynamic executable : $dynamic_size bytes"
echo "Difference in size         : $size_difference bytes"
echo "Percentage difference in size : $percentage_difference_size%"
echo "=============================================="

clean
```

Make sure that you have `bc` installed, if not, on ubuntu you can install it with `sudo apt install bc`.

Make the script executable:

```bash
chmod +x benchmark.sh
```

and then run the benchmark:

```bash
./benchmark.sh
```

In my pc, the output was:

```bash
==============================================
Benchmark Results:
==============================================
Execution Time:
----------------------------------------------
Average time for static executable  : 1.866 seconds
Average time for dynamic executable : 1.907 seconds
Difference in average time          : -.041 seconds
Percentage difference in time       : %

Executable Sizes:
----------------------------------------------
Size of static executable  : 16752 bytes
Size of dynamic executable : 16504 bytes
Difference in size         : 248 bytes
Percentage difference in size : 1.400%
==============================================
```

* Size: The statically linked executable should still be larger due to the inclusion of all library code.
* Performance: The dynamically linked executable might have a slightly higher runtime due to the overhead of loading shared libraries and potentially less optimization by the linker compared to the statically linked version.
These differences, while still potentially small, should be more noticeable with the increased computational load, providing a clearer comparison between static and dynamic linking.

## Conclusion

Understanding static and dynamic libraries, along with the tools to inspect and analyze them, is not a fundamental skill, but can certainly help a lot and make easier the debugging process in many cases.
