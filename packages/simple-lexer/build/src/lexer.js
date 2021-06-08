"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var token_1 = require("./token");
var tokenReader_1 = require("./tokenReader");
var utils_1 = require("./utils");
// 简单的词法分析器
var SimpleLexer = /** @class */ (function () {
    function SimpleLexer() {
        this.tokenText = '';
        this.tokens = [];
        this.token = new token_1.SimpleToken();
    }
    SimpleLexer.prototype.initToken = function (ch) {
        if (this.tokenText.length > 0) {
            this.token.setText(this.tokenText);
            this.tokens.push(this.token);
            this.tokenText = '';
            this.token = new token_1.SimpleToken();
        }
        var newState = base_1.DFAState.Initial;
        if (utils_1.isAlpha(ch)) {
            if (ch === 'i') {
                newState = base_1.DFAState.Id_int1;
            }
            else {
                newState = base_1.DFAState.Id;
            }
            this.token.setType(base_1.TokenType.Identifier);
            this.tokenText += ch;
        }
        else if (utils_1.isDigit(ch)) {
            newState = base_1.DFAState.IntLiteral;
            this.token.setType(base_1.TokenType.IntLiteral);
            this.tokenText += ch;
        }
        else if (ch === '>') {
            newState = base_1.DFAState.GT;
            this.token.setType(base_1.TokenType.GT);
            this.tokenText += ch;
        }
        else if (ch === '+') {
            newState = base_1.DFAState.Plus;
            this.token.setType(base_1.TokenType.Plus);
            this.tokenText += ch;
        }
        else if (ch === '-') {
            newState = base_1.DFAState.Subtract;
            this.token.setType(base_1.TokenType.Subtract);
            this.tokenText += ch;
        }
        else if (ch === '*') {
            newState = base_1.DFAState.Multiply;
            this.token.setType(base_1.TokenType.Multiply);
            this.tokenText += ch;
        }
        else if (ch === '/') {
            newState = base_1.DFAState.Divide;
            this.token.setType(base_1.TokenType.Divide);
            this.tokenText += ch;
        }
        else if (ch === ';') {
            newState = base_1.DFAState.SemiColon;
            this.token.setType(base_1.TokenType.SemiColon);
            this.tokenText += ch;
        }
        else if (ch === '(') {
            newState = base_1.DFAState.LeftParen;
            this.token.setType(base_1.TokenType.LeftParen);
            this.tokenText += ch;
        }
        else if (ch === ')') {
            newState = base_1.DFAState.RightParen;
            this.token.setType(base_1.TokenType.RightParen);
            this.tokenText += ch;
        }
        else if (ch === '=') {
            newState = base_1.DFAState.Assignment;
            this.token.setType(base_1.TokenType.Assignment);
            this.tokenText += ch;
        }
        else {
            // 跳过所以未识别的符号
            newState = base_1.DFAState.Initial;
        }
        return newState;
    };
    SimpleLexer.prototype.tokenize = function (code) {
        // 分割代码为字符数组
        var reader = code.split('');
        this.tokens = [];
        this.tokenText = '';
        var ch = '';
        var state = base_1.DFAState.Initial;
        try {
            while ((ch = reader.shift()) !== undefined) {
                switch (state) {
                    case base_1.DFAState.Initial:
                        state = this.initToken(ch);
                        break;
                    case base_1.DFAState.Id:
                        if (utils_1.isAlpha(ch) || utils_1.isDigit(ch)) {
                            this.tokenText += ch;
                        }
                        else {
                            state = this.initToken(ch);
                        }
                        break;
                    case base_1.DFAState.GT:
                        if (ch === '=') {
                            this.token.setType(base_1.TokenType.GE);
                            state = base_1.DFAState.GE;
                            this.tokenText += ch;
                        }
                        else {
                            state = this.initToken(ch);
                        }
                        break;
                    case base_1.DFAState.GE:
                    case base_1.DFAState.Assignment:
                    case base_1.DFAState.Plus:
                    case base_1.DFAState.Subtract:
                    case base_1.DFAState.Multiply:
                    case base_1.DFAState.Divide:
                    case base_1.DFAState.SemiColon:
                    case base_1.DFAState.LeftParen:
                    case base_1.DFAState.RightParen:
                        state = this.initToken(ch);
                        break;
                    case base_1.DFAState.IntLiteral:
                        if (utils_1.isDigit(ch)) {
                            this.tokenText += ch;
                        }
                        else {
                            state = this.initToken(ch);
                        }
                        break;
                    case base_1.DFAState.Id_int1:
                        if (ch === 'n') {
                            state = base_1.DFAState.Id_int2;
                            this.tokenText += ch;
                        }
                        else if (utils_1.isDigit(ch) || utils_1.isAlpha(ch)) {
                            state = base_1.DFAState.Id;
                            this.tokenText += ch;
                        }
                        else {
                            state = this.initToken(ch);
                        }
                        break;
                    case base_1.DFAState.Id_int2:
                        if (ch === 't') {
                            state = base_1.DFAState.Id_int3;
                            this.tokenText += ch;
                        }
                        else if (utils_1.isDigit(ch) || utils_1.isAlpha(ch)) {
                            state = base_1.DFAState.Id;
                            this.tokenText += ch;
                        }
                        else {
                            state = this.initToken(ch);
                        }
                        break;
                    case base_1.DFAState.Id_int3:
                        if (utils_1.isBlank(ch)) {
                            this.token.setType(base_1.TokenType.Int);
                            state = this.initToken(ch);
                        }
                        else {
                            state = base_1.DFAState.Id;
                            this.tokenText += ch;
                        }
                    default: { }
                }
                if (this.tokenText.length) {
                    this.initToken(ch);
                }
            }
        }
        catch (ex) {
            throw ex;
        }
        console.log('tokens :', this.tokens);
        return new tokenReader_1.SimpleTokenReader(this.tokens);
    };
    return SimpleLexer;
}());
exports.default = SimpleLexer;
