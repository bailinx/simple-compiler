export enum ASTNodeType {
  /**
   * 程序入口
   */
  Program,

  /**
   * 整型变量声明
   */
  IntDeclaration,
  
  /**
   * 表达式语句，等号后面分号前面的语句
   */
  ExpressionStmt,

  /**
   * 赋值语句
   */
  AssignmentStmp,

  /**
   * 基础表达式
   */
  Primary,

  /**
   * 乘法表达式
   */
  Multiplicative,

  /**
   * 加号表达式
   */
  Additive,

  /**
   * 标识符
   */
  Identifier,

  /**
   * 整型字面量
   */
  IntLiteral,
}