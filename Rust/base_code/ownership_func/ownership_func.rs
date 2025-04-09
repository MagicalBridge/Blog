fn main() {
    let s1 = String::from("hello");
    let (s2, len) = calculate_length(s1);
    println!("The length of '{}' is {}.", s2, len);

    let s3 = 5;
    let s4 = change(s3);
    println!("s3 = {}, s4 = {}", s3, s4);
}

fn calculate_length(s: String) -> (String, usize) {
    let length = s.len();
    return (s, length)
}

fn change(s: i32) -> i32 {
    return s + 1
}

