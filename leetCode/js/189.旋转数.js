var rotate = function (nums, k) {
  // 设置两个变量
  let temp;
  let previous;
  for (let i = 0; i < k; i++) {
    // 这个部分取出的数组的最后一个元素 作为previous
    previous = nums[nums.length - 1];
    // 内层循环 
    for (let j = 0; j < nums.length; j++) {
      // 将当前循环到的元素赋值给一个中间变量 利用中间变量不断地
      // 将前一个元素覆盖后面一个元素，这样循环完一轮，一个元素已经
      // 翻转完毕
      temp = nums[j];
      nums[j] = previous;
      previous = temp;
    }
  }
}
// 数组
var nums = [1, 2, 3, 4, 5, 6, 7];
var k = 3;
rotate(nums, k)