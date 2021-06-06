import { Token } from './token';

export abstract class TokenReader {
  /**
   * read
   * 返回Token流中的下一个Token，从流中取出。
   * 如果流为空，则返回null
   */
  abstract read(): Token | null;

  /**
   * peek
   * 返回Token流中的下一个Token，但不从流中取出。
   * 如果流为空，则返回null
   */
  abstract peek(): Token | null;

  /**
   * unread Token流回退一步，恢复原来的Token
   */
  abstract unread(): void;

  /**
   * getPosition 获取Token当前的读取位置
   */
  abstract getPosition(): number;

  /**
   * setPosition 设置Token流中当前位置
   * @param position 读取的位置
   */
  abstract setPosition(position: number): void;
}


export class SimpleTokenReader implements TokenReader {
  /**
   * Token列表
   */
  private tokens: Token[] = [];
  /**
   * 当前位置
   */
  private pos: number = 0;


  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  read(): Token | null {
    if (this.pos < this.tokens.length) {
      return this.tokens[this.pos++];
    }
    return null;
  }

  peek(): Token | null {
    if (this.pos < this.tokens.length) {
      return this.tokens[this.pos];
    }
    return null;
  }

  unread(): void {
    if (this.pos > 0) {
      this.pos--;
    }
  }

  getPosition(): number {
    return this.pos;
  }

  setPosition(position: number): void {
    if (position >= 0 && position < this.tokens.length) {
      this.pos = position;
    } else {
      throw new Error('incorrect position');
    }
  }
}