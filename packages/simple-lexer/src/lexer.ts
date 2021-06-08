import { DFAState, TokenType } from "./base";
import { SimpleToken, Token } from "./token";
import { SimpleTokenReader } from "./tokenReader";
import { isAlpha, isBlank, isDigit } from "./utils";


// 简单的词法分析器
export default class SimpleLexer {
  private tokenText: string = '';
  private tokens: Token[] = [];
  private token: SimpleToken = new SimpleToken();

  private initToken(ch: string): DFAState {
    if (this.tokenText.length > 0) {
      this.token.setText(this.tokenText.toString());
      this.tokens.push(this.token);

      this.tokenText = '';
      this.token = new SimpleToken();
    }
    let newState: DFAState = DFAState.Initial;
    if (isAlpha(ch)) {
      if (ch === 'i') {
        newState = DFAState.Id_int1;
      } else {
        newState = DFAState.Id;
      }
      this.token.setType(TokenType.Identifier);
      this.tokenText += ch;
    } else if (isDigit(ch)) {
      newState = DFAState.IntLiteral;
      this.token.setType(TokenType.IntLiteral);
      this.tokenText += ch;
    } else if (ch === '>') {
      newState = DFAState.GT;
      this.token.setType(TokenType.GT);
      this.tokenText += ch;
    } else if (ch === '+') {
      newState = DFAState.Plus;
      this.token.setType(TokenType.Plus);
      this.tokenText += ch;
    } else if (ch === '-') {
      newState = DFAState.Subtract;
      this.token.setType(TokenType.Subtract);
      this.tokenText += ch;
    } else if (ch === '*') {
      newState = DFAState.Multiply;
      this.token.setType(TokenType.Multiply);
      this.tokenText += ch;
    } else if (ch === '/') {
      newState = DFAState.Divide;
      this.token.setType(TokenType.Divide);
      this.tokenText += ch;
    } else if (ch === ';') {
      newState = DFAState.SemiColon;
      this.token.setType(TokenType.SemiColon);
      this.tokenText += ch;
    } else if (ch === '(') {
      newState = DFAState.LeftParen;
      this.token.setType(TokenType.LeftParen);
      this.tokenText += ch;
    } else if (ch === ')') {
      newState = DFAState.RightParen;
      this.token.setType(TokenType.RightParen);
      this.tokenText += ch;
    } else if (ch === '=') {
      newState = DFAState.Assignment;
      this.token.setType(TokenType.Assignment);
      this.tokenText += ch;
    } else {
      // 跳过所以未识别的符号
      newState = DFAState.Initial;
    }
    return newState;
  }

  public tokenize(code: string) {
    // 分割代码为字符数组
    const reader = code.split('');
    this.tokens = [];
    this.tokenText = '';

    let ch: string | undefined = '';
    let state: DFAState = DFAState.Initial;
    try {
      while ((ch = reader.pop()) !== undefined) {
        switch (state) {
          case DFAState.Initial:
            state = this.initToken(ch);
            break;
          case DFAState.Id:
            if (isAlpha(ch) || isDigit(ch)) {
              this.tokenText += ch;
            } else {
              state = this.initToken(ch);
            }
            break;
          case DFAState.GT:
            if (ch === '=') {
              this.token.setType(TokenType.GE);
              state = DFAState.GE;
              this.tokenText += ch;
            } else {
              state = this.initToken(ch);
            }
            break;
          case DFAState.GE:
          case DFAState.Assignment:
          case DFAState.Plus:
          case DFAState.Subtract:
          case DFAState.Multiply:
          case DFAState.Divide:
          case DFAState.SemiColon:
          case DFAState.LeftParen:
          case DFAState.RightParen:
            state = this.initToken(ch);
            break;
          case DFAState.IntLiteral:
            if (isDigit(ch)) {
              this.tokenText += ch;
            } else {
              state = this.initToken(ch);
            }
            break;
          case DFAState.Id_int1:
            if (ch === 'n') {
              state = DFAState.Id_int2;
              this.tokenText += ch;
            } else if (isDigit(ch) || isAlpha(ch)) {
              state = DFAState.Id;
              this.tokenText += ch;
            } else {
              state = this.initToken(ch);
            }
            break;
          case DFAState.Id_int2:
            if (ch === 't') {
              state = DFAState.Id_int3;
              this.tokenText += ch;
            } else if (isDigit(ch) || isAlpha(ch)) {
              state = DFAState.Id;
              this.tokenText += ch;
            } else {
              state = this.initToken(ch);
            }
            break;
          case DFAState.Id_int3:
            if (isBlank(ch)) {
              this.token.setType(TokenType.Int);
              state = this.initToken(ch);
            } else {
              state = DFAState.Id;
              this.tokenText += ch;
            }
          default: { }
        }
        if (this.tokenText.length) {
          this.initToken(ch);
        }
      }
    } catch (ex) {
      throw ex;
    }
    return new SimpleTokenReader(this.tokens);
  }
}