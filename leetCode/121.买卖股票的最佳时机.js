/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/description/
 *
 * algorithms
 * Easy (49.39%)
 * Total Accepted:    42.5K
 * Total Submissions: 86.1K
 * Testcase Example:  '[7,1,5,3,6,4]'
 *
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 *
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
 *
 * 注意你不能在买入股票前卖出股票。
 *
 * 示例 1:
 *
 * 输入: [7,1,5,3,6,4]
 * 输出: 5
 * 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 * ⁠    注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
 *
 *
 * 示例 2:
 *
 * 输入: [7,6,4,3,1]
 * 输出: 0
 * 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 *
 * 这道题目的思路非常的简单，只需要遍历一遍数组，用一个变量记录
 * 遍历过程中的最小值，然后每次计算当前值和这个最小值的差就是利润
 * 然后每次选择较大的利润来进行更新，遍历完成之后利润就是我们想要求的数据。
 * 
 * 
 * 下面的这个算法中如果是最后一天买入,在实际情况是中没有完成交易的
 * 但是在程序中巧妙的使用了 这种差值进行的更新操作。也是能够完成任务的。
 *
 * 这道题目我想思考两个点：es6中 遍历数组的效率最高的方式是什么.
 * 这道题目可以使用 for of 替代  for 循环 类似于java中的增强for 循环。
 *
 *
 *
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let res = 0;
  // 使用 Number.MAX_VALUE 表示js 中能够表示的最大的值 为的是能够
  // 内部使用 Math.min 这个函数找一个参照系
  let buy = Number.MAX_VALUE;
  // 遍历数组
  for (let i = 0; i < prices.length; i++) {
    // 找出遍历当前的最小的值 赋值给 buy 这是我们希望买入的价格
    buy = Math.min(buy, prices[i]);
    // 
    res = Math.max(res, prices[i] - buy);
  }
  return res;
};
