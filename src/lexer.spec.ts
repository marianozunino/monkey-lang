import { describe, expect, it } from 'vitest';
import { Lexer } from './lexer';
import { TokenType } from './token';

describe('Lexer', () => {
  it('should tokenize =+(){},;', () => {
    const input = `=+(){},;`;
    const tests = [
      { expectedType: TokenType.Assign, expectedLiteral: '=' },
      { expectedType: TokenType.Plus, expectedLiteral: '+' },
      { expectedType: TokenType.LParen, expectedLiteral: '(' },
      { expectedType: TokenType.RParen, expectedLiteral: ')' },
      { expectedType: TokenType.LBrace, expectedLiteral: '{' },
      { expectedType: TokenType.RBrace, expectedLiteral: '}' },
      { expectedType: TokenType.Comma, expectedLiteral: ',' },
      { expectedType: TokenType.Semicolon, expectedLiteral: ';' },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok.type).toBe(tt.expectedType);
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
      { expectedType: TokenType.Let, expectedLiteral: 'let' },
      { expectedType: TokenType.Ident, expectedLiteral: 'five' },
      { expectedType: TokenType.Assign, expectedLiteral: '=' },
      { expectedType: TokenType.Int, expectedLiteral: '5' },
      { expectedType: TokenType.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenType.Let, expectedLiteral: 'let' },
      { expectedType: TokenType.Ident, expectedLiteral: 'ten' },
      { expectedType: TokenType.Assign, expectedLiteral: '=' },
      { expectedType: TokenType.Int, expectedLiteral: '10' },
      { expectedType: TokenType.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenType.Let, expectedLiteral: 'let' },
      { expectedType: TokenType.Ident, expectedLiteral: 'add' },
      { expectedType: TokenType.Assign, expectedLiteral: '=' },
      { expectedType: TokenType.Function, expectedLiteral: 'fn' },
      { expectedType: TokenType.LParen, expectedLiteral: '(' },
      { expectedType: TokenType.Ident, expectedLiteral: 'x' },
      { expectedType: TokenType.Comma, expectedLiteral: ',' },
      { expectedType: TokenType.Ident, expectedLiteral: 'y' },
      { expectedType: TokenType.RParen, expectedLiteral: ')' },
      { expectedType: TokenType.LBrace, expectedLiteral: '{' },
      { expectedType: TokenType.Ident, expectedLiteral: 'x' },
      { expectedType: TokenType.Plus, expectedLiteral: '+' },
      { expectedType: TokenType.Ident, expectedLiteral: 'y' },
      { expectedType: TokenType.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenType.RBrace, expectedLiteral: '}' },
      { expectedType: TokenType.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenType.Let, expectedLiteral: 'let' },
      { expectedType: TokenType.Ident, expectedLiteral: 'result' },
      { expectedType: TokenType.Assign, expectedLiteral: '=' },
      { expectedType: TokenType.Ident, expectedLiteral: 'add' },
      { expectedType: TokenType.LParen, expectedLiteral: '(' },
      { expectedType: TokenType.Ident, expectedLiteral: 'five' },
      { expectedType: TokenType.Comma, expectedLiteral: ',' },
      { expectedType: TokenType.Ident, expectedLiteral: 'ten' },
      { expectedType: TokenType.RParen, expectedLiteral: ')' },
      { expectedType: TokenType.Semicolon, expectedLiteral: ';' },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok, `token ${tt.expectedLiteral} is not ${tt.expectedType}`).not.toBeUndefined();
      expect(tok.type).toBe(tt.expectedType);
      expect(tok.literal).toBe(tt.expectedLiteral);
    });

    expect(l.nextToken().type).toBe(TokenType.EOF);
  });

  it('should tokenize !-+/*5;<>', () => {
    const input = `!-+/*5;<>`;
    const tests = [
      { expectedType: TokenType.Bang, expectedLiteral: '!' },
      { expectedType: TokenType.Minus, expectedLiteral: '-' },
      { expectedType: TokenType.Plus, expectedLiteral: '+' },
      { expectedType: TokenType.Slash, expectedLiteral: '/' },
      { expectedType: TokenType.Asterisk, expectedLiteral: '*' },
      { expectedType: TokenType.Int, expectedLiteral: '5' },
      { expectedType: TokenType.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenType.LT, expectedLiteral: '<' },
      { expectedType: TokenType.GT, expectedLiteral: '>' },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok.type).toBe(tt.expectedType);
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
      { expectedType: TokenType.If, expectedLiteral: 'if' },
      { expectedType: TokenType.LParen, expectedLiteral: '(' },
      { expectedType: TokenType.Int, expectedLiteral: '5' },
      { expectedType: TokenType.LT, expectedLiteral: '<' },
      { expectedType: TokenType.Int, expectedLiteral: '10' },
      { expectedType: TokenType.RParen, expectedLiteral: ')' },
      { expectedType: TokenType.LBrace, expectedLiteral: '{' },
      { expectedType: TokenType.Return, expectedLiteral: 'return' },
      { expectedType: TokenType.True, expectedLiteral: 'true' },
      { expectedType: TokenType.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenType.RBrace, expectedLiteral: '}' },
      { expectedType: TokenType.Else, expectedLiteral: 'else' },
      { expectedType: TokenType.LBrace, expectedLiteral: '{' },
      { expectedType: TokenType.Return, expectedLiteral: 'return' },
      { expectedType: TokenType.False, expectedLiteral: 'false' },
      { expectedType: TokenType.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenType.RBrace, expectedLiteral: '}' },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok.type).toBe(tt.expectedType);
      expect(tok.literal).toBe(tt.expectedLiteral);
    });
  });

  it('should support composed tokens (== !=)', () => {
    const input = `if (5 == 10) {
      return != true;
    }`;

    const tests = [
      { expectedType: TokenType.If, expectedLiteral: 'if' },
      { expectedType: TokenType.LParen, expectedLiteral: '(' },
      { expectedType: TokenType.Int, expectedLiteral: '5' },
      { expectedType: TokenType.Equal, expectedLiteral: '==' },
      { expectedType: TokenType.Int, expectedLiteral: '10' },
      { expectedType: TokenType.RParen, expectedLiteral: ')' },
      { expectedType: TokenType.LBrace, expectedLiteral: '{' },
      { expectedType: TokenType.Return, expectedLiteral: 'return' },
      { expectedType: TokenType.NotEqual, expectedLiteral: '!=' },
      { expectedType: TokenType.True, expectedLiteral: 'true' },
      { expectedType: TokenType.Semicolon, expectedLiteral: ';' },
      { expectedType: TokenType.RBrace, expectedLiteral: '}' },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok.type).toBe(tt.expectedType);
      expect(tok.literal).toBe(tt.expectedLiteral);
    });
  });
});
