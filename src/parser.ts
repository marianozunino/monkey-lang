import { ASTKind, Identifier, LetStatement, Program, ReturnStatement, Statement } from './ast';
import { Lexer } from './lexer';
import { Token, TokenKind } from './token';

export class Parser {
  private currentToken: Token | null = null;
  private peekToken: Token | null = null;
  private errors: string[] = [];

  constructor(private readonly lexer: Lexer) {
    this.nextToken();
    this.nextToken();
  }

  private nextToken(): void {
    this.currentToken = this.peekToken;
    this.peekToken = this.lexer.nextToken();
  }

  public parseProgram(): Program {
    const statements: Statement[] = [];

    while (this.currentToken?.kind !== TokenKind.EOF) {
      const stmt = this.parseStatement();
      if (stmt !== null) {
        statements.push(stmt);
      }

      this.nextToken();
    }

    return {
      kind: ASTKind.Program,
      statements,
    };
  }

  private parseStatement(): Statement | null {
    switch (this.currentToken?.kind) {
      case TokenKind.Let:
        return this.parseLetStatement();
      case TokenKind.Return:
        return this.parseReturnStatement();
      default:
        return null;
    }
  }

  private parseLetStatement(): LetStatement | null {
    if (!this.expectPeek(TokenKind.Ident)) {
      return null;
    }

    const name: Identifier = {
      kind: ASTKind.Identifier,
      value: this.currentToken?.literal as string,
    };

    if (!this.expectPeek(TokenKind.Assign)) {
      return null;
    }

    while (!this.currentTokenIs(TokenKind.Semicolon)) {
      this.nextToken();
    }

    return {
      kind: ASTKind.Let,
      name,
    };
  }

  private parseReturnStatement(): ReturnStatement | null {
    this.nextToken();

    while (!this.currentTokenIs(TokenKind.Semicolon)) {
      this.nextToken();
    }

    return {
      kind: ASTKind.Return,
    };
  }

  private currentTokenIs(kind: TokenKind): boolean {
    return this.currentToken?.kind === kind;
  }

  private peekTokenIs(kind: TokenKind): boolean {
    return this.peekToken?.kind === kind;
  }

  private expectPeek(kind: TokenKind): boolean {
    if (this.peekTokenIs(kind)) {
      this.nextToken();
      return true;
    } else {
      this.peekError(kind);
      return false;
    }
  }

  private peekError(kind: TokenKind): void {
    this.errors.push(`expected next token to be ${kind}, got ${this.peekToken?.kind} instead`);
  }

  public getErrors(): string[] {
    return this.errors;
  }
}
