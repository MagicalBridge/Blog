function rotate(nums, k) {
  let a = []; // 
  for(let i = 0; i < nums.length; i++) {
    a[(i+k) % nums.length] = nums[i];
  }
  for(let i = 0; i < nums.length; i++) {
    nums[i] = a[i];
  }
}
// 数组
var nums = [1, 2, 3, 4, 5, 6, 7];
var k = 3;
rotate(nums, k)