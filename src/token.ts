export const TokenType = {
  Illegal: 'Illegal',
  EOF: 'EOF',

  Ident: 'Ident',
  Int: 'Int',

  Assign: '=',
  Plus: '+',
  Minus: '-',
  Bang: '!',
  Asterisk: '*',
  Slash: '/',

  LT: '<',
  GT: '>',
  Equal: '==',
  NotEqual: '!=',

  Comma: ',',
  Semicolon: ';',

  LParen: '(',
  RParen: ')',
  LBrace: '{',
  RBrace: '}',

  Function: 'Function',
  Let: 'Let',
  If: 'If',
  Else: 'Else',
  Return: 'Return',
  True: 'True',
  False: 'False',
} as const;

type TokenType = (typeof TokenType)[keyof typeof TokenType];

const Keywords = {
  fn: TokenType.Function,
  let: TokenType.Let,
  if: TokenType.If,
  else: TokenType.Else,
  return: TokenType.Return,
  true: TokenType.True,
  false: TokenType.False,
} as const;

export type Token = {
  type: TokenType;
  literal: string;
};

export function createToken(type: TokenType, literal: string): Token {
  return { type, literal };
}

export function lookupIdent(ident: string): TokenType {
  if (ident in Keywords) {
    return Keywords[ident as keyof typeof Keywords];
  }
  return TokenType.Ident;
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
