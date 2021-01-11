/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  // reach 代表跳到的最远的距离
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    // 如果遍历的到的索引已经比最远能到到的距离还要大 说明根本没有机会再继续走下去
    if (i > reach) {
      return false;
    }
    reach = Math.max(i + nums[i]);
  }
  return true;
};
// 
var nums = [3, 2, 1, 0, 4];
canJump(nums);

// 第一次循环 i = 0 k = 0 此时 k = 2 继续循环
// 第二趟循环 i = 1 k = 2 此时 k = 4 继续循环
// 第三趟循环 i = 2 k = 4 此时 k = 3 继续循环
// 第四趟循环 i = 3 k = 4 此时 k = 4 继续循环
// 第吴趟循环 i = 4 k = 4 此时 k = 8 退出循环

