/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const len = nums.length; // 数组的长度
  const res = []; // 最终的结果数组
  const path = [];
  const used = {};
  dfs(nums, len, 0, path, used, res)
  return res;
};

/**
 * @param {*} nums 原本的数组
 * @param {*} len  数组的长度
 * @param {*} depth 这个变量表示当前程序递归到第几层
 * @param {*} path 本质是一个栈, 
 * @param {*} used 
 * @param {*} res 
 */
function dfs(nums, len, depth, path, used, res) {
  // 递归的终止条件是 一个排列中的数字已经选择够了
  if (depth === len) {
    res.push(path.slice())
    return;
  }
  for (const num of nums) {
    if (used[num]) {
      continue
    }
    path.push(num)
    used[num] = true
    console.log("递归之前：" + JSON.stringify(path));
    dfs(nums, len, depth + 1, path, used, res)
    path.pop();
    used[num] = false
    console.log("递归之后：" + JSON.stringify(path));
  }
  return res
}


let nums = [1, 2, 3]

const res = permute(nums)
// console.log(res);
