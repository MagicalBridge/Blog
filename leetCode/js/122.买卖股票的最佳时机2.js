/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let res = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i] < prices[i + 1]) {
      res += prices[i + 1] - prices[i];
    }
  }
  return res;
};
var prices = [7, 1, 5, 6, 7, 9]
maxProfit(prices);
// 具体的执行流程大概是这样的 第二天以 1块钱的价格买入 第三天以5块钱的价格卖出 中间利润是4
// 第三天又以5块钱的几个买入  4 卖  利润 1 以此类推。继续 这样其实并不违反一个原则 
// 