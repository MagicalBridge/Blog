use std::collections::HashMap;

fn two_sum(nums: Vec<i32>, target: i32) -> Option<Vec<usize>> {
    // 创建哈希表存储值和索引
    let mut hash_table = HashMap::new();
    
    // 第一次遍历：将每个元素的值和索引存入哈希表中
    for (i, &item) in nums.iter().enumerate() {
        hash_table.insert(item, i);
    }

    // 第二次遍历：检查每个元素对应的差值是否存在于哈希表中
    for (i, &x) in nums.iter().enumerate() {
        let complement = target - x;
        if let Some(&p) = hash_table.get(&complement) {
            // 确保找到的元素不同于当前元素
            if p != i {
                return Some(vec![i, p]);
            }
        }
    }
    None
}

fn main() {
  //  vec! 是 Rust 中的一个宏，用于创建一个向量（Vector）。
  // 它的语法是 vec![元素1, 元素2, ...]，其中元素可以是任何实现了 Copy 特征的类型。
  let nums = vec![2, 7, 11, 15];
  let target = 9;
  if let Some(result) = two_sum(nums, target) {
      println!("{:?}", result);
  } else {
      println!("No solution found");
  }
}