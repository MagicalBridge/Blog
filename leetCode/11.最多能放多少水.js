function maxArea(height) {
  let res = 0;
  let i = 0;
  let j = height.length - 1;

  while (i < j) {
    res = Math.max(res, Math.min(height[i], height[j]) * (j - i));

    if (height[i]< height[j]) { 
      i++;
    } else {
      j--;
    }
  }
  return res;
}


let height = [1, 2, 35, 6, 8];

console.log(maxArea(height));


