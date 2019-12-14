/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
 *
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/description/
 *
 * algorithms
 * Easy (45.40%)
 * Total Accepted:    60.4K
 * Total Submissions: 124.8K
 * Testcase Example:  '[1,1,2]'
 *
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
 * 
 * 示例 1:
 * 
 * 输入: 1->1->2
 * 输出: 1->2
 * 
 * 
 * 示例 2:
 * 
 * 输入: 1->1->2->3->3
 * 输出: 1->2->3
 * 
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 *  
 */ 
/** 
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  let current = head 
  while(current !== null && current.next !== null) {
    if(current.next.val === current.val){
      current.next = current.next.next;
    }else{
      current = current.next
    }
  }
  return head
};
// 本题也是一道简单的题目，主要考察的是对于链表指针的操作能力，首先给定的链表是一个有序链表
// 我们可以判断当前的这个指针所指向 值和下一个节点的val 是否相等，如果相等，则将next指针
// 指向下一个节点的下一个节点。

