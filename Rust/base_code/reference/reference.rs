fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    // 下面这个代码会报错，因为s是不可变引用 
    s.push_str(" world");
    return s.len()
}