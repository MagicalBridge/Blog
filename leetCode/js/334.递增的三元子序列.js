/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  let one = Number.MAX_VALUE;
  let two = Number.MAX_VALUE;

  for (let three of nums) {
    if (three > two) {
      return true
    } else if (three <= one) {
      one = three
    } else { // if(three > one && three < two) two = three;
      two = three;
    }
  }
  return false
};
var nums = [2, 1, 5, 6]
increasingTriplet(nums)
