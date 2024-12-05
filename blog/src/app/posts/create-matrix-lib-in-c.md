---
title: Create a Matrix Library in C
publishedAt: 2024-07-20
description: ''
image: ''
tags: ['c', 'library']
category: 'Low Level'
draft: false 
---

# Create a Matrix Library in C

Before actually going throught examples on how to link static libs and dynamic libs, we actually need the code for a library. So let's create a simple matrix library in C.
Why matrix library? Because it is very simple but also not just annoing like string operations. 
We will add some basic functionalities such as matrix addition, subtraction, multiplication and transpose. This post will serve as a reference for future tutorials. So let's get started.

## Setting up the project

First, let's create a directory for our project and create the necessary files.

```bash
project_root/
├── inc/
│   └── matrix.h
└── src/
    └── matrix.c
```

The `inc` directory will contain the header file for our library, and the `src` directory will contain the implementation file.

## Header File

Let's start by defining the interface for our matrix library in the `matrix.h` file.

```c
#ifndef MATRIX_H
# define MATRIX_H

typedef struct s_matrix
{
	int		rows;
	int		cols;
	char	*name;  // each matrix will have a name
	double	**data; // 2D array to store the matrix data
}			t_matrix;

t_matrix	*matrix_create(int rows, int cols, char *name);
t_matrix	*matrix_add(t_matrix *a, t_matrix *b, char *new_matrix_name);
t_matrix	*matrix_sub(t_matrix *a, t_matrix *b, char *new_matrix_name);
t_matrix	*matrix_mul(t_matrix *a, t_matrix *b, char *new_matrix_name);
t_matrix	*matrix_transpose(t_matrix *matrix, char *new_matrix_name);
void		matrix_destroy(t_matrix *matrix);
void		matrix_print(t_matrix *matrix);

#endif
```

Okay, let's go through the functions we defined in the header file:

- `matrix_create`: This function will create a new matrix with the specified number of rows and columns.
- `matrix_add`: This function will add two matrices and return the result.
- `matrix_sub`: This function will subtract two matrices and return the result.
- `matrix_mul`: This function will multiply two matrices and return the result.
- `matrix_transpose`: This function will transpose a matrix and return the result.
- `matrix_destroy`: This function will free the memory allocated for a matrix.
- `matrix_print`: This function will print the matrix to the standard output.

## Implementing the matrix functions

Now let's implement the functions defined in the header file in the `src/matrix.c` file. Since it is actually just a implementation of basics maths, I will not go through the code.

```c
#include "../inc/matrix.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static double	**allocate_matrix_data(int rows, int cols)
{
	double	**data;

	data = (double **)malloc(rows * sizeof(double *));
	for (int i = 0; i < rows; i++)
		data[i] = (double *)malloc(cols * sizeof(double));
	return (data);
}

/* allocates memory for a matrix with the given number of rows and columns */
t_matrix	*matrix_create(int rows, int cols, char *name)
{
	t_matrix	*matrix;

	matrix = (t_matrix *)malloc(sizeof(t_matrix));
	matrix->rows = rows;
	matrix->cols = cols;
	matrix->name = strdup(name);
	matrix->data = allocate_matrix_data(rows, cols);
	return (matrix);
}

/* frees the memory allocated for a matrix */
void	matrix_destroy(t_matrix *matrix)
{
	if (!matrix)
		return ;
	for (int i = 0; i < matrix->rows; i++)
		free(matrix->data[i]);
	free(matrix->data);
	free(matrix->name);
	free(matrix);
}

/* adds two matrices */
t_matrix	*matrix_add(t_matrix *a, t_matrix *b, char *new_matrix_name)
{
	t_matrix	*result;

	if (a->rows != b->rows || a->cols != b->cols)
		return (NULL); // Incompatible dimensions
	result = matrix_create(a->rows, a->cols, new_matrix_name);
	for (int i = 0; i < a->rows; i++)
		for (int j = 0; j < a->cols; j++)
			result->data[i][j] = a->data[i][j] + b->data[i][j];
	return (result);
}

/* subtracts two matrices */
t_matrix	*matrix_sub(t_matrix *a, t_matrix *b, char *new_matrix_name)
{
	t_matrix	*result;

	if (a->rows != b->rows || a->cols != b->cols)
		return (NULL); // Incompatible dimensions
	result = matrix_create(a->rows, a->cols, new_matrix_name);
	for (int i = 0; i < a->rows; i++)
		for (int j = 0; j < a->cols; j++)
			result->data[i][j] = a->data[i][j] - b->data[i][j];
	return (result);
}

/* multiplies two matrices */
t_matrix	*matrix_mul(t_matrix *a, t_matrix *b, char *new_matrix_name)
{
	t_matrix	*result;

	if (a->cols != b->rows)
		return (NULL); // Incompatible dimensions
	result = matrix_create(a->rows, b->cols, new_matrix_name);
	for (int i = 0; i < a->rows; i++)
		for (int j = 0; j < b->cols; j++)
		{
			result->data[i][j] = 0;
			for (int k = 0; k < a->cols; k++)
				result->data[i][j] += a->data[i][k] * b->data[k][j];
		}
	return (result);
}

/* transposes a matrix */
t_matrix	*matrix_transpose(t_matrix *matrix, char *new_matrix_name)
{
	t_matrix	*result;

	result = matrix_create(matrix->cols, matrix->rows, new_matrix_name);
	for (int i = 0; i < matrix->rows; i++)
		for (int j = 0; j < matrix->cols; j++)
			result->data[j][i] = matrix->data[i][j];
	return (result);
}

/* prints the matrix */
void	matrix_print(t_matrix *matrix)
{
	printf(" %s\n", matrix->name);
	for (int i = 0; i < matrix->rows; i++)
	{
		for (int j = 0; j < matrix->cols; j++)
			printf("%8.3f ", matrix->data[i][j]);
		printf("\n");
	}
}
```

Tadaaaa. Now we have the code for our matrix library. Feel free to create a main.c file and test the library code before compiling it into a library. In my github repository, I have a main.c file that tests the library code. The link is in the end of the post.

Ok, let's see how we can compile it into a static library and a dynamic library.

## Compiling the library

### Static Library

To compile the library into a static library, we can use the following command:

```bash
gcc -c src/matrix.c -o matrix.o
ar rcs libmatrix.a matrix.o
```

So, what are we doing here?
The first command compiles the `matrix.c` file into an object file `matrix.o`. The `-c` flag tells the compiler to compile the source file without linking it. The object file contains the compiled code for the functions defined in the source file, but it is not yet linked into an executable.
The second command we are using ar. From the linux manual `man ar`:

```
The GNU ar program creates, modifies, and extracts from archives.  An archive is a single file holding a collection of other files in a structure that makes it possible to retrieve the original individual files (called members of the archive).
```

So, we are creating an archive file `libmatrix.a` and adding the object file `matrix.o` to it. The `rcs` flags are used to create the archive file if it does not exist, replace the object file if it already exists, and suppress the output of the command.

This library can then later be linked to other programs.

We take a deeper look into the static library to better understand what is going on in this [post](../taking-a-deeper-look-into-static-and-dynamic-libraries/).

### Dynamic Library

To compile the library into a dynamic library, we can use the following command:

```bash
gcc -shared -o libmatrix.so -fPIC src/matrix.c
```

So, what are we doing here?
The `-shared` flag tells the compiler to create a shared library. Shared libraries are loaded at runtime by the operating system and shared among multiple programs. This allows the code in the library to be shared among multiple programs, reducing the memory usage and disk space required by the programs. Of course though, the library must be present in the system, so the programs can use it.
Also, when the executable is run, the dynamic linker will load the shared library into memory and resolve the symbols in the library, so the program can use the functions defined in the library, and that takes time, so it is slower that using a static library.
The `-o` flag specifies the output file name, and the `-fPIC` flag tells the compiler to generate position-independent code, which is required for shared libraries.

Position independent code? WHAAT?

If you're interested in understanding better how dynamic libraries work, I recommend reading this [article](../taking-a-deeper-look-into-static-and-dynamic-libraries/), and if you want to better understand how position independent code works and why we need it, take a look at this other [article](../demystifying-the-fPIC-flag-understanding-position-independent-code-with-examples/). 

## Conclusion

Awesome, now we have a simple matrix library in C. In the next post, we will see how to link the static and dynamic libraries to a program. If you want to see the full code, you can check it out in my github repository:

{/* ::github{repo="gabref/crosslang-linking-examples"} */}
