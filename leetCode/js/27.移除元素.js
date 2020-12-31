var removeElement = function (nums, val) {
  let k = 0;
  // 使用双指针的实现思路，其中一个指针是我们自定义的变量k 另一个指针
  // 就是循环中的i,
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      // 对k所在的位置进行覆盖操作
      nums[k] = nums[i]
      k++;
    }
  }
  return k;
};

var nums = [0, 1, 2, 2, 3, 0, 4, 2];
var val = 2;

removeElement(nums, val);