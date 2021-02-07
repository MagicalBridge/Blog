/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let n = nums.length;
  let l = 1;
  let r = n - 1;
  let ans = -1;
  while (l <= r) {
    let mid = parseInt((l + r) / 2, 10);
    let cnt = 0;
    // for循环 统计小于等于当前元素的个数
    // 对于我传入的数据来说 mid 为4  cnt <= 4的个数是 [1, 2, 3, 3, 4] 总共5个
    for (let i = 0; i < n; i++) {
      if (nums[i] <= mid) {
        cnt = cnt + 1
      }
    }

    if (cnt <= mid) { // 说明目标在右半边 
      l = mid + 1;  // 更新左边界
    } else {
      r = mid - 1;
      ans = mid // 当前的mid 可能是解答
    }
  }
  return ans
};

let arr = [1,3,4,2,2]

findDuplicate(arr)