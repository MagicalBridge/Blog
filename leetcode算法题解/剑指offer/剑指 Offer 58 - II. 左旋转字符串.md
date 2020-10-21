字符串的左旋转操作是把**字符串前面的若干个字符转移到字符串的尾部**。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

#### 示例1：
> 输入 s = "abcdefg", k = 2
> 输出 "cdefgab"

#### 示例2：
> 输入: s = "lrloseumgh", k = 6
> 输出: "umghlrlose"

#### 限制：
* 1 <= k < s.length <= 10000

### 涉及到的知识点:
javaScript substring的 用法

substring() 方法用于提取字符串中介于两个指定下标之间的字符。

> stringObject.substring(start,stop)

start: 
必需。一个非负的整数，规定要提取的子串的第一个字符在 stringObject 中的位置。

stop: 
可选。一个非负的整数，比要提取的子串的最后一个字符在 stringObject 中的位置多 1。如果省略该参数，那么返回的子串会一直到字符串的结尾。

返回值： 
返回一个新的字符串，该字符串值包含 stringObject 的一个子字符串，其内容是从 start 处到 stop-1 处的所有字符，其长度为 stop 减 start。

说明: 
substring() 方法返回的子串包括 start 处的字符，但不包括 stop 处的字符。
如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。









