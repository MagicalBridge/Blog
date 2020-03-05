/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 *
 * https://leetcode-cn.com/problems/palindrome-number/description/
 *
 * algorithms
 * Easy (55.84%)
 * Total Accepted:    149.1K
 * Total Submissions: 263.9K
 * Testcase Example:  '121'
 *
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * 
 * 示例 1:
 * 
 * 输入: 121
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: -121
 * 输出: false
 * 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
 * 
 * 
 * 示例 3:
 * 
 * 输入: 10
 * 输出: false
 * 解释: 从右向左读, 为 01 。因此它不是一个回文数。
 * 
 * 
 * 进阶: 这是follow up 
 * 
 * 你能不将整数转为字符串来解决这个问题吗？
 * 
 */
/**
 * @param {number} x
 * @return {boolean}
 */
// 回文数 常规的解法是 将数字转换为字符串,然后转换为数组
// 按照一个头一个尾巴这种比较方式进行比较 如果不等直接return false
// 1 2 5 7 8 3 4 这样的数字 分别是 0 对应的是 3 1对应的是2
// 0 1 2 3 4 5 6
// 为什么需要将数组的length除以2呢 因为既然是回文 字符串肯定是对称出现的
// 因此,在这种情况下 只需要循环到一半即可 
// 但是又有一个问题，如果数组是奇数和偶数是否应该单独处理呢？
// 1 2 5 2 1 例如这样的一个 lenth / 2 = 2.5 
// arr[0] arr.length -（0+1）对应的是 数组的最后一个
// arr[1] arr.length - (2)  对应的是倒数第二个
// arr[2] arr.length - 3 对应的就是他自己 
// 如果数组是偶数：
// 1 2 8 8 2 1  length / 2 = 3
// 按照那种算法也是可以 找对对称位置的索引的 
var isPalindrome = function(x) {
  let numberToArray = String(x).split('')
  for(let i = 0; i< numberToArray.length / 2;i++) {
    if(numberToArray[i] !== numberToArray[numberToArray.length - (i+1)]) {
      return false
    }
  }
  return true
};

