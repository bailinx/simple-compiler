"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlank = exports.isDigit = exports.isAlpha = void 0;
/**
 * 判断字符是否是字母
 * @param ch 字符
 * @returns
 */
var isAlpha = function (ch) {
    return /^[A-Za-z]+$/.test(ch);
};
exports.isAlpha = isAlpha;
/**
 * 判断字符是否是数字
 * @param ch 字符
 * @returns
 */
var isDigit = function (ch) {
    return !isNaN(ch);
};
exports.isDigit = isDigit;
/**
 * 判断是否是空白字符
 * @param ch 字符
 * @returns
 */
var isBlank = function (ch) {
    return ch === ' ' || ch === '\t' || ch === '\n';
};
exports.isBlank = isBlank;
