---
title: Linking Dynamic and Static Libraries in C
publishedAt: 2024-07-06
description: "Basics of linking dynamic and static libraries, let's see the difference between them."
image: '/2.jpg'
tags: ['linking', 'dynamic', 'static', 'libraries']
category: 'Low Level'
draft: false 
---

# What is Linking? Dynamic and Static Libraries

## Introduction:
Linking is a crucial phase in software development that combines various pieces of code and data into a single executable or library. Understanding linking is essential for developers as it impacts how applications are built, executed, and maintained. In this post, we will delve into the concepts of linking, distinguish between dynamic and static linking, and explore their respective advantages, disadvantages, and use cases.

## What is Linking?
### Definition
Linking is the process of combining multiple object files, generated during the compilation of source code, into a single executable program or library. While compiling transforms source code into object files containing machine code, linking resolves symbol references (such as function and variable names) to their memory addresses, ensuring the final executable has all the necessary information to run correctly.

If you want to better understand how the compilation process works, i recommed this reading: [Compilation Process](https://www.scaler.com/topics/c/compilation-process-in-c/)

### Why do we need linking?
The primary role of linking is to resolve symbol references and integrate various pieces of code and data into a unique unit. This process ensures that when an executable runs, all functions and variables are correctly addressed and available in memory. Without linking we would have to write everything in a single file, all the glibc functions, all the kernel functions, etc. This would make the code very hard to maintain and understand.

## Types of Linking
### Static Linking

Static linking involves copying all necessary library functions directly into the final executable at compile time. This results in a self-contained executable that does not depend on external libraries at runtime.

### Advantages:
- **No dependency on external libraries at runtime:** Ensures the executable runs independently of the system’s installed libraries.
- **Faster startup times:** All required code is already in the executable, eliminating the need to load external libraries.
- **Ease of deployment:** Simplifies the deployment process since the executable contains everything it needs.

### Disadvantages:
- **Larger executable size:** Includes all library code within the executable, increasing its size.
- **Potential for redundant copies:** Multiple applications using the same libraries will each include their own copy.
- **Recompilation required for library updates:** Any change in a library requires recompiling the executable.

### Dynamic Linking
Dynamic linking involves linking the executable to the library at runtime. This means the executable depends on external libraries, which are loaded into memory when the program starts.

### Advantages:
- **Smaller executable size:** Only the necessary code is included, with libraries loaded separately.
- **Shared libraries:** Multiple programs can share the same library in memory, reducing overall memory usage.
- **Easier library updates:** Updating a library does not require recompiling dependent executables.

### Disadvantages:
- **Dependency on external libraries:** The executable will not run if the required libraries are not present.
- **Potential for version conflicts:** Different applications may require different versions of the same library.
- **Slightly slower startup times:** Time is needed to load the required libraries at runtime.

## How Linking Works
### Static Linking Process

This is a very empirical and gross way of describing how static linking works, but it is a good way to understand the process.

1. **Compile source files:** Convert source code into object files using a compiler.
2. **Create static libraries:** Archive object files into static libraries (`.a` files).
3. **Link object files and libraries:** Combine object files and static libraries to produce the final executable.

#### Example:
```sh
gcc -c main.c -o main.o
gcc -c matrix.c -o matrix.o
ar rcs libmatrix.a matrix.o
gcc -o main main.o -L. -lmatrix
```

### Dynamic Linking Process:

Again, not the most accurate way to describe the process, but it is a good way to understand it.

1. **Compile source files with Position-Independent Code (PIC):** Generate object files that support dynamic linking.
2. **Create dynamic libraries:** Compile object files into shared libraries (`.so` files).
3. **Link object files with dynamic libraries:** Produce the final executable with references to the shared libraries.

#### Example:
```sh
gcc -c -fPIC matrix.c -o matrix.o
gcc -shared -o libmatrix.so matrix.o
gcc -o main main.c -L. -lmatrix
```

#### Runtime Linking:
When the executable runs, the dynamic linker/loader (e.g., `ld.so` on Linux) loads the required shared libraries into memory and resolves the symbol references, ensuring all functions and variables are correctly addressed. So if a library is not present in the system, you will get an error from ld.

## Static vs Dynamic Linking: When to Use Each
### Use Cases for Static Linking:
- **Small, self-contained applications:** Ideal for tools and utilities that must run without relying on external libraries.
- **Embedded systems:** Ensures all necessary code is included, crucial for environments where dependency management is challenging.

For example, firmware for a device usually use static linking because it is easier to manage and control the code that is running on the device. 
Also tools and command-line utilities that must be portable and independent of the system's library versions.

### Use Cases for Dynamic Linking:
- **Large applications with multiple dependencies:** Reduces executable size and memory usage by sharing libraries.
- **Applications requiring frequent updates:** Simplifies maintenance and updates by allowing library changes without recompilation.

For example, web browsers use dynamic linking to share common libraries and reduce memory usage. 
Also, operating systems rely on shared libraries to facilitate updates and reduce memory overhead.
Take any big software you have installed, let's a game, or Autocad, SolidWorks, all these softwares use dynamic linking because they have a lot of dependencies and it is easier to manage them with dynamic linking. If you go in the installation directories of these softwares you will see a lot of `.dll` files, these are the shared libraries that the software uses.

## Conclusion
Understanding the differences between static and dynamic linking is vital for software development. Static linking provides independence and simplicity at the cost of larger executable sizes and more complex updates, while dynamic linking offers smaller executables and easier maintenance at the expense of dependency management.

### Next Steps
In the next post, we will explore linking C libraries, diving deeper into practical examples and advanced topics.
