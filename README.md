# Monkey Lang Interpreter

This repository contains an implementation of an interpreter in TypeScript based on the book [Writing an Interpreter in Go](https://interpreterbook.com/) by Thorsten Ball. The book provides a step-by-step guide to building an interpreter for a programming language called Monkey using the Go programming language. In this repository, we have reimplemented the interpreter in TypeScript.

## About Monkey

Monkey is a simple programming language designed to teach the principles of interpreter implementation. It supports features like variable bindings, conditionals, functions, and basic data types such as integers, booleans, and strings.

The Monkey language is dynamically typed and has a C-like syntax. It is not intended to be a practical programming language but rather a tool for learning about interpreters and programming language design.

## Implementation Details

The interpreter in this repository closely follows the structure and concepts presented in the book. It consists of a lexer, parser, abstract syntax tree (AST), and an evaluator. The lexer tokenizes the input source code into individual tokens, the parser generates an AST from those tokens, and the evaluator traverses the AST to execute the Monkey code.

The original Go implementation has been adapted to TypeScript while preserving the core logic and concepts. The code is organized into several modules for lexer, parser, evaluator, and other supporting functionality.

## Getting Started

To get started with the interpreter, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/marianozunino/monkey-lang.git
   ```
2. Install the dependencies:

   ```bash
   npm install
   ```
3. Run the tests:

   ```bash
    npm test
   ```

4. Build the project:

   ```bash
   npm run build
   ```

## Examples

TODO

## Contributing

Contributions to this project are welcome! If you find any issues or have ideas for improvements, please open an issue or submit a pull request. Make sure to follow the existing coding style and conventions.

## License

This project is licensed under the MIT License. Feel free to use the code for personal or educational purposes.
