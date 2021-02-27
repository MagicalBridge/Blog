/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
var merge = function (A, m, B, n) {
  let pa = 0;
  let pb = 0;
  let sorted = []; // 创建一个新的数组
  let cur;
  // while循环
  while (pa < m || pb < n) {
    if (pa == m) {
      cur = B[pb++]
    } else if (pb == n) {
      cur = A[pa++]
    } else if (A[pa] < B[pb]) {
      cur = A[pa++];
    } else {
      cur = B[pb++];
    }
    sorted[pa + pb - 1] = cur;
  }

  for (let i = 0; i != m + n; i++) {
    A[i] = sorted[i];
  }
};