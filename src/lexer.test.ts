import { describe, expect, it, test } from "vitest";
import { Lexer } from "./lexer";
import { TokenType } from "./token";

describe("Lexer", () => {
  it("should tokenize =+(){},;", () => {
    const input = `=+(){},;`;
    const tests = [
      { expectedType: TokenType.Assign, expectedLiteral: "=" },
      { expectedType: TokenType.Plus, expectedLiteral: "+" },
      { expectedType: TokenType.LParen, expectedLiteral: "(" },
      { expectedType: TokenType.RParen, expectedLiteral: ")" },
      { expectedType: TokenType.LBrace, expectedLiteral: "{" },
      { expectedType: TokenType.RBrace, expectedLiteral: "}" },
      { expectedType: TokenType.Comma, expectedLiteral: "," },
      { expectedType: TokenType.Semicolon, expectedLiteral: ";" },
    ];

    const l = new Lexer(input);

    tests.forEach((tt) => {
      const tok = l.nextToken();
      expect(tok.type).toBe(tt.expectedType);
      expect(tok.literal).toBe(tt.expectedLiteral);
    });
  });
});
