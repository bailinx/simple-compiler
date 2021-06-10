export enum DFAState {
  Initial,
  If, Id_if1, Id_if2,
  Else, Id_else1, Id_else2, Id_else3, Id_else4,
  Int, Id_int1, Id_int2, Id_int3,
  Id,
  GE, // >=
  GT, // >
  Blank, // 空格
  Assignment, // =
  Plus, // +
  Subtract, // -
  Multiply, // *
  Divide, // ÷
  SemiColon, // ;
  LeftParen, // (
  RightParen, // )
  IntLiteral,
}


export enum TokenType {
  Plus, // +
  Subtract, // -
  Multiply, // *
  Divide, // ÷

  GE, // >=
  GT, // >
  EQ, // ==
  LE, // <=
  LT, // <

  SemiColon, // ;
  LeftParen, // (
  RightParen, // )
  Blank, // 空格

  Assignment, // =
  If,
  Else,

  Int,

  Identifier, // 标识符

  IntLiteral, // int字面量
  StringLiteral, // string字面量
}