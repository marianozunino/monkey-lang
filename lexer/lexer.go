package lexer

import (
	"github.com/davecgh/go-spew/spew"
	"github.com/marianozunino/monkey-lang/token"
)

type Lexer struct {
	input      string
	currentPos int  // current position in input
	readPos    int  // current reading position in input
	ch         byte // current char
}

func New(input string) *Lexer {
	l := &Lexer{input: input}
	l.readChar() // initialize currentPos, readPos and ch
	return l
}

func (l *Lexer) readChar() {
	spew.Dump(string(l.ch))
	if l.readPos >= len(l.input) {
		l.ch = 0 // EOF?
	} else {
		l.ch = l.input[l.readPos]
		l.currentPos = l.readPos
		l.readPos++
	}
}

func (l *Lexer) NextToken() token.Token {
	defer l.readChar() // keep reading

	switch string(l.ch) {
	case token.ASSIGN:
		return newToken(token.ASSIGN, l.ch)
	case token.COMMA:
		return newToken(token.COMMA, l.ch)
	case token.SEMICOLON:
		return newToken(token.SEMICOLON, l.ch)
	case token.LPAREN:
		return newToken(token.LPAREN, l.ch)
	case token.RPAREN:
		return newToken(token.RPAREN, l.ch)
	case token.LBRACE:
		return newToken(token.LBRACE, l.ch)
	case token.RBRACE:
		return newToken(token.RBRACE, l.ch)
	case token.PLUS:
		return newToken(token.PLUS, l.ch)
	case token.EOF:
		return newToken(token.EOF, l.ch)
	default:
		return newToken(token.EOF, l.ch)
	}
}

func newToken(tknType token.TokenType, ch byte) token.Token {
	return token.Token{
		Type:    tknType,
		Literal: string(ch),
	}
}
