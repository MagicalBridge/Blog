/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  let res = [];
  helper(s, res, 0, 4, "");
  return res;
};
/**
 * s: 传递进来的字符串 
 * res：最后的结果
 * index: 字符串的索引
 * remain：还剩多少段
 * curr： 当前字符串
 */
function helper(s, res, index, remain, curr) {
  if (remain === 0) { // 如果已经凑齐4段了
    // 单单是凑齐4段还是不行的，还应该判断 给的素材是不是全部用上了
    // 2.5.5.2 这种肯定是不行的。
    if (index === s.length) {
      res.push(curr);
    }
    return
  }
  // 这个for循环 为什么 初始化是 1 到 3 呢？其实这个是有讲究的
  // 因为我们index 从0开始 最少拿1位 最多拿3位。index+1 或者 index+3
  for (let i = 1; i <= 3; i++) {
    // 递归和回溯算法中，对于停止和和什么时候加结果都是有讲究的。
    // 循环中的break 都是减枝逻辑
    if (index + i > s.length) { // 超过字符串的长度
      break;
    }
    // 00 01 052 这种都是不行的 其实就是说 不是第一次循环
    // 0 大头的只取一次。
    if (i !== 1 && s.charAt(index) === '0') {
      break;
    }
    // 需要断点调试
    let tempStr = s.substring(index, index + i)
    let val = Number(tempStr)

    if (val <= 255) {
      helper(s, res, index + i, remain - 1, curr + tempStr + (remain == 1 ? '' : '.'));
    }
  }
}


var s = "25525511135"
restoreIpAddresses(s)