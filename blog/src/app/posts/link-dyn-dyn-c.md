---
title: Generate a Dynamic Library Linking to Another Dynamic Library in C
publishedAt: 2024-09-27
description: ''
image: ''
tags: []
category: ''
draft: false 
---

# Dynamic Library Linking in C: How to Link One Dynamic Library to Another

In this blog post, we’ll take a closer look at a common situation in C development: linking a dynamic library to another dynamic library. Using our matrix library example, we’ll demonstrate how to create a dynamic library that links to an external dynamic matrix library.

## What is Dynamic Linking?

Dynamic linking involves loading external libraries at runtime rather than at compile time. This reduces the binary size and allows multiple programs to share the same library. However, when your dynamic library needs to depend on another dynamic library, managing this can become a bit tricky.

## The Matrix Library: Our Core Component

In this scenario, we’re working with a pre-built matrix library that performs matrix operations like creation, multiplication, and transposition. Here’s the structure from our `matrix.h` file:

```c
typedef struct s_matrix {
    int rows;
    int cols;
    char *name;
    double **data;
} t_matrix;
```

This matrix library will now be linked as a dynamic library when we build our own dynamic library.

## Wrapping the Matrix Library

In our `my_matrix_lib.c`, we provide wrappers for the matrix operations. This makes it easy to handle errors and extend functionality.

```c
t_matrix *wrapper_matrix_create(int rows, int cols, char *name) {
    t_matrix *matrix = matrix_create(rows, cols, name);
    if (matrix == NULL) {
        printf("Error: matrix_create() failed\n");
        exit(1);
    }
    return matrix;
}
```

These wrapper functions call the functions provided by the matrix library.

## Changing the Makefile for Dynamic Linking

Now, let’s look at the Makefile changes. Instead of statically linking the matrix library, we will dynamically link it. This means that when our dynamic library is loaded, it will reference the external dynamic matrix library. Here’s the updated Makefile:

```makefile
$(TARGET): $(OBJS)
    @mkdir -p $(dir $@)
    @$(CC) $(CFLAGS) -I$(INC_PATH) -shared -o $@ $(OBJS) -L../libmatrix_c/build -lmatrix_c_dynamic
```

This command uses `-lmatrix_c_dynamic` to link to the dynamic version of the matrix library.

## Running the Application

Simply running `make run`, which calls the Python script, won’t work right away. You’ll encounter an error like:

```bash
error while loading shared libraries: libmatrix_c_dynamic.so: cannot open shared object file: No such file or directory
```

This happens because the dynamic linker cannot locate the matrix library. To fix this, we need to tell the system where to find the dynamic matrix library using `LD_LIBRARY_PATH` before running the Python script.

Here’s how to run the code:

```bash
LD_LIBRARY_PATH=../libmatrix_c/build make run
```

This command sets the `LD_LIBRARY_PATH` environment variable to point to the location of the matrix library, allowing the linker to find and load it properly.

## Testing with Python

In our Python test script, we use `ctypes` to load the dynamic library and interact with it. This script remains the same, but now it ensures that our dynamic library links correctly to the external dynamic matrix library.


```python
lib = ctypes.CDLL('./build/libmy_matrix.so')
```

With the corrected linking setup, your Python test will now work, allowing you to manipulate matrices using the dynamic library.

### Conclusion

Linking a dynamic library to another dynamic library adds flexibility and reduces memory usage, but it comes with its own challenges, like making sure that the dependencies are correctly set up. But sometimes you have to use a third party library which only comes as a dynamic library. 

This setup allows your application to be modular, maintainable, and ready for real-world scenarios. 

What about when you do have a static library? Check out my blog post on [linking a static library to a dynamic library](../generate-dynamic-library-linking-to-a-static-library-in-c/index.md).
