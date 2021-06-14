import { TokenType } from "./base";

export interface Token {
  /**
   * 设置Token的类型
   */
  setType: (type: TokenType) => void;

  /**
   * 获取Token的类型
   */
  getType: () => TokenType | null;

  /**
   * 设置Token的文本值
   */
  setText: (text: string) => void;

  /**
   * 获取Token的文本值
   */
  getText: () => string;
}

export class SimpleToken implements Token {

  private type: TokenType | null = null;
  private text: string = '';

  setType(type: TokenType) {
    this.type = type;
  };

  setText(text: string) {
    this.text = text;
  };

  getType() {
    return this.type;
  };

  getText() {
    return this.text;
  };

}