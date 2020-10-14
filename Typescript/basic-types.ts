let isDone: boolean = false;

let age: number = 20;

let binaryNumber: number = 0b1111

let firstName: string = 'louis'
let message: string = `hello ${firstName},age is ${age}`

let u: undefined = undefined;
let n: null = null;

let num: number = undefined;

let notSure: any = 4;
notSure = 'maybe it is a string';
notSure = true;

notSure.name;
notSure.getName();

// 联合类型 字符串或者number
let numberOrString: number | string = 24;
numberOrString = 'test'

// 声明number数组的方式
let arrayOfNumbers: number[] = [1, 2, 3, 4];

// 元组
let user: [string, number] = ['test', 123];