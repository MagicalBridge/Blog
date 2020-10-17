function echo<T>(arg: T): T {
  return arg
}
// 使用泛型可以进行类型推断
const result = echo('str');