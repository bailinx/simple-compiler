"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleToken = void 0;
var SimpleToken = /** @class */ (function () {
    function SimpleToken() {
        this.type = null;
        this.text = '';
    }
    SimpleToken.prototype.setType = function (type) {
        this.type = type;
    };
    ;
    SimpleToken.prototype.setText = function (text) {
        this.text = text;
    };
    ;
    SimpleToken.prototype.getType = function () {
        return this.type;
    };
    ;
    SimpleToken.prototype.getText = function () {
        return this.text;
    };
    ;
    return SimpleToken;
}());
exports.SimpleToken = SimpleToken;
