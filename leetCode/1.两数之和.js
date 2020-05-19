/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 *
 * https://leetcode-cn.com/problems/two-sum/description/
 *
 * algorithms
 * Easy (45.83%)
 * Total Accepted:    350.4K
 * Total Submissions: 764.4K
 * Testcase Example:  '[2,7,11,15]\n9'
 *
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 *
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 *
 * 示例:
 *
 * 给定 nums = [2, 7, 11, 15], target = 9
 *
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 *
 *
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  if (nums === undefined || nums.length === 0) {
    return nums
  }
  // 创建结果数组
  let resArr = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === target - nums[j]) {
        resArr.push(i)
        resArr.push(j)
        break; // 找到一组就跳出循环
      }
    }
  }
  return resArr
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let map = new Map();
  let res = [];
  // 第一遍遍历数组做map 映射
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }
  // 第二遍 进行查找
  for (let index = 0; index < nums.length; index++) {
    let t = target - nums[index];

    if (map.has(t) && map.get(t) != index) {
      res.push(index);
      res.push(map.get(t));
      break;
    }
  }
  return res;
};
