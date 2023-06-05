import {
  Token,
  TokenType,
  createToken,
  isDigit,
  isLetter,
  isWhitespace,
  lookupIdent,
} from "./token";

export class Lexer {
  private input: string;
  private position: number;
  private readPosition: number;
  private ch: string;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.readPosition = 0;
    this.ch = "";
    this.readChar();
  }

  /** @throws {Error} */
  public nextToken(): Token {
    let token: Token;

    this.consumeWhitespace();

    switch (this.ch) {
      case "=":
        token = createToken(TokenType.Assign, this.ch);
        break;
      case ";":
        token = createToken(TokenType.Semicolon, this.ch);
        break;
      case "(":
        token = createToken(TokenType.LParen, this.ch);
        break;
      case ")":
        token = createToken(TokenType.RParen, this.ch);
        break;
      case ",":
        token = createToken(TokenType.Comma, this.ch);
        break;
      case "+":
        token = createToken(TokenType.Plus, this.ch);
        break;
      case "-":
        token = createToken(TokenType.Minus, this.ch);
        break;
      case "!":
        token = createToken(TokenType.Bang, this.ch);
        break;
      case "/":
        token = createToken(TokenType.Slash, this.ch);
        break;
      case "*":
        token = createToken(TokenType.Asterisk, this.ch);
        break;
      case "<":
        token = createToken(TokenType.LT, this.ch);
        break;
      case ">":
        token = createToken(TokenType.GT, this.ch);
        break;
      case "{":
        token = createToken(TokenType.LBrace, this.ch);
        break;
      case "}":
        token = createToken(TokenType.RBrace, this.ch);
        break;
      case "\0":
        token = createToken(TokenType.EOF, "");
        break;
      default:
        if (isLetter(this.ch)) {
          const literal = this.readIdentifier();
          const type = lookupIdent(literal as keyof typeof TokenType);
          return createToken(type, literal);
        } else if (isDigit(this.ch)) {
          const literal = this.readNumber();
          return createToken(TokenType.Int, literal);
        } else {
          return createToken(TokenType.Illigal, this.ch);
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
      this.ch = "\0";
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition++;
  }

  private consumeWhitespace(): void {
    while (isWhitespace(this.ch)) {
      this.readChar();
    }
  }
}
