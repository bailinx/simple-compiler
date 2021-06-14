import { ASTNodeType } from "./ASTNodeType";

export interface ASTNode {
  /**
   * 父节点
   */
  getParent: () => ASTNode | null;

  /**
   * 子节点
   */
  getChildren: () => ASTNode[];

  /**
   * 类型
   */
  getType: () => ASTNodeType | null;

  /**
   * 文本值
   */
  getText: () => string;
};

export class SimpleASTNode implements ASTNode {
  private parent: ASTNode | null = null;
  private children: ASTNode[] = [];
  private nodeType: ASTNodeType | null = null;
  private text: string = '';

  constructor(nodeType: ASTNodeType, text: string) {
    this.nodeType = nodeType;
    this.text = text;
  }

  getParent() {
    return this.parent;
  }

  getChildren() {
    return this.children;
  }

  getType() {
    return this.nodeType;
  }

  getText() {
    return this.text;
  }

  /**
   * 添加子节点
   * @param node 
   */
  addChild(node: SimpleASTNode) {
    this.children.push(node);
    node.parent = this;
  }
}