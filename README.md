# Monkey Lang

Monkey is a programming language based on the book [Writing an Interpreter in Go](https://interpreterbook.com/) by Thorsten Ball.

## Features

- C-like syntax
- variable binding
- integers and booleans
- arithmetic expressions
- built-in functions
- first-class functions and higher-order functions
- closures
- data structures
  - string
  - array
  - hash

## Lexer

A lexer is a parser that breaks the input into tokens. Tokens are then passed to the parser.

For example:

```c
let x = 5 + 10;
```

becomes

```c
[
    LET,
    IDENTIFIER("x"),
    EQUAL,
    NUMBER(5),
    PLUS,
    NUMBER(10),
    SEMICOLON
]

