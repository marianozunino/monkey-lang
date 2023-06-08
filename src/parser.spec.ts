import { describe, expect, it } from 'vitest';
import { Lexer } from './lexer';
import { Parser } from './parser';
import { ASTKind, LetStatement } from './ast';

describe('AST', () => {
  describe('should parse let statements', () => {
    it('should capture the token kind', () => {
      const input = `
      let x = 5;
      let y = 10;
      let foobar = 838383;
    `;
      const lexer = new Lexer(input);
      const program = new Parser(lexer).parseProgram();

      expect(program.statements.length).toBe(3);

      const tests = [{ expectedIdentifier: 'x' }, { expectedIdentifier: 'y' }, { expectedIdentifier: 'foobar' }];

      for (const [i, test] of tests.entries()) {
        const stmt = program.statements[i];
        expect(stmt.kind).toBe(ASTKind.Let);
        expect(stmt.name.value).toBe(test.expectedIdentifier);
        expect(stmt.name.kind).toBe(ASTKind.Identifier);
      }
    });
    it('should catch errors', () => {
      const input = `let x 5;
      let = 10;
      let 838383;`;

      const lexer = new Lexer(input);
      const parser = new Parser(lexer);
      parser.parseProgram();

      const tests = [
        { expectedMessage: 'expected next token to be =, got Int instead' },
        { expectedMessage: 'expected next token to be Ident, got = instead' },
        { expectedMessage: 'expected next token to be Ident, got Int instead' },
      ];

      const parserErrors = parser.getErrors();

      expect(parserErrors.length).toBe(tests.length);
      for (const [i, test] of tests.entries()) {
        expect(parserErrors[i]).toBe(test.expectedMessage);
      }
    });
  });

  describe('should parse return statements', () => {
    it('should capture the token kind', () => {
      const input = `
      return 5;
      return 10;
      return 993322;
    `;
      const lexer = new Lexer(input);
      const program = new Parser(lexer).parseProgram();

      expect(program.statements.length).toBe(3);

      for (const stmt of program.statements) {
        expect(stmt.kind).toBe(ASTKind.Return);
      }
    });
  });
});
