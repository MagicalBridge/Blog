/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// 这种解题的方案着实性能是很好的
var spiralOrder = function (matrix) {
  // 创建一个空的结果数组
  let res = [];
  if (matrix.length === 0) {
    return res;
  }
  // 将矩阵坐标标出来
  let rowBegin = 0; // 初始行
  let rowEnd = matrix.length - 1; // 结束行
  let colBegin = 0; // 初始列
  let colEnd = matrix[0].length - 1; // 结束列，列就是根据行单个元素决定的
  // while循环  循环的条件是 还有行，且还有列
  while (rowBegin <= rowEnd && colBegin <= colEnd) {
    // 从左往右 横向遍历 放进去的是行元素 行元素 row是固定的
    for (let j = colBegin; j <= colEnd; j++) {
      res.push(matrix[rowBegin][j]);
    }
    // 遍历完第一行之后 相当于删掉了一行。
    rowBegin++;
    // 从上往下
    for (let j = rowBegin; j <= rowEnd; j++) {
      res.push(matrix[j][colEnd]);
    }
    // 遍历完成之后删除掉了一列
    colEnd--;

    // 从右往左。
    if (rowBegin <= rowEnd) {
      // traverse left
      for (let j = colEnd; j >= colBegin; j--) {
        res.push(matrix[rowEnd][j])
      }
    }
    rowEnd--;

    // 从下往上，删除第一列
    if (colBegin <= colEnd) {
      // traver up
      for (let j = rowEnd; j >= rowBegin; j--) {
        res.push(matrix[j][colBegin])
      }
    }
    // 删除第一列之后，第一列的索引自增。
    colBegin++;
  }
  return res;
};
var matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
spiralOrder(matrix)