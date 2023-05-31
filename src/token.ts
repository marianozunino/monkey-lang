export const TokenType = {
  Illigal: "Illigal",
  EOF: "EOF",

  Ident: "Ident",
  Int: "Int",

  Assign: "=",
  Plus: "+",

  Comma: ",",
  Semicolon: ";",

  LParen: "(",
  RParen: ")",
  LBrace: "{",
  RBrace: "}",

  Function: "Function",
  Let: "Let",
} as const;

type TokenType = typeof TokenType[keyof typeof TokenType];

export type Token = {
  type: TokenType;
  literal: string;
};

export function createToken(type: TokenType, literal: string): Token {
  return { type, literal };
}
