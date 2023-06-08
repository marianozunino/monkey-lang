export enum TokenKind {
  Illegal = 'Illegal',
  EOF = 'EOF',

  Ident = 'Ident',
  Int = 'Int',

  Assign = '=',
  Plus = '+',
  Minus = '-',
  Bang = '!',
  Asterisk = '*',
  Slash = '/',

  LT = '<',
  GT = '>',
  Equal = '==',
  NotEqual = '!=',

  Comma = ',',
  Semicolon = ';',

  LParen = '(',
  RParen = ')',
  LBrace = '{',
  RBrace = '}',

  Function = 'Function',
  Let = 'Let',
  If = 'If',
  Else = 'Else',
  Return = 'Return',
  True = 'True',
  False = 'False',
}

const Keywords = {
  fn: TokenKind.Function,
  let: TokenKind.Let,
  if: TokenKind.If,
  else: TokenKind.Else,
  true: TokenKind.True,
  false: TokenKind.False,
  return: TokenKind.Return,
} as const;

export type Token = {
  kind: TokenKind;
  literal: string;
};

export function createToken(type: TokenKind, literal: string): Token {
  return { kind: type, literal };
}

export function lookupIdent(ident: string): TokenKind {
  if (ident in Keywords) {
    return Keywords[ident as keyof typeof Keywords];
  }
  return TokenKind.Ident;
}

const a = 'a'.charCodeAt(0);
const z = 'z'.charCodeAt(0);
const A = 'A'.charCodeAt(0);
const Z = 'Z'.charCodeAt(0);
const _ = '_'.charCodeAt(0);
const _0 = '0'.charCodeAt(0);
const _9 = '9'.charCodeAt(0);

export function isLetter(character: string): boolean {
  const char = character.charCodeAt(0);
  return (a <= char && z >= char) || (A <= char && Z >= char) || char === _;
}

export function isWhitespace(character: string): boolean {
  return character === ' ' || character === '\t' || character === '\n' || character === '\r';
}

export function isDigit(character: string): boolean {
  const char = character.charCodeAt(0);
  return _0 <= char && char <= _9;
}
