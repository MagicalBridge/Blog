#[derive(Debug)]
struct Reactangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Reactangle {
        width: 30,
        height: 50,
    };
    println!(
        "The area of the rectangle is {} square pixels.",
        area(&rect1)
    );
    println!("{:?}", rect1);

}

fn area(rectangle: &Reactangle) -> u32 {
    rectangle.width * rectangle.height
}