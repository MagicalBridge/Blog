/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 *
 * https://leetcode-cn.com/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (37.73%)
 * Total Accepted:    155K
 * Total Submissions: 386.9K
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 
 * 有效字符串需满足：
 * 
 * 
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 
 * 
 * 注意空字符串可被认为是有效字符串。
 * 
 * 示例 1:
 * 
 * 输入: "()"
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: "()[]{}"
 * 输出: true
 * 
 * 
 * 示例 3:
 * 
 * 输入: "(]"
 * 输出: false
 * 
 * 
 * 示例 4:
 * 
 * 输入: "([)]"
 * 输出: false
 * 
 * 
 * 示例 5:
 * 
 * 输入: "{[]}"
 * 输出: true
 * 
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // 创建一个对象,这个对象key:value 成对出现的括号。
  let judge = {
    "(": ")",
    "[": "]",
    "{": "}"
  }
  // 使用 split 方法,将数组分割成字符串
  let param = s.split('')
  // 创建一个空的数组
  let stack = []
  // 对被分割好的字符串进行遍历
  for (let i = 0; i < param.length; i++) {
    // 这个逻辑昨天单步思考的时候有些绕，但是最后还是理解了
    // stack[stack.length-1] 这个就是每次取出stack数组的最后一个元素
    // 因为括号的情况是可以枚举的, 用judge对象去查找这个key得到的是value 如果
    // 当前的这个如果获得的value 和 param当前的值作比较，如果相等说明 正好形成了一对有效的括号
    // 这个时候，就将stack最后一个值弹出去，否则param[i] 必然是 “(”、“[”、“{” 中的一个
    // 当这个参数字符串数组循环完毕的时候，我们检查这个stack 是不是空的，如果是空的说明，所有的
    // 括号都匹配完毕了，如果不是空的 说明还有没有匹配的。返回false
    if (judge[stack[stack.length - 1]] === param[i]) {
      stack.pop()
    } else {
      // 说明是左边类型的括号,放进栈中
      stack.push(param[i])
    }
  }
  if (stack.length === 0) {
    return true
  }
  return false
};

