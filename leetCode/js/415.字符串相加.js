/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  // 最后一个索引
  let i = num1.length - 1; 
  let j = num2.length - 1;
  let add = 0;
  const ans = [];
  // 这里面唯不好理解的就是 add 不为0这个
  while (i >= 0 || j >= 0 || add != 0) {
    const x = i >= 0 ? num1.charAt(i) - '0' : 0;
    const y = j >= 0 ? num2.charAt(j) - '0' : 0;
    const result = x + y + add;
    ans.push(result % 10);
    add = Math.floor(result / 10);
    i -= 1;
    j -= 1;
  }
  return ans.reverse().join('');
}

let num1 = '86043';
let num2 = '5582';

// console.log(addStrings(num1, num2));

console.log( typeof(num1.charAt(0) - '0'))