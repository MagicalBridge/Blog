/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 报数
 *
 * https://leetcode-cn.com/problems/count-and-say/description/
 *
 * algorithms
 * Easy (49.46%)
 * Total Accepted:    61.6K
 * Total Submissions: 115.1K
 * Testcase Example:  '1'
 *
 * 报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：
 * 
 * 1.     1
 * 2.     11
 * 3.     21
 * 4.     1211
 * 5.     111221
 * 
 * 
 * 1 被读作  "one 1"  ("一个一") , 即 11。
 * 11 被读作 "two 1s" ("两个一"）, 即 21。
 * 21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。
 * 
 * 给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项。
 * 
 * 注意：整数顺序将表示为一个字符串。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: 1
 * 输出: "1"
 * 
 * 
 * 示例 2:
 * 
 * 输入: 4
 * 输出: "1211"
 * 
 * 
 */
/**
 * @param {number} n
 * @return {string}
 */
// 这道题目思路有些绕，这里稍微解读下：
// 1：当它是 1 的时候，我们就返回字符串 '1'（1）
// 2：当它是 2 的时候，我们就对 1 报数，即 1 个 1（11）
// 3：当它是 3 的时候，我们就对 2 报数，即 2 个 1（21）
// 4：当它是 4 的时候，我们就对 3 报数，即 1 个 2 加上 1 个 1（1211）
// 5：当它是 5 的时候，我们就对 4 报数，即 1 个 1 加上 1 个 2 加上 2 个 1（111221）
// 以此类推……
// 这道题目第一种方式使用的是暴力破解方式 对所有的形式进行枚举

// 第二种方法是递归的调用
var countAndSay = function (n) {
  if (n === 1) {
    return '1';
  } else {
    let preResult = countAndSay(n - 1)
    let nowResult = '';
    let numLength = 1;

    for (let i = 0; i < preResult.length; i++) {
      if (preResult[i] === preResult[i + 1]) {
        numLength++
      } else {
        nowResult = nowResult + numLength + preResult[i];
        numLength = 1
      }
    }
    return nowResult
  }
};

