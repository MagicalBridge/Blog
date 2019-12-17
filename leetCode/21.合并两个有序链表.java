/*
 * @lc app=leetcode.cn id=21 lang=java
 *
 * [21] 合并两个有序链表
 *
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/description/
 *
 * algorithms
 * Easy (54.17%)
 * Total Accepted:    151.4K
 * Total Submissions: 258.2K
 * Testcase Example:  '[1,2,4]\n[1,3,4]'
 *
 * 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
 * 
 * 示例：
 * 
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 * 
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
// 这道题目的解题思路就是新创建一个链表，然后比较两个链表中的元素值，把较小的
// 那个链表添加到链表中，由于两个输入的链表的长度可能不同，所以最终会有一个链表
// 先完成插入所有元素，则直接把另外一个未完成的链表直接连入新的链表的结尾
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(-1),cur = dummy;
        
        while(l1 != null && l2 != null){
            if(l1.val <l2.val){
                cur.next = l1;
                l1 = l1.next;
            }else{
                cur.next = l2;
                l2 = l2.next;
            }
            cur = cur.next;
        }
        cur.next = (l1 != null)? l1 : l2;
        return dummy.next
    }
}

