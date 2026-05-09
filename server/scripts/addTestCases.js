import mongoose from "mongoose";
import Question from "../models/question.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// Format: {title: [{input, expectedOutput, isHidden},...]}
// input is JSON string of array of args passed to solve(...)
const TEST_CASES = {
  "Two Sum": [
    { input: "[[2,7,11,15], 9]", expectedOutput: "[0,1]", isHidden: false },
    { input: "[[3,2,4], 6]", expectedOutput: "[1,2]", isHidden: false },
    { input: "[[3,3], 6]", expectedOutput: "[0,1]", isHidden: false },
    { input: "[[1,5,3,8,2], 10]", expectedOutput: "[1,3]", isHidden: true },
    { input: "[[0,4,3,0], 0]", expectedOutput: "[0,3]", isHidden: true }
  ],
  "Letter Combinations of a Phone Number": [
    { input: '["23"]', expectedOutput: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', isHidden: false },
    { input: '[""]', expectedOutput: '[]', isHidden: false },
    { input: '["2"]', expectedOutput: '["a","b","c"]', isHidden: false },
    { input: '["9"]', expectedOutput: '["w","x","y","z"]', isHidden: true },
    { input: '["22"]', expectedOutput: '["aa","ab","ac","ba","bb","bc","ca","cb","cc"]', isHidden: true }
  ],
  "Trapping Rain Water": [
    { input: "[[0,1,0,2,1,0,1,3,2,1,2,1]]", expectedOutput: "6", isHidden: false },
    { input: "[[4,2,0,3,2,5]]", expectedOutput: "9", isHidden: false },
    { input: "[[0,0,0]]", expectedOutput: "0", isHidden: false },
    { input: "[[1,2,3,4,5]]", expectedOutput: "0", isHidden: true },
    { input: "[[5,4,3,2,1]]", expectedOutput: "0", isHidden: true },
    { input: "[[4,2,3]]", expectedOutput: "1", isHidden: true }
  ],
  "Longest Substring Without Repeating Characters": [
    { input: '["abcabcbb"]', expectedOutput: "3", isHidden: false },
    { input: '["bbbbb"]', expectedOutput: "1", isHidden: false },
    { input: '["pwwkew"]', expectedOutput: "3", isHidden: false },
    { input: '[""]', expectedOutput: "0", isHidden: true },
    { input: '["dvdf"]', expectedOutput: "3", isHidden: true }
  ],
  "Valid Parentheses": [
    { input: '["()"]', expectedOutput: "true", isHidden: false },
    { input: '["()[]{}"]', expectedOutput: "true", isHidden: false },
    { input: '["(]"]', expectedOutput: "false", isHidden: false },
    { input: '["([)]"]', expectedOutput: "false", isHidden: true },
    { input: '["{[]}"]', expectedOutput: "true", isHidden: true }
  ],
  "Maximum Subarray": [
    { input: "[[-2,1,-3,4,-1,2,1,-5,4]]", expectedOutput: "6", isHidden: false },
    { input: "[[1]]", expectedOutput: "1", isHidden: false },
    { input: "[[5,4,-1,7,8]]", expectedOutput: "23", isHidden: false },
    { input: "[[-1]]", expectedOutput: "-1", isHidden: true },
    { input: "[[-2,-1]]", expectedOutput: "-1", isHidden: true }
  ],
  "Merge Two Sorted Lists": [
    { input: "[[1,2,4],[1,3,4]]", expectedOutput: "[1,1,2,3,4,4]", isHidden: false },
    { input: "[[],[]]", expectedOutput: "[]", isHidden: false },
    { input: "[[],[0]]", expectedOutput: "[0]", isHidden: false },
    { input: "[[1,3,5],[2,4,6]]", expectedOutput: "[1,2,3,4,5,6]", isHidden: true },
    { input: "[[0],[0]]", expectedOutput: "[0,0]", isHidden: true }
  ],
  "Climbing Stairs": [
    { input: "[2]", expectedOutput: "2", isHidden: false },
    { input: "[3]", expectedOutput: "3", isHidden: false },
    { input: "[1]", expectedOutput: "1", isHidden: true },
    { input: "[10]", expectedOutput: "89", isHidden: true },
    { input: "[45]", expectedOutput: "1836311903", isHidden: true }
  ],
  "Best Time to Buy and Sell Stock": [
    { input: "[[7,1,5,3,6,4]]", expectedOutput: "5", isHidden: false },
    { input: "[[7,6,4,3,1]]", expectedOutput: "0", isHidden: false },
    { input: "[[1,2]]", expectedOutput: "1", isHidden: true },
    { input: "[[2,4,1]]", expectedOutput: "2", isHidden: true }
  ],
  "Binary Search": [
    { input: "[[-1,0,3,5,9,12], 9]", expectedOutput: "4", isHidden: false },
    { input: "[[-1,0,3,5,9,12], 2]", expectedOutput: "-1", isHidden: false },
    { input: "[[5], 5]", expectedOutput: "0", isHidden: true },
    { input: "[[1,2,3,4,5], 3]", expectedOutput: "2", isHidden: true },
    { input: "[[1,2,3,4,5], 6]", expectedOutput: "-1", isHidden: true }
  ],
  "Jump Game": [
    { input: "[[2,3,1,1,4]]", expectedOutput: "true", isHidden: false },
    { input: "[[3,2,1,0,4]]", expectedOutput: "false", isHidden: false },
    { input: "[[1]]", expectedOutput: "true", isHidden: false },
    { input: "[[2,0,0]]", expectedOutput: "true", isHidden: true },
    { input: "[[1,0,1,0]]", expectedOutput: "false", isHidden: true }
  ],
  "Subsets": [
    { input: "[[1,2,3]]", expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", isHidden: false },
    { input: "[[0]]", expectedOutput: "[[],[0]]", isHidden: false },
    { input: "[[1,2]]", expectedOutput: "[[],[1],[2],[1,2]]", isHidden: true },
    { input: "[[1]]", expectedOutput: "[[],[1]]", isHidden: true }
  ],
  "Combination Sum": [
    { input: "[[2,3,6,7], 7]", expectedOutput: "[[2,2,3],[7]]", isHidden: false },
    { input: "[[2,3,5], 8]", expectedOutput: "[[2,2,2,2],[2,3,3],[3,5]]", isHidden: false },
    { input: "[[2], 1]", expectedOutput: "[]", isHidden: true },
    { input: "[[2,3], 6]", expectedOutput: "[[2,2,2],[3,3]]", isHidden: true }
  ],
  "Median of Two Sorted Arrays": [
    { input: "[[1,3],[2]]", expectedOutput: "2.0", isHidden: false },
    { input: "[[1,2],[3,4]]", expectedOutput: "2.5", isHidden: false },
    { input: "[[],[1]]", expectedOutput: "1.0", isHidden: true },
    { input: "[[2],[1,3]]", expectedOutput: "2.0", isHidden: true }
  ],
  "Container With Most Water": [
    { input: "[[1,8,6,2,5,4,8,3,7]]", expectedOutput: "49", isHidden: false },
    { input: "[[1,1]]", expectedOutput: "1", isHidden: false },
    { input: "[[4,3,2,1,4]]", expectedOutput: "16", isHidden: true },
    { input: "[[1,2,1]]", expectedOutput: "2", isHidden: true }
  ],
  "Jump Game II": [
    { input: "[[2,3,1,1,4]]", expectedOutput: "2", isHidden: false },
    { input: "[[2,3,0,1,4]]", expectedOutput: "2", isHidden: false },
    { input: "[[1]]", expectedOutput: "0", isHidden: true },
    { input: "[[2,1,2,1,1]]", expectedOutput: "2", isHidden: true }
  ],
  "Search in Rotated Sorted Array": [
    { input: "[[4,5,6,7,0,1,2], 0]", expectedOutput: "4", isHidden: false },
    { input: "[[4,5,6,7,0,1,2], 3]", expectedOutput: "-1", isHidden: false },
    { input: "[[1], 0]", expectedOutput: "-1", isHidden: true },
    { input: "[[1,3], 3]", expectedOutput: "1", isHidden: true }
  ],
  "Rotate Array": [
    { input: "[[1,2,3,4,5,6,7], 3]", expectedOutput: "[5,6,7,1,2,3,4]", isHidden: false },
    { input: "[[-1,-100,3,99], 2]", expectedOutput: "[3,99,-1,-100]", isHidden: false },
    { input: "[[1,2], 1]", expectedOutput: "[2,1]", isHidden: true },
    { input: "[[1], 0]", expectedOutput: "[1]", isHidden: true }
  ],
  "Merge Intervals": [
    { input: "[[[1,3],[2,6],[8,10],[15,18]]]", expectedOutput: "[[1,6],[8,10],[15,18]]", isHidden: false },
    { input: "[[[1,4],[4,5]]]", expectedOutput: "[[1,5]]", isHidden: false },
    { input: "[[[1,4],[0,4]]]", expectedOutput: "[[0,4]]", isHidden: true },
    { input: "[[[1,4],[2,3]]]", expectedOutput: "[[1,4]]", isHidden: true }
  ],
  "Permutations": [
    { input: "[[1,2,3]]", expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", isHidden: false },
    { input: "[[0,1]]", expectedOutput: "[[0,1],[1,0]]", isHidden: false },
    { input: "[[1]]", expectedOutput: "[[1]]", isHidden: true },
    { input: "[[1,2]]", expectedOutput: "[[1,2],[2,1]]", isHidden: true }
  ],
  "3Sum": [
    { input: "[[-1,0,1,2,-1,-4]]", expectedOutput: "[[-1,-1,2],[-1,0,1]]", isHidden: false },
    { input: "[[0,1,1]]", expectedOutput: "[]", isHidden: false },
    { input: "[[0,0,0]]", expectedOutput: "[[0,0,0]]", isHidden: false },
    { input: "[[-2,0,1,1,2]]", expectedOutput: "[[-2,0,2],[-2,1,1]]", isHidden: true }
  ],
  "4Sum": [
    { input: "[[1,0,-1,0,-2,2], 0]", expectedOutput: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]", isHidden: false },
    { input: "[[2,2,2,2,2], 8]", expectedOutput: "[[2,2,2,2]]", isHidden: false },
    { input: "[[1,2,3,4], 10]", expectedOutput: "[[1,2,3,4]]", isHidden: true }
  ],
  "Spiral Matrix": [
    { input: "[[[1,2,3],[4,5,6],[7,8,9]]]", expectedOutput: "[1,2,3,6,9,8,7,4,5]", isHidden: false },
    { input: "[[[1,2,3,4],[5,6,7,8],[9,10,11,12]]]", expectedOutput: "[1,2,3,4,8,12,11,10,9,5,6,7]", isHidden: false },
    { input: "[[[1]]]", expectedOutput: "[1]", isHidden: true },
    { input: "[[[1,2],[3,4]]]", expectedOutput: "[1,2,4,3]", isHidden: true }
  ],
  "Longest Increasing Subsequence": [
    { input: "[[10,9,2,5,3,7,101,18]]", expectedOutput: "4", isHidden: false },
    { input: "[[0,1,0,3,2,3]]", expectedOutput: "4", isHidden: false },
    { input: "[[7,7,7,7,7]]", expectedOutput: "1", isHidden: true },
    { input: "[[1,2,3,4,5]]", expectedOutput: "5", isHidden: true }
  ],
  "Word Break": [
    { input: '["leetcode", ["leet","code"]]', expectedOutput: "true", isHidden: false },
    { input: '["applepenapple", ["apple","pen"]]', expectedOutput: "true", isHidden: false },
    { input: '["catsandog", ["cats","dog","sand","and","cat"]]', expectedOutput: "false", isHidden: false },
    { input: '["cars", ["car","ca","rs"]]', expectedOutput: "true", isHidden: true }
  ],
  "House Robber": [
    { input: "[[1,2,3,1]]", expectedOutput: "4", isHidden: false },
    { input: "[[2,7,9,3,1]]", expectedOutput: "12", isHidden: false },
    { input: "[[1]]", expectedOutput: "1", isHidden: true },
    { input: "[[2,1]]", expectedOutput: "2", isHidden: true },
    { input: "[[5,3,4,11,2]]", expectedOutput: "16", isHidden: true }
  ],
  "Best Time to Buy and Sell Stock II": [
    { input: "[[7,1,5,3,6,4]]", expectedOutput: "7", isHidden: false },
    { input: "[[1,2,3,4,5]]", expectedOutput: "4", isHidden: false },
    { input: "[[7,6,4,3,1]]", expectedOutput: "0", isHidden: false },
    { input: "[[1,2,1,2]]", expectedOutput: "2", isHidden: true }
  ],
  "Generate Parentheses": [
    { input: "[1]", expectedOutput: '["()"]', isHidden: false },
    { input: "[2]", expectedOutput: '["(())","()()"]', isHidden: false },
    { input: "[3]", expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]', isHidden: true },
    { input: "[4]", expectedOutput: '["(((())))","((()()))","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"]', isHidden: true }
  ],
  "Coin Change": [
    { input: "[[1,5,11], 11]", expectedOutput: "1", isHidden: false },
    { input: "[[1,5,6,9], 11]", expectedOutput: "2", isHidden: false },
    { input: "[[1,2,5], 11]", expectedOutput: "3", isHidden: false },
    { input: "[[2], 3]", expectedOutput: "-1", isHidden: true },
    { input: "[[1], 0]", expectedOutput: "0", isHidden: true }
  ],
  "Decode Ways": [
    { input: '["12"]', expectedOutput: "2", isHidden: false },
    { input: '["226"]', expectedOutput: "3", isHidden: false },
    { input: '["06"]', expectedOutput: "0", isHidden: false },
    { input: '["1"]', expectedOutput: "1", isHidden: true },
    { input: '["10"]', expectedOutput: "1", isHidden: true }
  ],
  "Longest Common Prefix": [
    { input: '[["flower","flow","flight"]]', expectedOutput: '"fl"', isHidden: false },
    { input: '[["dog","racecar","car"]]', expectedOutput: '""', isHidden: false },
    { input: '[["a"]]', expectedOutput: '"a"', isHidden: true },
    { input: '[["abc","abc","abc"]]', expectedOutput: '"abc"', isHidden: true }
  ],
  "Set Matrix Zeroes": [
    { input: "[[[1,1,1],[1,0,1],[1,1,1]]]", expectedOutput: "[[1,0,1],[0,0,0],[1,0,1]]", isHidden: false },
    { input: "[[[0,1,2,0],[3,4,5,2],[1,3,1,5]]]", expectedOutput: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]", isHidden: false },
    { input: "[[[1]]]", expectedOutput: "[[1]]", isHidden: true },
    { input: "[[[0]]]", expectedOutput: "[[0]]", isHidden: true }
  ],
  "Top K Frequent Elements": [
    { input: "[[1,1,1,2,2,3], 2]", expectedOutput: "[1,2]", isHidden: false },
    { input: "[[1], 1]", expectedOutput: "[1]", isHidden: false },
    { input: "[[4,1,2,1,2,4,3], 2]", expectedOutput: "[4,1]", isHidden: true },
    { input: "[[1,2,3,4,4,4], 1]", expectedOutput: "[4]", isHidden: true }
  ],
  "Course Schedule": [
    { input: "[2, [[1,0]]]", expectedOutput: "true", isHidden: false },
    { input: "[2, [[1,0],[0,1]]]", expectedOutput: "false", isHidden: false },
    { input: "[1, []]", expectedOutput: "true", isHidden: true },
    { input: "[3, [[0,1],[0,2],[1,2]]]", expectedOutput: "true", isHidden: true }
  ],
  "Number of Islands": [
    { input: '[[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]]', expectedOutput: "1", isHidden: false },
    { input: '[[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]]', expectedOutput: "3", isHidden: false },
    { input: '[[["0"]]]', expectedOutput: "0", isHidden: true },
    { input: '[[["1"]]]', expectedOutput: "1", isHidden: true }
  ],
  "Reverse Linked List": [
    { input: "[[1,2,3,4,5]]", expectedOutput: "[5,4,3,2,1]", isHidden: false },
    { input: "[[1,2]]", expectedOutput: "[2,1]", isHidden: false },
    { input: "[[1]]", expectedOutput: "[1]", isHidden: true },
    { input: "[[]]", expectedOutput: "[]", isHidden: true }
  ],
  "Kth Largest Element in an Array": [
    { input: "[[3,2,1,5,6,4], 2]", expectedOutput: "5", isHidden: false },
    { input: "[[3,2,3,1,2,4,5,5,6], 4]", expectedOutput: "4", isHidden: false },
    { input: "[[1], 1]", expectedOutput: "1", isHidden: true },
    { input: "[[7,6,5,4,3,2,1], 3]", expectedOutput: "5", isHidden: true }
  ],
  "Longest Palindromic Substring": [
    { input: '["babad"]', expectedOutput: '"bab"', isHidden: false },
    { input: '["cbbd"]', expectedOutput: '"bb"', isHidden: false },
    { input: '["a"]', expectedOutput: '"a"', isHidden: true },
    { input: '["ac"]', expectedOutput: '"a"', isHidden: true }
  ],
  "LRU Cache": [
    { input: "[2, [[\"put\",1,1],[\"put\",2,2],[\"get\",1],[\"put\",3,3],[\"get\",2],[\"put\",4,4],[\"get\",1],[\"get\",3],[\"get\",4]]]", expectedOutput: "[1,-1,-1,3,4]", isHidden: false },
    { input: "[1, [[\"put\",2,1],[\"get\",2],[\"put\",3,2],[\"get\",2],[\"get\",3]]]", expectedOutput: "[1,-1,2]", isHidden: true }
  ],
  "Max Area of Island": [
    { input: "[[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]]", expectedOutput: "6", isHidden: false },
    { input: "[[[0,0,0,0,0,0,0,0]]]", expectedOutput: "0", isHidden: false },
    { input: "[[[1,1],[1,0]]]", expectedOutput: "3", isHidden: true },
    { input: "[[[0]]]", expectedOutput: "0", isHidden: true }
  ],
  "Single Number": [
    { input: "[[2,2,1]]", expectedOutput: "1", isHidden: false },
    { input: "[[4,1,2,1,2]]", expectedOutput: "4", isHidden: false },
    { input: "[[1]]", expectedOutput: "1", isHidden: true },
    { input: "[[0,1,0]]", expectedOutput: "1", isHidden: true }
  ],
  "Edit Distance": [
    { input: '["horse","ros"]', expectedOutput: "3", isHidden: false },
    { input: '["intention","execution"]', expectedOutput: "5", isHidden: false },
    { input: '["",""]', expectedOutput: "0", isHidden: true },
    { input: '["abc","abc"]', expectedOutput: "0", isHidden: true },
    { input: '["abc",""]', expectedOutput: "3", isHidden: true }
  ],
  "Counting Bits": [
    { input: "[2]", expectedOutput: "[0,1,1]", isHidden: false },
    { input: "[5]", expectedOutput: "[0,1,1,2,1,2]", isHidden: false },
    { input: "[0]", expectedOutput: "[0]", isHidden: true },
    { input: "[8]", expectedOutput: "[0,1,1,2,1,2,2,3,1]", isHidden: true }
  ],
  "Word Search": [
    { input: '[[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCCED"]', expectedOutput: "true", isHidden: false },
    { input: '[[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"SEE"]', expectedOutput: "true", isHidden: false },
    { input: '[[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCB"]', expectedOutput: "false", isHidden: false },
    { input: '[[["a"]],"a"]', expectedOutput: "true", isHidden: true }
  ],
  "Valid Palindrome": [
    { input: '["A man, a plan, a canal: Panama"]', expectedOutput: "true", isHidden: false },
    { input: '["race a car"]', expectedOutput: "false", isHidden: false },
    { input: '[" "]', expectedOutput: "true", isHidden: false },
    { input: '["0P"]', expectedOutput: "false", isHidden: true }
  ],
  "Unique Paths": [
    { input: "[3,7]", expectedOutput: "28", isHidden: false },
    { input: "[3,2]", expectedOutput: "3", isHidden: false },
    { input: "[1,1]", expectedOutput: "1", isHidden: true },
    { input: "[2,2]", expectedOutput: "2", isHidden: true },
    { input: "[5,5]", expectedOutput: "70", isHidden: true }
  ],
  "Maximum Depth of Binary Tree": [
    { input: "[[3,9,20,null,null,15,7]]", expectedOutput: "3", isHidden: false },
    { input: "[[1,null,2]]", expectedOutput: "2", isHidden: false },
    { input: "[[]]", expectedOutput: "0", isHidden: true },
    { input: "[[1]]", expectedOutput: "1", isHidden: true }
  ],
  "Power of Two": [
    { input: "[1]", expectedOutput: "true", isHidden: false },
    { input: "[16]", expectedOutput: "true", isHidden: false },
    { input: "[3]", expectedOutput: "false", isHidden: false },
    { input: "[0]", expectedOutput: "false", isHidden: true },
    { input: "[1024]", expectedOutput: "true", isHidden: true }
  ],
  "Roman to Integer": [
    { input: '["III"]', expectedOutput: "3", isHidden: false },
    { input: '["LVIII"]', expectedOutput: "58", isHidden: false },
    { input: '["MCMXCIV"]', expectedOutput: "1994", isHidden: false },
    { input: '["IX"]', expectedOutput: "9", isHidden: true },
    { input: '["XLII"]', expectedOutput: "42", isHidden: true }
  ],
  "Validate Binary Search Tree": [
    { input: "[[2,1,3]]", expectedOutput: "true", isHidden: false },
    { input: "[[5,1,4,null,null,3,6]]", expectedOutput: "false", isHidden: false },
    { input: "[[1]]", expectedOutput: "true", isHidden: true },
    { input: "[[2,2,2]]", expectedOutput: "false", isHidden: true }
  ],
  "Number of Connected Components": [
    { input: "[5, [[0,1],[1,2],[3,4]]]", expectedOutput: "2", isHidden: false },
    { input: "[5, [[0,1],[1,2],[2,3],[3,4]]]", expectedOutput: "1", isHidden: false },
    { input: "[3, []]", expectedOutput: "3", isHidden: true },
    { input: "[4, [[0,1],[2,3]]]", expectedOutput: "2", isHidden: true }
  ],
  "Reverse Bits": [
    { input: "[43261596]", expectedOutput: "964176192", isHidden: false },
    { input: "[4294967293]", expectedOutput: "3221225471", isHidden: false },
    { input: "[0]", expectedOutput: "0", isHidden: true }
  ],
  "Missing Number": [
    { input: "[[3,0,1]]", expectedOutput: "2", isHidden: false },
    { input: "[[0,1]]", expectedOutput: "2", isHidden: false },
    { input: "[[9,6,4,2,3,5,7,0,1]]", expectedOutput: "8", isHidden: false },
    { input: "[[0]]", expectedOutput: "1", isHidden: true }
  ],
  "Sum of Two Integers Without + Operator": [
    { input: "[1,2]", expectedOutput: "3", isHidden: false },
    { input: "[2,3]", expectedOutput: "5", isHidden: false },
    { input: "[-1,1]", expectedOutput: "0", isHidden: true },
    { input: "[100,200]", expectedOutput: "300", isHidden: true }
  ],
  "Minimum Path Sum": [
    { input: "[[[1,3,1],[1,5,1],[4,2,1]]]", expectedOutput: "7", isHidden: false },
    { input: "[[[1,2,3],[4,5,6]]]", expectedOutput: "12", isHidden: false },
    { input: "[[[1]]]", expectedOutput: "1", isHidden: true },
    { input: "[[[1,2],[1,1]]]", expectedOutput: "3", isHidden: true }
  ],
  "Excel Sheet Column Number": [
    { input: '["A"]', expectedOutput: "1", isHidden: false },
    { input: '["AB"]', expectedOutput: "28", isHidden: false },
    { input: '["ZY"]', expectedOutput: "701", isHidden: false },
    { input: '["Z"]', expectedOutput: "26", isHidden: true }
  ],
  "Number of 1 Bits": [
    { input: "[11]", expectedOutput: "3", isHidden: false },
    { input: "[128]", expectedOutput: "1", isHidden: false },
    { input: "[7]", expectedOutput: "3", isHidden: true },
    { input: "[0]", expectedOutput: "0", isHidden: true }
  ],
  "Integer to Roman": [
    { input: "[3749]", expectedOutput: '"MMMDCCXLIX"', isHidden: false },
    { input: "[58]", expectedOutput: '"LVIII"', isHidden: false },
    { input: "[1994]", expectedOutput: '"MCMXCIV"', isHidden: false },
    { input: "[9]", expectedOutput: '"IX"', isHidden: true }
  ],
  "Meeting Rooms II": [
    { input: "[[[0,30],[5,10],[15,20]]]", expectedOutput: "2", isHidden: false },
    { input: "[[[7,10],[2,4]]]", expectedOutput: "1", isHidden: false },
    { input: "[[[1,5],[1,5],[1,5]]]", expectedOutput: "3", isHidden: true },
    { input: "[[[1,2],[3,4]]]", expectedOutput: "1", isHidden: true }
  ],
  "Daily Temperatures": [
    { input: "[[73,74,75,71,69,72,76,73]]", expectedOutput: "[1,1,4,2,1,1,0,0]", isHidden: false },
    { input: "[[30,40,50,60]]", expectedOutput: "[1,1,1,0]", isHidden: false },
    { input: "[[30,60,90]]", expectedOutput: "[1,1,0]", isHidden: false },
    { input: "[[34,80,80,34,34,80,80,80,80,34]]", expectedOutput: "[1,0,0,2,1,0,0,0,0,0]", isHidden: true }
  ],
  "Max Consecutive Ones III": [
    { input: "[[1,1,1,0,0,0,1,1,1,1,0], 2]", expectedOutput: "6", isHidden: false },
    { input: "[[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3]", expectedOutput: "10", isHidden: false },
    { input: "[[0,0,0], 0]", expectedOutput: "0", isHidden: true },
    { input: "[[1,1,1], 2]", expectedOutput: "3", isHidden: true }
  ],
  "Product of Array Except Self": [
    { input: "[[1,2,3,4]]", expectedOutput: "[24,12,8,6]", isHidden: false },
    { input: "[[-1,1,0,-3,3]]", expectedOutput: "[0,0,9,0,0]", isHidden: false },
    { input: "[[1,2]]", expectedOutput: "[2,1]", isHidden: true },
    { input: "[[1,1,1]]", expectedOutput: "[1,1,1]", isHidden: true }
  ],
  "Insert Interval": [
    { input: "[[[1,3],[6,9]], [2,5]]", expectedOutput: "[[1,5],[6,9]]", isHidden: false },
    { input: "[[[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]]", expectedOutput: "[[1,2],[3,10],[12,16]]", isHidden: false },
    { input: "[[], [5,7]]", expectedOutput: "[[5,7]]", isHidden: true },
    { input: "[[[1,5]], [2,3]]", expectedOutput: "[[1,5]]", isHidden: true }
  ],
  "Non-overlapping Intervals": [
    { input: "[[[1,2],[2,3],[3,4],[1,3]]]", expectedOutput: "1", isHidden: false },
    { input: "[[[1,2],[1,2],[1,2]]]", expectedOutput: "2", isHidden: false },
    { input: "[[[1,2],[2,3]]]", expectedOutput: "0", isHidden: false },
    { input: "[[[1,100],[11,22],[1,11],[2,12]]]", expectedOutput: "2", isHidden: true }
  ],
  "Task Scheduler": [
    { input: '[[["A","A","A","B","B","B"], 2]]', expectedOutput: "8", isHidden: false },
    { input: '[[["A","C","A","B","D","B"], 1]]', expectedOutput: "6", isHidden: false },
    { input: '[[["A","A","A","B","B","B"], 0]]', expectedOutput: "6", isHidden: true },
    { input: '[[["A","A"], 2]]', expectedOutput: "4", isHidden: true }
  ],
  "Subarray Sum Equals K": [
    { input: "[[1,1,1], 2]", expectedOutput: "2", isHidden: false },
    { input: "[[1,2,3], 3]", expectedOutput: "2", isHidden: false },
    { input: "[[1], 0]", expectedOutput: "0", isHidden: true },
    { input: "[[-1,-1,1], 0]", expectedOutput: "1", isHidden: true }
  ],
  "Contiguous Array": [
    { input: "[[0,1]]", expectedOutput: "2", isHidden: false },
    { input: "[[0,1,0]]", expectedOutput: "2", isHidden: false },
    { input: "[[0,0,0,0]]", expectedOutput: "0", isHidden: true },
    { input: "[[0,1,1,0,0,1]]", expectedOutput: "6", isHidden: true }
  ],
  "Largest Rectangle in Histogram": [
    { input: "[[2,1,5,6,2,3]]", expectedOutput: "10", isHidden: false },
    { input: "[[2,4]]", expectedOutput: "4", isHidden: false },
    { input: "[[1]]", expectedOutput: "1", isHidden: true },
    { input: "[[3,3,3]]", expectedOutput: "9", isHidden: true }
  ],
  "Meeting Rooms": [
    { input: "[[[0,30],[5,10],[15,20]]]", expectedOutput: "false", isHidden: false },
    { input: "[[[7,10],[2,4]]]", expectedOutput: "true", isHidden: false },
    { input: "[[[]]]", expectedOutput: "true", isHidden: true },
    { input: "[[[1,2],[3,4],[5,6]]]", expectedOutput: "true", isHidden: true }
  ],
  "Evaluate Reverse Polish Notation": [
    { input: '[["2","1","+","3","*"]]', expectedOutput: "9", isHidden: false },
    { input: '[["4","13","5","/","+"]]', expectedOutput: "6", isHidden: false },
    { input: '[["10","6","9","3","+","-11","*","/","*","17","+","5","+"]]', expectedOutput: "22", isHidden: false },
    { input: '[["3","4","+"]]', expectedOutput: "7", isHidden: true }
  ],
  "Move Zeroes": [
    { input: "[[0,1,0,3,12]]", expectedOutput: "[1,3,12,0,0]", isHidden: false },
    { input: "[[0]]", expectedOutput: "[0]", isHidden: false },
    { input: "[[1,0,1]]", expectedOutput: "[1,1,0]", isHidden: true },
    { input: "[[1,2,3]]", expectedOutput: "[1,2,3]", isHidden: true }
  ],
  "Valid Anagram": [
    { input: '["anagram","nagaram"]', expectedOutput: "true", isHidden: false },
    { input: '["rat","car"]', expectedOutput: "false", isHidden: false },
    { input: '["a","a"]', expectedOutput: "true", isHidden: true },
    { input: '["ab","ba"]', expectedOutput: "true", isHidden: true }
  ],
  "Squares of a Sorted Array": [
    { input: "[[-4,-1,0,3,10]]", expectedOutput: "[0,1,9,16,100]", isHidden: false },
    { input: "[[-7,-3,2,3,11]]", expectedOutput: "[4,9,9,49,121]", isHidden: false },
    { input: "[[-1]]", expectedOutput: "[1]", isHidden: true },
    { input: "[[0,1,2]]", expectedOutput: "[0,1,4]", isHidden: true }
  ],
  "Can Place Flowers": [
    { input: "[[1,0,0,0,1], 1]", expectedOutput: "true", isHidden: false },
    { input: "[[1,0,0,0,1], 2]", expectedOutput: "false", isHidden: false },
    { input: "[[0], 1]", expectedOutput: "true", isHidden: true },
    { input: "[[1,0,1], 1]", expectedOutput: "false", isHidden: true }
  ],
  "Find Peak Element": [
    { input: "[[1,2,3,1]]", expectedOutput: "2", isHidden: false },
    { input: "[[1,2,1,3,5,6,4]]", expectedOutput: "5", isHidden: false },
    { input: "[[1]]", expectedOutput: "0", isHidden: true }
  ],
  "Maximum Product Subarray": [
    { input: "[[2,3,-2,4]]", expectedOutput: "6", isHidden: false },
    { input: "[[-2,0,-1]]", expectedOutput: "0", isHidden: false },
    { input: "[[-2,3,-4]]", expectedOutput: "24", isHidden: true },
    { input: "[[2,-5,-2,-4,3]]", expectedOutput: "24", isHidden: true }
  ],
  "Increasing Triplet Subsequence": [
    { input: "[[1,2,3,4,5]]", expectedOutput: "true", isHidden: false },
    { input: "[[5,4,3,2,1]]", expectedOutput: "false", isHidden: false },
    { input: "[[2,1,5,0,4,6]]", expectedOutput: "true", isHidden: false },
    { input: "[[1,2]]", expectedOutput: "false", isHidden: true }
  ],
  "Reorganize String": [
    { input: '["aab"]', expectedOutput: '"aba"', isHidden: false },
    { input: '["aaab"]', expectedOutput: '""', isHidden: false },
    { input: '["a"]', expectedOutput: '"a"', isHidden: true },
    { input: '["aabb"]', expectedOutput: '"abab"', isHidden: true }
  ],
  "Reverse Words in a String": [
    { input: '["the sky is blue"]', expectedOutput: '"blue is sky the"', isHidden: false },
    { input: '["  hello world  "]', expectedOutput: '"world hello"', isHidden: false },
    { input: '["a good   example"]', expectedOutput: '"example good a"', isHidden: true }
  ],
  "Binary Tree Level Order Traversal": [
    { input: "[[3,9,20,null,null,15,7]]", expectedOutput: "[[3],[9,20],[15,7]]", isHidden: false },
    { input: "[[1]]", expectedOutput: "[[1]]", isHidden: false },
    { input: "[[]]", expectedOutput: "[]", isHidden: true }
  ],
  "Path Sum": [
    { input: "[[5,4,8,11,null,13,4,7,2,null,null,null,1], 22]", expectedOutput: "true", isHidden: false },
    { input: "[[1,2,3], 5]", expectedOutput: "false", isHidden: false },
    { input: "[[], 0]", expectedOutput: "false", isHidden: true },
    { input: "[[1,2], 1]", expectedOutput: "false", isHidden: true }
  ],
  "Invert Binary Tree": [
    { input: "[[4,2,7,1,3,6,9]]", expectedOutput: "[4,7,2,9,6,3,1]", isHidden: false },
    { input: "[[2,1,3]]", expectedOutput: "[2,3,1]", isHidden: false },
    { input: "[[]]", expectedOutput: "[]", isHidden: true }
  ],
  "Fibonacci Number": [
    { input: "[2]", expectedOutput: "1", isHidden: false },
    { input: "[3]", expectedOutput: "2", isHidden: false },
    { input: "[4]", expectedOutput: "3", isHidden: false },
    { input: "[0]", expectedOutput: "0", isHidden: true },
    { input: "[10]", expectedOutput: "55", isHidden: true }
  ],
  "Palindrome Number": [
    { input: "[121]", expectedOutput: "true", isHidden: false },
    { input: "[-121]", expectedOutput: "false", isHidden: false },
    { input: "[10]", expectedOutput: "false", isHidden: false },
    { input: "[0]", expectedOutput: "true", isHidden: true },
    { input: "[1221]", expectedOutput: "true", isHidden: true }
  ],
  "Contains Duplicate": [
    { input: "[[1,2,3,1]]", expectedOutput: "true", isHidden: false },
    { input: "[[1,2,3,4]]", expectedOutput: "false", isHidden: false },
    { input: "[[1]]", expectedOutput: "false", isHidden: true },
    { input: "[[1,1]]", expectedOutput: "true", isHidden: true }
  ],
  "First Unique Character in a String": [
    { input: '["leetcode"]', expectedOutput: "0", isHidden: false },
    { input: '["loveleetcode"]', expectedOutput: "2", isHidden: false },
    { input: '["aabb"]', expectedOutput: "-1", isHidden: false },
    { input: '["z"]', expectedOutput: "0", isHidden: true }
  ],
  "Majority Element": [
    { input: "[[3,2,3]]", expectedOutput: "3", isHidden: false },
    { input: "[[2,2,1,1,1,2,2]]", expectedOutput: "2", isHidden: false },
    { input: "[[1]]", expectedOutput: "1", isHidden: true },
    { input: "[[3,3,4]]", expectedOutput: "3", isHidden: true }
  ],
  "Happy Number": [
    { input: "[19]", expectedOutput: "true", isHidden: false },
    { input: "[2]", expectedOutput: "false", isHidden: false },
    { input: "[1]", expectedOutput: "true", isHidden: true },
    { input: "[7]", expectedOutput: "true", isHidden: true }
  ],
  "Reverse String": [
    { input: '[["h","e","l","l","o"]]', expectedOutput: '["o","l","l","e","h"]', isHidden: false },
    { input: '[["H","a","n","n","a","h"]]', expectedOutput: '["h","a","n","n","a","H"]', isHidden: false },
    { input: '[["a"]]', expectedOutput: '["a"]', isHidden: true }
  ],
  "Largest Number": [
    { input: "[[10,2]]", expectedOutput: '"210"', isHidden: false },
    { input: "[[3,30,34,5,9]]", expectedOutput: '"9534330"', isHidden: false },
    { input: "[[0,0]]", expectedOutput: '"0"', isHidden: true },
    { input: "[[1]]", expectedOutput: '"1"', isHidden: true }
  ],
  "Symmetric Tree": [
    { input: "[[1,2,2,3,4,4,3]]", expectedOutput: "true", isHidden: false },
    { input: "[[1,2,2,null,3,null,3]]", expectedOutput: "false", isHidden: false },
    { input: "[[1]]", expectedOutput: "true", isHidden: true }
  ],
  "Diameter of Binary Tree": [
    { input: "[[1,2,3,4,5]]", expectedOutput: "3", isHidden: false },
    { input: "[[1,2]]", expectedOutput: "1", isHidden: false },
    { input: "[[1]]", expectedOutput: "0", isHidden: true },
    { input: "[[1,2,null,3,null,4]]", expectedOutput: "3", isHidden: true }
  ],
  "Balanced Binary Tree": [
    { input: "[[3,9,20,null,null,15,7]]", expectedOutput: "true", isHidden: false },
    { input: "[[1,2,2,3,3,null,null,4,4]]", expectedOutput: "false", isHidden: false },
    { input: "[[]]", expectedOutput: "true", isHidden: true }
  ],
  "Pascal's Triangle": [
    { input: "[5]", expectedOutput: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]", isHidden: false },
    { input: "[1]", expectedOutput: "[[1]]", isHidden: false },
    { input: "[3]", expectedOutput: "[[1],[1,1],[1,2,1]]", isHidden: true }
  ],
  "Find All Numbers Disappeared in an Array": [
    { input: "[[4,3,2,7,8,2,3,1]]", expectedOutput: "[5,6]", isHidden: false },
    { input: "[[1,1]]", expectedOutput: "[2]", isHidden: false },
    { input: "[[1]]", expectedOutput: "[]", isHidden: true },
    { input: "[[2,2]]", expectedOutput: "[1]", isHidden: true }
  ],
  "Merge Sorted Array": [
    { input: "[[1,2,3,0,0,0], 3, [2,5,6], 3]", expectedOutput: "[1,2,2,3,5,6]", isHidden: false },
    { input: "[[1], 1, [], 0]", expectedOutput: "[1]", isHidden: false },
    { input: "[[0], 0, [1], 1]", expectedOutput: "[1]", isHidden: false },
    { input: "[[2,0], 1, [1], 1]", expectedOutput: "[1,2]", isHidden: true }
  ],
  "Min Stack": [
    { input: "[[[\"-2\"],[\"-2\"],[\"0\"],[\"0\"],[\"-3\"],[\"-3\"],[\"pop\"],[\"top\"],[\"getMin\"]]]", expectedOutput: "[-3,-3,0,-2]", isHidden: false }
  ],
  "Minimum Depth of Binary Tree": [
    { input: "[[3,9,20,null,null,15,7]]", expectedOutput: "2", isHidden: false },
    { input: "[[2,null,3,null,4,null,5,null,6]]", expectedOutput: "5", isHidden: false },
    { input: "[[1]]", expectedOutput: "1", isHidden: true }
  ],
  "Implement Queue using Stacks": [
    { input: '[[["push",1],["push",2],["peek"],["pop"],["empty"]]]', expectedOutput: "[1,1,false]", isHidden: false }
  ],
  "Implement Stack using Queues": [
    { input: '[[["push",1],["push",2],["top"],["pop"],["empty"]]]', expectedOutput: "[2,2,false]", isHidden: false }
  ],
  "Group Anagrams": [
    { input: '[["eat","tea","tan","ate","nat","bat"]]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]', isHidden: false },
    { input: '[[""]]', expectedOutput: '[[""]]', isHidden: false },
    { input: '[["a"]]', expectedOutput: '[["a"]]', isHidden: true }
  ],
  "Find the Difference": [
    { input: '["abcd","abcde"]', expectedOutput: '"e"', isHidden: false },
    { input: '["","y"]', expectedOutput: '"y"', isHidden: false },
    { input: '["a","aa"]', expectedOutput: '"a"', isHidden: true }
  ],
  "First Bad Version": [
    { input: "[5, 4]", expectedOutput: "4", isHidden: false },
    { input: "[1, 1]", expectedOutput: "1", isHidden: false },
    { input: "[10, 7]", expectedOutput: "7", isHidden: true }
  ],
  "Isomorphic Strings": [
    { input: '["egg","add"]', expectedOutput: "true", isHidden: false },
    { input: '["foo","bar"]', expectedOutput: "false", isHidden: false },
    { input: '["paper","title"]', expectedOutput: "true", isHidden: false },
    { input: '["ab","aa"]', expectedOutput: "false", isHidden: true }
  ],
  "Sliding Window Maximum": [
    { input: "[[1,3,-1,-3,5,3,6,7], 3]", expectedOutput: "[3,3,5,5,6,7]", isHidden: false },
    { input: "[[1], 1]", expectedOutput: "[1]", isHidden: false },
    { input: "[[1,3,1,2,0,5], 3]", expectedOutput: "[3,3,2,5]", isHidden: true }
  ],
  "Course Schedule II": [
    { input: "[2, [[1,0]]]", expectedOutput: "[0,1]", isHidden: false },
    { input: "[4, [[1,0],[2,0],[3,1],[3,2]]]", expectedOutput: "[0,2,1,3]", isHidden: false },
    { input: "[1, []]", expectedOutput: "[0]", isHidden: true },
    { input: "[2, [[1,0],[0,1]]]", expectedOutput: "[]", isHidden: true }
  ],
  "Car Fleet": [
    { input: "[12, [10,8,0,5,3], [2,4,1,1,3]]", expectedOutput: "3", isHidden: false },
    { input: "[10, [3], [3]]", expectedOutput: "1", isHidden: false },
    { input: "[100, [0,2,4], [4,2,1]]", expectedOutput: "1", isHidden: true }
  ],
  "Rotate Image": [
    { input: "[[[1,2,3],[4,5,6],[7,8,9]]]", expectedOutput: "[[7,4,1],[8,5,2],[9,6,3]]", isHidden: false },
    { input: "[[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]]", expectedOutput: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]", isHidden: false },
    { input: "[[[1]]]", expectedOutput: "[[1]]", isHidden: true }
  ],
  "First Missing Positive": [
    { input: "[[1,2,0]]", expectedOutput: "3", isHidden: false },
    { input: "[[3,4,-1,1]]", expectedOutput: "2", isHidden: false },
    { input: "[[7,8,9,11,12]]", expectedOutput: "1", isHidden: false },
    { input: "[[1]]", expectedOutput: "2", isHidden: true }
  ],
  "Decode String": [
    { input: '["3[a]2[bc]"]', expectedOutput: '"aaabcbc"', isHidden: false },
    { input: '["3[a2[c]]"]', expectedOutput: '"accaccacc"', isHidden: false },
    { input: '["2[abc]3[cd]ef"]', expectedOutput: '"abcabccdcdcdef"', isHidden: false },
    { input: '["2[a2[b]]"]', expectedOutput: '"abbabb"', isHidden: true }
  ],
  "Find Duplicate Number": [
    { input: "[[1,3,4,2,2]]", expectedOutput: "2", isHidden: false },
    { input: "[[3,1,3,4,2]]", expectedOutput: "3", isHidden: false },
    { input: "[[1,1]]", expectedOutput: "1", isHidden: true },
    { input: "[[1,1,2]]", expectedOutput: "1", isHidden: true }
  ],
  "Longest Palindromic Subsequence": [
    { input: '["bbbab"]', expectedOutput: "4", isHidden: false },
    { input: '["cbbd"]', expectedOutput: "2", isHidden: false },
    { input: '["a"]', expectedOutput: "1", isHidden: true },
    { input: '["agbdba"]', expectedOutput: "5", isHidden: true }
  ],
  "Wildcard Matching": [
    { input: '["aa","a"]', expectedOutput: "false", isHidden: false },
    { input: '["aa","*"]', expectedOutput: "true", isHidden: false },
    { input: '["cb","?a"]', expectedOutput: "false", isHidden: false },
    { input: '["","*"]', expectedOutput: "true", isHidden: true }
  ],
  "Regular Expression Matching": [
    { input: '["aa","a"]', expectedOutput: "false", isHidden: false },
    { input: '["aa","a*"]', expectedOutput: "true", isHidden: false },
    { input: '["ab",".*"]', expectedOutput: "true", isHidden: false },
    { input: '["aab","c*a*b"]', expectedOutput: "true", isHidden: true }
  ],
  "Merge k Sorted Lists": [
    { input: "[[[1,4,5],[1,3,4],[2,6]]]", expectedOutput: "[1,1,2,3,4,4,5,6]", isHidden: false },
    { input: "[[[]]]", expectedOutput: "[]", isHidden: false },
    { input: "[[]]", expectedOutput: "[]", isHidden: true }
  ],
  "Jump Game III": [
    { input: "[[4,2,3,0,3,1,2], 5]", expectedOutput: "true", isHidden: false },
    { input: "[[4,2,3,0,3,1,2], 0]", expectedOutput: "true", isHidden: false },
    { input: "[[3,0,2,1,2], 2]", expectedOutput: "false", isHidden: false },
    { input: "[[0], 0]", expectedOutput: "true", isHidden: true }
  ],
  "Jump Game IV": [
    { input: "[[100,-23,-23,404,100,23,23,23,3,404]]", expectedOutput: "3", isHidden: false },
    { input: "[[7]]", expectedOutput: "0", isHidden: false },
    { input: "[[7,6,9,6,9,6,9,7]]", expectedOutput: "1", isHidden: false },
    { input: "[[1,1,1]]", expectedOutput: "1", isHidden: true }
  ],
  "Minimum Number of Arrows to Burst Balloons": [
    { input: "[[[10,16],[2,8],[1,6],[7,12]]]", expectedOutput: "2", isHidden: false },
    { input: "[[[1,2],[3,4],[5,6],[7,8]]]", expectedOutput: "4", isHidden: false },
    { input: "[[[1,2],[2,3],[3,4],[4,5]]]", expectedOutput: "2", isHidden: false },
    { input: "[[[1,2]]]", expectedOutput: "1", isHidden: true }
  ],
  "Find if Path Exists in Graph": [
    { input: "[3, [[0,1],[1,2],[2,0]], 0, 2]", expectedOutput: "true", isHidden: false },
    { input: "[6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5]", expectedOutput: "false", isHidden: false },
    { input: "[1, [], 0, 0]", expectedOutput: "true", isHidden: true }
  ],
  "Count Good Nodes in Binary Tree": [
    { input: "[[3,1,4,3,null,1,5]]", expectedOutput: "4", isHidden: false },
    { input: "[[3,3,null,4,2]]", expectedOutput: "3", isHidden: false },
    { input: "[[1]]", expectedOutput: "1", isHidden: true }
  ],
  "Next Permutation": [
    { input: "[[1,2,3]]", expectedOutput: "[1,3,2]", isHidden: false },
    { input: "[[3,2,1]]", expectedOutput: "[1,2,3]", isHidden: false },
    { input: "[[1,1,5]]", expectedOutput: "[1,5,1]", isHidden: false },
    { input: "[[1]]", expectedOutput: "[1]", isHidden: true }
  ],
  "Max Area of Island": [
    { input: "[[[0,0,1,0],[0,0,0,0],[0,0,1,0],[0,1,1,0]]]", expectedOutput: "3", isHidden: false },
    { input: "[[[0,0,0,0,0]]]", expectedOutput: "0", isHidden: false },
    { input: "[[[1]]]", expectedOutput: "1", isHidden: true }
  ],
  "Shortest Word Distance": [
    { input: '[["practice","makes","perfect","coding","makes"],"coding","practice"]', expectedOutput: "3", isHidden: false },
    { input: '[["practice","makes","perfect","coding","makes"],"makes","coding"]', expectedOutput: "1", isHidden: false },
    { input: '[["a","b"],"a","b"]', expectedOutput: "1", isHidden: true }
  ],
  "Redundant Connection": [
    { input: "[[[1,2],[1,3],[2,3]]]", expectedOutput: "[2,3]", isHidden: false },
    { input: "[[[1,2],[2,3],[3,4],[1,4],[1,5]]]", expectedOutput: "[1,4]", isHidden: false },
    { input: "[[[1,2],[2,3],[1,3]]]", expectedOutput: "[1,3]", isHidden: true }
  ],
  "Friend Circles": [
    { input: "[[[1,1,0],[1,1,0],[0,0,1]]]", expectedOutput: "2", isHidden: false },
    { input: "[[[1,0,0],[0,1,0],[0,0,1]]]", expectedOutput: "3", isHidden: false },
    { input: "[[[1,1],[1,1]]]", expectedOutput: "1", isHidden: true }
  ],
  "Interval List Intersections": [
    { input: "[[[0,2],[5,10],[13,23],[24,25]],[[1,5],[8,12],[15,24],[25,26]]]", expectedOutput: "[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]", isHidden: false },
    { input: "[[[1,3],[5,9]],[]]", expectedOutput: "[]", isHidden: false },
    { input: "[[],[]]", expectedOutput: "[]", isHidden: true }
  ],
  "Verifying an Alien Dictionary": [
    { input: '[["hello","leetcode"],"hlabcdefgijkmnopqrstuvwxyz"]', expectedOutput: "true", isHidden: false },
    { input: '[["word","world","row"],"worldabcefghijkmnpqstuvxyz"]', expectedOutput: "false", isHidden: false },
    { input: '[["apple","app"],"abcdefghijklmnopqrstuvwxyz"]', expectedOutput: "false", isHidden: false },
    { input: '[["a","b"],"abcdefghijklmnopqrstuvwxyz"]', expectedOutput: "true", isHidden: true }
  ],
  "Move Zeroes": [
    { input: "[[0,1,0,3,12]]", expectedOutput: "[1,3,12,0,0]", isHidden: false },
    { input: "[[0]]", expectedOutput: "[0]", isHidden: false },
    { input: "[[1,0,0,2]]", expectedOutput: "[1,2,0,0]", isHidden: true }
  ],
  "Sum of Left Leaves": [
    { input: "[[3,9,20,null,null,15,7]]", expectedOutput: "24", isHidden: false },
    { input: "[[1]]", expectedOutput: "0", isHidden: false },
    { input: "[[1,2,3,4,5]]", expectedOutput: "4", isHidden: true }
  ]
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    let updated = 0;
    let skipped = 0;

    for (const [title, testCases] of Object.entries(TEST_CASES)) {
      const q = await Question.findOne({ title });
      if (q) {
        q.testCases = testCases;
        await q.save();
        const visible = testCases.filter(t => !t.isHidden).length;
        const hidden = testCases.filter(t => t.isHidden).length;
        console.log(`✅ ${title} -> ${visible} visible + ${hidden} hidden`);
        updated++;
      } else {
        console.log(`❌ Not found: ${title}`);
        skipped++;
      }
    }

    console.log(`\nDone! ${updated} questions updated, ${skipped} not found.`);
  } catch (e) {
    console.error("Error:", e);
  }
  process.exit();
};

run();
