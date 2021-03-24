/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let n = nums.length
  // 判空处理
  if (n === 0) {
    return 0
  }
  let ans = Number.MAX_VALUE
  for (let i = 0; i < n; i++) {
    let sum = 0
    for (let j = i; j < n; j++) {
      sum += nums[j]
      if (sum >= target) {
        ans = Math.min(ans, j - i + 1)
        break
      }
    }
  }
  return ans == Number.MAX_VALUE ? 0 : ans
}

const target = 7
const nums = [2, 3, 1, 2, 4, 3]

const res = minSubArrayLen(target, nums)

console.log(res);
