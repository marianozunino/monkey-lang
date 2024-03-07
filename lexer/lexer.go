package lexer

import (
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
	if l.readPos >= len(l.input) {
		l.ch = 0 // EOF?
	} else {
		l.ch = l.input[l.readPos]
		l.currentPos = l.readPos
		l.readPos++
	}
}

func (l *Lexer) NextToken() token.Token {
	l.consumeWhitespace()

	var tkn token.Token

	switch string(l.ch) {

	case token.COMMA,
		token.SEMICOLON,

		token.LPAREN,
		token.RPAREN,
		token.LBRACE,
		token.RBRACE,

		token.PLUS,
		token.MINUS,
		token.ASTERISK,
		token.SLASH,

		token.GT,
		token.LT,

		token.EOF:

		tkn = newToken(token.TokenType(l.ch), string(l.ch))
	case token.BANG:
		if l.peekChar() != '=' {
			tkn = newToken(token.TokenType(l.ch), string(l.ch))
		} else {
			l.readChar()
			tkn = newToken(token.TokenType(token.NOT_EQ), token.NOT_EQ)
		}
	case token.ASSIGN:
		if l.peekChar() == '=' {
			l.readChar()
			tkn = newToken(token.TokenType(token.EQ), token.EQ)
		} else {
			tkn = newToken(token.TokenType(l.ch), string(l.ch))
		}
	default:
		if isLetter(l.ch) {
			ident := l.readIdentifier()
			return newToken(token.LookupIdent(ident), ident)
		} else if isDigit(l.ch) {
			number := l.readNumber()
			return newToken(token.INT, number)
		} else {
			tkn = newToken(token.ILLEGAL, string(token.ILLEGAL))
		}
	}

	l.readChar()

	return tkn
}

func isLetter(ch byte) bool {
	return ('A' <= ch && ch <= 'z') || ch == '_'
}

func isDigit(ch byte) bool {
	return '0' <= ch && ch <= '9'
}

func (l *Lexer) peekChar() byte {
	if l.readPos >= len(l.input) {
		return '\x00'
	} else {
		return l.input[l.readPos]
	}
}

func (l *Lexer) readNumber() string {
	position := l.currentPos

	for isDigit(l.ch) {
		l.readChar()
	}

	return l.input[position:l.currentPos]
}

func (l *Lexer) readIdentifier() string {
	position := l.currentPos

	for isLetter(l.ch) {
		l.readChar()
	}

	return l.input[position:l.currentPos]
}

func (l *Lexer) consumeWhitespace() {
	for l.ch == ' ' || l.ch == '\t' || l.ch == '\n' || l.ch == '\r' {
		l.readChar()
	}
}

func newToken(tknType token.TokenType, literal string) token.Token {
	return token.Token{
		Type:    tknType,
		Literal: literal,
	}
}
