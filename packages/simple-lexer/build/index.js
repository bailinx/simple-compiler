"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = __importDefault(require("./src/lexer"));
var dump = function (reader) {
    console.log('text\ttype');
    var token = null;
    while ((token = reader.read()) !== null) {
        console.log(token.getText() + "\t" + token.getType());
    }
};
var main = function () {
    var lexer = new lexer_1.default();
    var script = 'int age = 45;';
    var reader = lexer.tokenize(script);
    console.log('parse :' + script);
    dump(reader);
};
main();
