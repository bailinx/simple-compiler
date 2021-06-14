import SimpleLexer, { Token, TokenReader, TokenType } from 'simple-lexer';
import { ASTNode, SimpleASTNode } from "./ASTNode";
import { ASTNodeType } from "./ASTNodeType";

export class Calculator {

  /**
   * 整型变量声明语句
   * @param tokens 
   * @returns 
   */
  public iniDeclare(tokens: TokenReader): SimpleASTNode | null {
    let node: SimpleASTNode | null = null;
    let token: Token | null = tokens.peek();
    // 如果Int标识符
    if (token !== null && token.getType() === TokenType.Int) {
      token = tokens.read();
      // 预读下一个token是标识符，变量名
      if (tokens.peek()?.getType() === TokenType.Identifier) {
        token = tokens.read();
        node = new SimpleASTNode(ASTNodeType.IntDeclaration, token?.getText() || '');
        token = tokens.peek();
        // =
        if (token !== null && token.getType() === TokenType.Assignment) {
          token = tokens.read();
          const child: SimpleASTNode | null = this.additive(tokens);
          if (child !== null) {
            node.addChild(child);
          } else {
            throw new Error('invalide variable initialization, expectiong an expression');
          }
        }
      } else {
        throw new Error('variable name expected');
      }
    }

    // 处理末尾的分号
    if (node !== null) {
      token = tokens.peek();
      if (token !== null && token.getType() === TokenType.SemiColon) {
        tokens.read();
      } else {
        throw new Error('invalid statement, expecting semicolon');
      }
    }
    return node;
  }

  /**
   * 语法解析：加法表达式
   * @param tokens 
   * @returns 
   */
  private additive(tokens: TokenReader): SimpleASTNode | null {
    // 优先解析乘除
    const child1: SimpleASTNode | null = this.multiplicative(tokens);
    let node: SimpleASTNode | null = child1;
    let token = tokens.peek();

    if (child1 !== null && token !== null) {
      if (token.getType() === TokenType.Plus || token.getType() === TokenType.Subtract) {
        token = tokens.read();
        let child2 = this.additive(tokens);
        if (child2 !== null) {
          node = new SimpleASTNode(ASTNodeType.Additive, token?.getText() || '');
          node.addChild(child1);
          node.addChild(child2);
        } else {
          throw new Error('invalid additive expression, expecting the right part');
        }
      }
    }
    return node;
  }

  /**
   * 语法解析：乘法表达式
   * @param tokens 
   * @returns 
   */
  private multiplicative(tokens: TokenReader): SimpleASTNode | null {
    const child1: SimpleASTNode | null = this.primary(tokens);
    let node: SimpleASTNode | null = child1;
    let token = tokens.peek();

    if (child1 !== null && token !== null) {
      if (token.getType() === TokenType.Multiply || token.getType() === TokenType.Divide) {
        token = tokens.read();
        const child2 = this.multiplicative(tokens);
        if (child2 !== null) {
          node = new SimpleASTNode(ASTNodeType.Multiplicative, token?.getText() || '');
          node.addChild(child1);
          node.addChild(child2);
        } else {
          throw new Error('invalid additive expression, expecting the right part');
        }
      }
    }
    return node;
  }

  private primary(tokens: TokenReader): SimpleASTNode | null {
    let node: SimpleASTNode | null = null;
    let token = tokens.peek();
    if (token !== null) {
      if (token.getType() === TokenType.IntLiteral) {
        // int 字面量
        token = tokens.read();
        node = new SimpleASTNode(ASTNodeType.IntLiteral, token?.getText() || '');
      } else if (token.getType() === TokenType.Identifier) {
        // 标识符
        token = tokens.read();
        node = new SimpleASTNode(ASTNodeType.Identifier, token?.getText() || '');
      } else if (token.getType() === TokenType.LeftParen) {
        // 左括号
        token = tokens.read();
        node = this.additive(tokens);
        if (node !== null) {
          token = tokens.peek();
          if (token !== null && token.getType() === TokenType.RightParen) {
            tokens.read();
          } else {
            // 缺少右括号
            throw new Error('expecting right parenthesis');
          }
        } else {
          // 括号内应该有表达式
          throw new Error('expecting an additive expression inside parenthesis');
        }
      }
    }

    return node;
  }

  /**
   * 语法解析：根节点
   * @param tokens 
   * @returns 
   */
  private prog(tokens: TokenReader): ASTNode {
    const node = new SimpleASTNode(ASTNodeType.Program, 'Calculator');
    const child = this.additive(tokens);
    if (child !== null) {
      node.addChild(child);
    }
    return node;
  }

  public calcWithNode(node: ASTNode, indent: string): number {
    let result = 0;
    console.log(indent + 'calculating: ', node.getType());
    switch (node.getType()) {
      case ASTNodeType.Program:
        for (const child of node.getChildren()) {
          result = this.calcWithNode(child, indent + '\t');
        }
        break;
      case ASTNodeType.Additive: {
        // 加法表达式
        const child1 = node.getChildren()[0];
        const value1 = this.calcWithNode(child1, indent + '\t');
        const child2 = node.getChildren()[1];
        const value2 = this.calcWithNode(child2, indent + '\t');
        if (node.getText() === '+') {
          result = value1 + value2;
        } else {
          result = value1 - value2;
        }
      } break;
      case ASTNodeType.Multiplicative: {
        // 乘法表达式
        const child1 = node.getChildren()[0];
        const value1 = this.calcWithNode(child1, indent + '\t');
        const child2 = node.getChildren()[1];
        const value2 = this.calcWithNode(child2, indent + '\t');
        if (node.getText() === '*') {
          result = value1 * value2;
        } else {
          result = value1 / value2;
        }
      } break;
      case ASTNodeType.IntLiteral:
        result = parseInt(node.getText(), 10);
      default: ;
    }
    console.log(indent + 'calculator result = ' + result);
    return result;
  }

  public evaluate(script: string) {
    try {
      const simplelexer = new SimpleLexer();
      const tokens: TokenReader = simplelexer.tokenize(script);

      const tree: ASTNode = this.prog(tokens);

      Calculator.dump(tree, '');
      this.calcWithNode(tree, '');
    } catch (ex) {
      console.error('发生异常: ', ex)
    }
  }



  /**
  * 打印AST节点
  * @param node 
  * @param indent 
  */
  static dump(node: ASTNode, indent: string) {
    console.log(indent + ASTNodeType[node.getType()!] + ' : ' + node.getText());
    for (const item of node.getChildren()) {
      this.dump(item, indent + '\t');
    }
  };
}