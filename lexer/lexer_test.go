package lexer

import (
	"testing"

	"github.com/marianozunino/monkey-lang/token"
)

func TestNextToken(t *testing.T) {
	input := `let five = 5;
let ten = 10;
let add = fn(x, y) {
  x+y;
};
let result = add(five, ten);

!-/*5;
5 < 10 > 5;

if (5 < 10) {
  return true;
} else {
  return false;
}

10 == 10;
10 != 9;
`
	tests := []struct {
		expectedType    token.TokenType
		expectedLiteral string
	}{
		{token.LET, token.LET},
		{token.IDENT, "five"},
		{token.ASSIGN, token.ASSIGN},
		{token.INT, "5"},
		{token.SEMICOLON, token.SEMICOLON},

		{token.LET, token.LET},
		{token.IDENT, "ten"},
		{token.ASSIGN, token.ASSIGN},
		{token.INT, "10"},
		{token.SEMICOLON, token.SEMICOLON},

		{token.LET, token.LET},
		{token.IDENT, "add"},
		{token.ASSIGN, token.ASSIGN},
		{token.FUNCTION, token.FUNCTION},
		{token.LPAREN, token.LPAREN},
		{token.IDENT, "x"},
		{token.COMMA, token.COMMA},
		{token.IDENT, "y"},
		{token.RPAREN, token.RPAREN},
		{token.LBRACE, token.LBRACE},
		{token.IDENT, "x"},
		{token.PLUS, token.PLUS},
		{token.IDENT, "y"},
		{token.SEMICOLON, token.SEMICOLON},
		{token.RBRACE, token.RBRACE},
		{token.SEMICOLON, token.SEMICOLON},

		{token.LET, token.LET},
		{token.IDENT, "result"},
		{token.ASSIGN, token.ASSIGN},
		{token.IDENT, "add"},
		{token.LPAREN, token.LPAREN},
		{token.IDENT, "five"},
		{token.COMMA, token.COMMA},
		{token.IDENT, "ten"},
		{token.RPAREN, token.RPAREN},
		{token.SEMICOLON, token.SEMICOLON},

		{token.BANG, token.BANG},
		{token.MINUS, token.MINUS},
		{token.SLASH, token.SLASH},
		{token.ASTERISK, token.ASTERISK},
		{token.INT, "5"},
		{token.SEMICOLON, token.SEMICOLON},

		{token.INT, "5"},
		{token.LT, token.LT},
		{token.INT, "10"},
		{token.GT, token.GT},
		{token.INT, "5"},
		{token.SEMICOLON, token.SEMICOLON},

		{token.IF, token.IF},
		{token.LPAREN, token.LPAREN},
		{token.INT, "5"},
		{token.LT, token.LT},
		{token.INT, "10"},
		{token.RPAREN, token.RPAREN},
		{token.LBRACE, token.LBRACE},
		{token.RETURN, token.RETURN},
		{token.TRUE, token.TRUE},
		{token.SEMICOLON, token.SEMICOLON},
		{token.RBRACE, token.RBRACE},
		{token.ELSE, token.ELSE},
		{token.LBRACE, token.LBRACE},
		{token.RETURN, token.RETURN},
		{token.FALSE, token.FALSE},
		{token.SEMICOLON, token.SEMICOLON},
		{token.RBRACE, token.RBRACE},

		{token.INT, "10"},
		{token.EQ, token.EQ},
		{token.INT, "10"},
		{token.SEMICOLON, token.SEMICOLON},
		{token.INT, "10"},
		{token.NOT_EQ, token.NOT_EQ},
		{token.INT, "9"},
		{token.SEMICOLON, token.SEMICOLON},

		{token.EOF, token.EOF},
	}

	l := New(input)

	for i, tt := range tests {
		// fmt.Printf("Testing %d\n", i)
		tok := l.NextToken()
		if tok.Type != tt.expectedType {
			t.Fatalf("tests[%d] - tokentype wrong. expected=%q, got=%q",
				i, tt.expectedType, tok.Type)
		}
		if tok.Literal != tt.expectedLiteral {
			t.Fatalf("tests[%d] - literal wrong. expected=%q, got=%q",
				i, tt.expectedLiteral, tok.Literal)
		}
	}
}
