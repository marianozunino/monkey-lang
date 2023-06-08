export enum ASTKind {
  Identifier = 'IDENTIFIER',
  Let = 'LET',
  Program = 'PROGRAM',
  Return = 'RETURN',
}

export type Node = Program | Statement | Expression;

export type Expression = undefined;

export type Statement = LetStatement | ReturnStatement;

export type Program = {
  kind: ASTKind.Program;
  statements: Statement[];
};

export type Identifier = {
  kind: ASTKind.Identifier;
  value: string;
};

export type LetStatement = {
  kind: ASTKind.Let;
  name: Identifier;
  value?: Expression;
};

export type ReturnStatement = {
  kind: ASTKind.Return;
  returnValue?: Expression;
};
