/*
 * @lc app=leetcode.cn id=206 lang=java
 *
 * [206] 反转链表
 *
 * https://leetcode-cn.com/problems/reverse-linked-list/description/
 *
 * algorithms
 * Easy (60.64%)
 * Total Accepted:    130.6K
 * Total Submissions: 198.2K
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 反转一个单链表。
 * 
 * 示例:
 * 
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 * 
 * 进阶:
 * 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
 * 
 */
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
// 这不知道是第几次看这个题目了, 这道题目为了增加难度,希望使用迭代和递归两种方式来实现，
// 对于迭代的方法: 思路是在原链表之前建立一个空的 newHead 因为首节点会变，然后从head开始
// 将之后的一个节点移动到 newHead 之后，重复这个操作 直到 head 成为成为最后一个节点为止

class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode pre = null;
        ListNode next = null;
        while(head != null) {
            next = head.next;
            head.next = pre;
            pre = head;
            head = next
        }
        return pre
    }
}

