/*
 * @Author: your name
 * @Date: 2020-05-14 06:28:31
 * @LastEditTime: 2020-05-15 12:29:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /leetcode/58.最后一个单词的长度.js
 */
/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 *
 * https://leetcode-cn.com/problems/length-of-last-word/description/
 *
 * algorithms
 * Easy (29.66%)
 * Total Accepted:    75.2K
 * Total Submissions: 229.8K
 * Testcase Example:  '"Hello World"'
 *
 * 给定一个仅包含大小写字母和空格 ' ' 的字符串 s，返回其最后一个单词的长度。如果字符串从左向右滚动显示，那么最后一个单词就是最后出现的单词。
 * 
 * 如果不存在最后一个单词，请返回 0 。
 * 
 * 说明：一个单词是指仅由字母组成、不包含任何空格字符的 最大子字符串。
 * 
 * 
 * 
 * 示例:
 * 
 * 输入: "Hello World"
 * 输出: 5
 * 
 * 
 */
/**
 * @param {string} s
 * @return {number}
 */
// 我脑海中出现的第一个方法是，将一个字符串使用split方法分割成数组，
// 分割之后将最后一个字符串取出来获取它的长度，这不就行了吗。

// jsliang 老师的逻辑 第一种方式是暴力破解
// 1、使用split() 将字符串打成数组。
// 2、通过set 给数组去重（这一步为什么需要去重呢？并不是很明白）
// 3、通过[...Object] 这种扩展运算符，再将set 扩展成数组？（扩展运算符为什么可以做数组和set之间的转换呢？）
// var lengthOfLastWord = function (s) {
//   // 防止 'b   a  cc' 的情况，去掉多余空格（去重）
//   const result = [...new Set(s.split(' '))];
//   // 防止 'a  ' 的情况 这种情况下 分离出来的数组 最后一位是 '' 因此取得倒数第二部分的值返回长度
//   if (result.length >= 2 && result[result.length - 1] === '') {
//     return result[result.length - 2].length
//   }
//   // 返回这个单词的长度
//   return result[result.length - 1].length;
// };

// 第二种解法 使用正则表达式
// 解题思路: 进行正则去空格操作，\s 的意思是匹配任何空白字符, 包括空格、制表符、换行符 而 * 表示任意多个 $表示结尾
// 所以 \s*$的意思是匹配结尾的任意个空格，并将其替换成 '' 注意不是空 而是去掉
var lengthOfLastWord = function (s) {
  // 我曾经将这个正则 加了括号 和去掉括号作对比，性能差异明显
  s = s.replace(/(\s*$)/g, "");
  let arr = s.split(' ');
  return arr[arr.length - 1].length;
}

