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
// 第二种 方式是使用map集合这种数据结构
// 首先遍历一遍数组，对数组做一个集合映射
var twoSum = function (nums, target) {
  if (nums === undefined || nums.length === 0) {
    return null
  }
  let res = [];
  // 创建map数据结构
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    // 将数组的值做一个映射
    map.set(nums[i], i);
  }
  console.log(map); // Map { 2 => 0, 7 => 1, 11 => 2, 15 => 3 } 这种数据结构应该深深的印在自己的脑脑海中  
  // 第二次对数组进行遍历
  for (let index = 0; index < nums.length; index++) {
    // 将目标值拿拿出来 没遍历一个数 将对应的t找到
    let t = target - nums[index];
    // map 中常用的操作方法 has 代表查找指定的值,如果能够查找到返回true
    // 查找不到返回false 
    if (map.has(t) && map.get(t) !== index ) { // 不能是他本身
      res.push(index);
      res.push(map.get(t));
      break;
    }
  }
};

let nums = [2, 7, 11, 15];
let target = 9;

console.log(twoSum(nums, target));
