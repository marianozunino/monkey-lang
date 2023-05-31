import { Token, TokenType, createToken } from "./token";

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
      case "{":
        token = createToken(TokenType.LBrace, this.ch);
        break;
      case "}":
        token = createToken(TokenType.RBrace, this.ch);
        break;
      case "0":
        token = createToken(TokenType.EOF, "");
        break;
      default:
        break;
    }

    this.readChar();

    return token;
  }

  private readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.ch = "0";
    }

    this.ch = this.input[this.readPosition];
    this.position = this.readPosition;
    this.readPosition++;
  }
}
