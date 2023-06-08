import { describe, expect, it } from 'vitest';
import { Lexer } from './lexer';
import { TokenKind } from './token';

describe('Lexer', () => {
  it('should tokenize =+(){},;', () => {
    const input = `=+(){},;`;
    const tests = [
      { expectedType: TokenKind.Assign, expectedLiteral: '=' },
      { expectedType: TokenKind.Plus, expectedLiteral: '+' },
      { expectedType: TokenKind.LParen, expectedLiteral: '(' },
      { expectedType: TokenKind.RParen, expectedLiteral: ')' },
      { expectedType: TokenKind.LBrace, expectedLiteral: '{' },
      { expectedType: TokenKind.RBrace, expectedLiteral: '}' },
      { expectedType: TokenKind.Comma, expectedLiteral: ',' },
      { expectedType: TokenKind.Semicolon, expectedLiteral: ';' },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok.kind).toBe(tt.expectedType);
      expect(tok.literal).toBe(tt.expectedLiteral);
    });
  });

  it('should tokenize let five = 5;...', () => {
    const input = `let five = 5;
let ten = 10;
let add = fn(x, y) {
  x + y;
};
let result = add(five, ten);
`;

    const tests = [
      { expectedType: TokenKind.Let, expectedLiteral: 'let' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'five' },
      { expectedType: TokenKind.Assign, expectedLiteral: '=' },
      { expectedType: TokenKind.Int, expectedLiteral: '5' },
      { expectedType: TokenKind.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenKind.Let, expectedLiteral: 'let' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'ten' },
      { expectedType: TokenKind.Assign, expectedLiteral: '=' },
      { expectedType: TokenKind.Int, expectedLiteral: '10' },
      { expectedType: TokenKind.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenKind.Let, expectedLiteral: 'let' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'add' },
      { expectedType: TokenKind.Assign, expectedLiteral: '=' },
      { expectedType: TokenKind.Function, expectedLiteral: 'fn' },
      { expectedType: TokenKind.LParen, expectedLiteral: '(' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'x' },
      { expectedType: TokenKind.Comma, expectedLiteral: ',' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'y' },
      { expectedType: TokenKind.RParen, expectedLiteral: ')' },
      { expectedType: TokenKind.LBrace, expectedLiteral: '{' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'x' },
      { expectedType: TokenKind.Plus, expectedLiteral: '+' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'y' },
      { expectedType: TokenKind.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenKind.RBrace, expectedLiteral: '}' },
      { expectedType: TokenKind.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenKind.Let, expectedLiteral: 'let' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'result' },
      { expectedType: TokenKind.Assign, expectedLiteral: '=' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'add' },
      { expectedType: TokenKind.LParen, expectedLiteral: '(' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'five' },
      { expectedType: TokenKind.Comma, expectedLiteral: ',' },
      { expectedType: TokenKind.Ident, expectedLiteral: 'ten' },
      { expectedType: TokenKind.RParen, expectedLiteral: ')' },
      { expectedType: TokenKind.Semicolon, expectedLiteral: ';' },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok, `token ${tt.expectedLiteral} is not ${tt.expectedType}`).not.toBeUndefined();
      expect(tok.kind).toBe(tt.expectedType);
      expect(tok.literal).toBe(tt.expectedLiteral);
    });

    expect(l.nextToken().kind).toBe(TokenKind.EOF);
  });

  it('should tokenize !-+/*5;<>', () => {
    const input = `!-+/*5;<>`;
    const tests = [
      { expectedType: TokenKind.Bang, expectedLiteral: '!' },
      { expectedType: TokenKind.Minus, expectedLiteral: '-' },
      { expectedType: TokenKind.Plus, expectedLiteral: '+' },
      { expectedType: TokenKind.Slash, expectedLiteral: '/' },
      { expectedType: TokenKind.Asterisk, expectedLiteral: '*' },
      { expectedType: TokenKind.Int, expectedLiteral: '5' },
      { expectedType: TokenKind.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenKind.LT, expectedLiteral: '<' },
      { expectedType: TokenKind.GT, expectedLiteral: '>' },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok.kind).toBe(tt.expectedType);
      expect(tok.literal).toBe(tt.expectedLiteral);
    });
  });

  it('should tokenize if else return true false', () => {
    const input = `if (5 < 10) {
      return true;
    } else {
      return false;
    }`;

    const tests = [
      { expectedType: TokenKind.If, expectedLiteral: 'if' },
      { expectedType: TokenKind.LParen, expectedLiteral: '(' },
      { expectedType: TokenKind.Int, expectedLiteral: '5' },
      { expectedType: TokenKind.LT, expectedLiteral: '<' },
      { expectedType: TokenKind.Int, expectedLiteral: '10' },
      { expectedType: TokenKind.RParen, expectedLiteral: ')' },
      { expectedType: TokenKind.LBrace, expectedLiteral: '{' },
      { expectedType: TokenKind.Return, expectedLiteral: 'return' },
      { expectedType: TokenKind.True, expectedLiteral: 'true' },
      { expectedType: TokenKind.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenKind.RBrace, expectedLiteral: '}' },
      { expectedType: TokenKind.Else, expectedLiteral: 'else' },
      { expectedType: TokenKind.LBrace, expectedLiteral: '{' },
      { expectedType: TokenKind.Return, expectedLiteral: 'return' },
      { expectedType: TokenKind.False, expectedLiteral: 'false' },
      { expectedType: TokenKind.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenKind.RBrace, expectedLiteral: '}' },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok.kind).toBe(tt.expectedType);
      expect(tok.literal).toBe(tt.expectedLiteral);
    });
  });

  it('should support composed tokens (== !=)', () => {
    const input = `if (5 == 10) {
      return != true;
    }`;

    const tests = [
      { expectedType: TokenKind.If, expectedLiteral: 'if' },
      { expectedType: TokenKind.LParen, expectedLiteral: '(' },
      { expectedType: TokenKind.Int, expectedLiteral: '5' },
      { expectedType: TokenKind.Equal, expectedLiteral: '==' },
      { expectedType: TokenKind.Int, expectedLiteral: '10' },
      { expectedType: TokenKind.RParen, expectedLiteral: ')' },
      { expectedType: TokenKind.LBrace, expectedLiteral: '{' },
      { expectedType: TokenKind.Return, expectedLiteral: 'return' },
      { expectedType: TokenKind.NotEqual, expectedLiteral: '!=' },
      { expectedType: TokenKind.True, expectedLiteral: 'true' },
      { expectedType: TokenKind.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenKind.RBrace, expectedLiteral: '}' },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok.kind).toBe(tt.expectedType);
      expect(tok.literal).toBe(tt.expectedLiteral);
    });
  });
});
