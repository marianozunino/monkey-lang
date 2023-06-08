import { Token, TokenKind, createToken, isDigit, isLetter, isWhitespace, lookupIdent } from './token';

export class Lexer {
  private input: string;
  private position: number;
  private readPosition: number;
  private ch: string;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.readPosition = 0;
    this.ch = '';
    this.readChar();
  }

  /** @throws {Error} */
  public nextToken(): Token {
    let token: Token;

    this.consumeWhitespace();

    switch (this.ch) {
      case '=':
        if (this.peekChar() === TokenKind.Assign) {
          this.readChar();
          token = createToken(TokenKind.Equal, TokenKind.Equal);
        } else {
          token = createToken(TokenKind.Assign, this.ch);
        }
        break;
      case '!':
        if (this.peekChar() === TokenKind.Assign) {
          this.readChar();
          token = createToken(TokenKind.NotEqual, TokenKind.NotEqual);
        } else {
          token = createToken(TokenKind.Bang, this.ch);
        }
        break;
      case ';':
        token = createToken(TokenKind.Semicolon, this.ch);
        break;
      case '(':
        token = createToken(TokenKind.LParen, this.ch);
        break;
      case ')':
        token = createToken(TokenKind.RParen, this.ch);
        break;
      case ',':
        token = createToken(TokenKind.Comma, this.ch);
        break;
      case '+':
        token = createToken(TokenKind.Plus, this.ch);
        break;
      case '-':
        token = createToken(TokenKind.Minus, this.ch);
        break;
      case '/':
        token = createToken(TokenKind.Slash, this.ch);
        break;
      case '*':
        token = createToken(TokenKind.Asterisk, this.ch);
        break;
      case '<':
        token = createToken(TokenKind.LT, this.ch);
        break;
      case '>':
        token = createToken(TokenKind.GT, this.ch);
        break;
      case '{':
        token = createToken(TokenKind.LBrace, this.ch);
        break;
      case '}':
        token = createToken(TokenKind.RBrace, this.ch);
        break;
      case '\0':
        token = createToken(TokenKind.EOF, '');
        break;
      default:
        if (isLetter(this.ch)) {
          const literal = this.readIdentifier();
          const type = lookupIdent(literal as keyof typeof TokenKind);
          return createToken(type, literal);
        } else if (isDigit(this.ch)) {
          const literal = this.readNumber();
          return createToken(TokenKind.Int, literal);
        } else {
          return createToken(TokenKind.Illegal, this.ch);
        }
    }

    this.readChar();

    return token;
  }

  private readIdentifier(): string {
    const startPosition = this.position;

    while (isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.substring(startPosition, this.position);
  }

  private readNumber(): string {
    const startPosition = this.position;
    while (isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.substring(startPosition, this.position);
  }

  private readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.ch = '\0';
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition++;
  }

  private peekChar(): string {
    if (this.readPosition >= this.input.length) {
      return '\0';
    } else {
      return this.input[this.readPosition];
    }
  }

  private consumeWhitespace(): void {
    while (isWhitespace(this.ch)) {
      this.readChar();
    }
  }
}
