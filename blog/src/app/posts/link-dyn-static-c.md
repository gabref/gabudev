---
title: Generate a Dynamic Library Linking to a Static Library in C
publishedAt: 2024-09-27
description: ''
image: ''
tags: []
category: ''
draft: false 
---

# Generate a Dynamic Library Linking to a Static Library in C

In modern software development, linking strategies play a crucial role in determining performance and modularity. One technique is static linking with dynamic libraries. In this blog post, we’ll explore how to build a dynamic library that leverages static linking, using a custom matrix library as an example.

## What is Static Linking?
Static linking involves embedding all the required functions and code into the resulting binary at compile time. When we statically link a library, we avoid the need for external dependencies at runtime. However, this can result in larger binaries since all the necessary code is included.

## Dynamic Libraries in C
Dynamic libraries (shared objects in Linux, `.so` files) are loaded at runtime, allowing multiple programs to use the same library without embedding its code. This approach reduces memory usage and allows for easy updates. The dynamic library we will create will statically link to a matrix library, avoiding dependency issues while still benefiting from the flexibility of shared libraries.

## The Matrix Library: Core Components
The matrix library, implemented in `matrix.h`, defines a `t_matrix` structure and a series of operations such as matrix creation, multiplication, and destruction. This library forms the base of our dynamic library. You can find the full implementation in the [GitHub repository](https://github.com/gabref/crosslang-linking-examples/tree/main/libmatrix_c) or follow the tutorial: [Create a Matrix Library in C](../create-a-matrix-library-in-c/).

```c
typedef struct s_matrix {
    int rows;
    int cols;
    char *name;
    double **data;
} t_matrix;
```

## Wrapping the Matrix Library
Our silly dynamic library will be a more "flexible" interface, creating wrappers around the matrix functions in our dynamic library source file, `my_matrix_lib.c`. These wrappers handle errors and extend functionality.

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

Check the full implementation at the [GitHub repository](https://github.com/gabref/crosslang-linking-examples/blob/main/c_lib_link_static_c/src/my_matrix_lib.c).

### Static Linking the Matrix Library
The key part of our build process lies in the Makefile. Here’s where static linking happens. We use `-L` to point to the directory containing the matrix library and `-lmatrix_c_static` to statically link the matrix library into our dynamic library.

```makefile
$(TARGET): $(OBJS)
    @mkdir -p $(dir $@)
    @$(CC) $(CFLAGS) -I$(INC_PATH) -shared -o $@ $(OBJS) -L../libmatrix_c/build -lmatrix_c_static
```

By statically linking the matrix library, our dynamic library can be distributed without requiring the matrix library at runtime.

### Testing with Python
A Python script utilizing `ctypes` allows us to test the dynamic library in a higher-level language, just to change things a little bit. With this setup, we can invoke matrix operations, print results, and ensure the dynamic library works as expected.

```python
lib = ctypes.CDLL('./build/libmy_matrix.so')
class Matrix(ctypes.Structure):
    _fields_ = [("rows", ctypes.c_int), ("cols", ctypes.c_int), ("name", ctypes.c_char_p), ("data", ctypes.POINTER(ctypes.POINTER(ctypes.c_double)))]
```

You can check the full code here: [GitHub repository](Check the full implementation at the [GitHub repository](https://github.com/gabref/crosslang-linking-examples/blob/main/c_lib_link_static_c/)

### Conclusion
Static linking a library within a dynamic library offers a powerful combination of performance and flexibility. By embedding the matrix library in the dynamic library, we eliminate runtime dependencies while still enjoying the benefits of dynamic libraries.

This approach is ideal when you want to avoid the complexity of managing multiple external libraries during distribution, all while keeping your applications modular and upgradable.

But what if you don’t have access to the source code of the library, and the only thing distributed to you is a dynamic library, but you need to create another dynamic library that calls this dynamic library? Check this out: [Generate a Dynamic Library Linking to Another Dynamic Library in C](../generate-a-dynamic-library-linking-to-another-dynamic-library-in-c/)
