fn main() {
    let mut s = vec!['h', 'e', 'l', 'l', 'o'];
    reverse_string(&mut s);
    println!("{:?}", s); // 输出: ["o","l","l","e","h"]
}

pub fn reverse_string(s: &mut Vec<char>) {
  let mut left = 0;
  let mut right = s.len().saturating_sub(1);

  while left < right {
      s.swap(left, right);
      left += 1;
      right = right.saturating_sub(1);
  }
}