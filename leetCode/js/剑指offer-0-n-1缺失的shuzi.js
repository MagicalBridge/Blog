/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let i = 0;
  let j = nums.length - 1;
  while (i <= j) {
    let m = parseInt((i + j) / 2, 10);
    if (nums[m] === m) {
      i = m + 1
    } else {
      j = m - 1;
    }
  }
  return i
};

let nums = [0, 1, 2, 3, 5, 6, 7, 8, 9];

const i = missingNumber(nums)

console.log(i);