"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleTokenReader = exports.TokenReader = void 0;
var TokenReader = /** @class */ (function () {
    function TokenReader() {
    }
    return TokenReader;
}());
exports.TokenReader = TokenReader;
var SimpleTokenReader = /** @class */ (function () {
    function SimpleTokenReader(tokens) {
        /**
         * Token列表
         */
        this.tokens = [];
        /**
         * 当前位置
         */
        this.pos = 0;
        this.tokens = tokens;
    }
    SimpleTokenReader.prototype.read = function () {
        if (this.pos < this.tokens.length) {
            return this.tokens[this.pos++];
        }
        return null;
    };
    SimpleTokenReader.prototype.peek = function () {
        if (this.pos < this.tokens.length) {
            return this.tokens[this.pos];
        }
        return null;
    };
    SimpleTokenReader.prototype.unread = function () {
        if (this.pos > 0) {
            this.pos--;
        }
    };
    SimpleTokenReader.prototype.getPosition = function () {
        return this.pos;
    };
    SimpleTokenReader.prototype.setPosition = function (position) {
        if (position >= 0 && position < this.tokens.length) {
            this.pos = position;
        }
        else {
            throw new Error('incorrect position');
        }
    };
    return SimpleTokenReader;
}());
exports.SimpleTokenReader = SimpleTokenReader;
