package main

import (
	"os"

	"github.com/marianozunino/monkey-lang/repl"
)

func main() {
	repl.Start(os.Stdin, os.Stdout)
}
