/**
 * 判断字符是否是字母
 * @param ch 字符
 * @returns 
 */
export const isAlpha = (ch: any): ch is string => {
  return /^[A-Za-z]+$/.test(ch);
};

/**
 * 判断字符是否是数字
 * @param ch 字符
 * @returns 
 */
export const isDigit = (ch: any): ch is number => {
  return !isNaN(ch);
};

/**
 * 判断是否是空白字符
 * @param ch 字符
 * @returns 
 */
export const isBlank = (ch: any): boolean => {
  return ch === ' ' || ch === '\t' || ch === '\n';
};