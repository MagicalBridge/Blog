/**
 * 如何将一个字符串的大小写取反（大写字母变成小写字母，小写字母变成大写字母）
 */
// 这里当然可以使用正则进行匹配，但是正则表达式的匹配有些low

let str = 'louis is very 帅气 HAHA !';

str = str.replace(/[a-zA-Z]/g, (content) => {
  // => content 为每一次正则匹配的结果
  // 验证是否是大小写字母：把字母转换为大写后，看和之前的是否一样，如果一样说明是大写
  // 不一样说明是小写。ASCII表中找到大写字母的范围
  return content.toUpperCase() ===content ? content.toLowerCase(): content.toUpperCase();
})

console.log(str);