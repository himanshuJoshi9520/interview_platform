import mongoose from "mongoose";
import Question from "./models/question.model.js";
import dotenv from "dotenv";
dotenv.config();

const QUESTIONS = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    company: "google",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

Input

An array of integers nums and an integer target where:

2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.

Output

Return the indices of the two numbers (as an array) such that they add up to target.

Example 1

Input

nums = [2,7,11,15], target = 9

Output

[0,1]

Explanation

Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2

Input

nums = [3,2,4], target = 6

Output

[1,2]

Example 3

Input

nums = [3,3], target = 6

Output

[0,1]

Constraints
2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.`,
    snippets: {
      javascript: "function solve(nums, target) {\n  \n}",
      python: "def solve(nums, target):\n    pass",
      java: "class Solution {\n  public static int[] solve(int[] nums, int target) {\n    return new int[]{};\n  }\n}",
      cpp: "vector<int> solve(vector<int>& nums, int target) {\n  return {};\n}"
    },
    testCases: [
      { input: "[[2,7,11,15], 9]", expectedOutput: "[0,1]", isHidden: false },
      { input: "[[3,2,4], 6]", expectedOutput: "[1,2]", isHidden: false },
      { input: "[[3,3], 6]", expectedOutput: "[0,1]", isHidden: true },
      { input: "[[1,5,3,8,2], 10]", expectedOutput: "[1,3]", isHidden: true }
    ]
  },
  {
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    company: "google",
    description: `You are given a string digits containing digits from 2 to 9 inclusive. Each digit maps to a set of lowercase English letters, just like on a traditional telephone keypad.

Your task is to return all possible letter combinations that the number could represent.

The mapping of digits to letters is as follows:

2 → "abc"
3 → "def"
4 → "ghi"
5 → "jkl"
6 → "mno"
7 → "pqrs"
8 → "tuv"
9 → "wxyz"

If the input string is empty, return an empty list.

Input

A string digits of length n where:

0 <= n <= 4
digits[i] is a digit between 2 and 9

Output

Return a list of all possible letter combinations that the input digit string can represent.

Example 1

Input

digits = "23"

Output

["ad","ae","af","bd","be","bf","cd","ce","cf"]

Example 2

Input

digits = ""

Output

[]

Example 3

Input

digits = "2"

Output

["a","b","c"]

Explanation

For each digit, choose one of its corresponding letters.
Form all possible strings by combining one letter from each digit in order.

Constraints
0 <= digits.length <= 4
digits[i] is in the range ['2', '9']`,
    snippets: {
      javascript: "function solve(digits) {\n  \n}",
      python: "def solve(digits):\n    pass",
      java: "import java.util.*;\n\nclass Solution {\n  public static String[] solve(String digits) {\n    return new String[]{};\n  }\n}",
      cpp: "#include <vector>\n#include <string>\nusing namespace std;\n\nvector<string> solve(string digits) {\n  return {};\n}"
    },
    testCases: [
      { input: '["23"]', expectedOutput: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', isHidden: false },
      { input: '[""]', expectedOutput: '[]', isHidden: false },
      { input: '["2"]', expectedOutput: '["a","b","c"]', isHidden: false },
      { input: '["79"]', expectedOutput: '["pw","px","py","pz","qw","qx","qy","qz","rw","rx","ry","rz","sw","sx","sy","sz"]', isHidden: true },
      { input: '["234"]', expectedOutput: '["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"]', isHidden: true }
    ]
  },
  {
    title: "Trapping Rain Water",
    difficulty: "Hard",
    company: "google",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Input

An integer array height of length n where:

1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5

Output

Return the total amount of water trapped between the bars.

Example 1

Input

height = [0,1,0,2,1,0,1,3,2,1,2,1]

Output

6

Explanation

The above elevation map is represented by the given array. In this case, 6 units of rain water are being trapped.

Example 2

Input

height = [4,2,0,3,2,5]

Output

9

Explanation

For each index i, the water above it is:
  min(max_left, max_right) - height[i]
Sum all the positive values.

Constraints
n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5

Follow-up: Can you solve this in O(n) time and O(1) space?`,
    snippets: {
      javascript: "function solve(height) {\n  \n}",
      python: "def solve(height):\n    pass",
      java: "class Solution {\n  public static int solve(int[] height) {\n    return 0;\n  }\n}",
      cpp: "int solve(vector<int>& height) {\n  return 0;\n}"
    },
    testCases: [
      { input: "[[0,1,0,2,1,0,1,3,2,1,2,1]]", expectedOutput: "6", isHidden: false },
      { input: "[[4,2,0,3,2,5]]", expectedOutput: "9", isHidden: false },
      { input: "[[0,0,0,0]]", expectedOutput: "0", isHidden: true },
      { input: "[[1,2,3,4,5]]", expectedOutput: "0", isHidden: true },
      { input: "[[5,4,3,2,1]]", expectedOutput: "0", isHidden: true },
      { input: "[[4,2,3]]", expectedOutput: "1", isHidden: true }
    ]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    company: "amazon",
    description: `Given a string s, find the length of the longest substring without repeating characters.

Input

A string s where:

0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.

Output

Return the length of the longest substring without repeating characters.

Example 1

Input

s = "abcabcbb"

Output

3

Explanation

The answer is "abc", with length 3.

Example 2

Input

s = "bbbbb"

Output

1

Explanation

The answer is "b", with length 1.

Example 3

Input

s = "pwwkew"

Output

3

Explanation

The answer is "wke", with length 3. Note that "pwke" is a subsequence and not a substring.

Constraints
0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.`,
    snippets: {
      javascript: "function solve(s) {\n  \n}",
      python: "def solve(s):\n    pass",
      java: "class Solution {\n  public static int solve(String s) {\n    return 0;\n  }\n}",
      cpp: "int solve(string s) {\n  return 0;\n}"
    },
    testCases: [
      { input: '["abcabcbb"]', expectedOutput: "3", isHidden: false },
      { input: '["bbbbb"]', expectedOutput: "1", isHidden: false },
      { input: '["pwwkew"]', expectedOutput: "3", isHidden: false },
      { input: '[""]', expectedOutput: "0", isHidden: true },
      { input: '["au"]', expectedOutput: "2", isHidden: true },
      { input: '["dvdf"]', expectedOutput: "3", isHidden: true }
    ]
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    company: "microsoft",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Input

A string s where:

1 <= s.length <= 10^4
s consists of parentheses only '()[]{}'

Output

Return true if the string is valid, false otherwise.

Example 1

Input

s = "()"

Output

true

Example 2

Input

s = "()[]{}"

Output

true

Example 3

Input

s = "(]"

Output

false

Explanation

The bracket '(' is not closed by a matching ')' but by ']', which is invalid.

Constraints
1 <= s.length <= 10^4
s consists of parentheses only '()[]{}'`,
    snippets: {
      javascript: "function solve(s) {\n  \n}",
      python: "def solve(s):\n    pass",
      java: "class Solution {\n  public static boolean solve(String s) {\n    return false;\n  }\n}",
      cpp: "bool solve(string s) {\n  return false;\n}"
    },
    testCases: [
      { input: '["()"]', expectedOutput: "true", isHidden: false },
      { input: '["()[]{}"]', expectedOutput: "true", isHidden: false },
      { input: '["(]"]', expectedOutput: "false", isHidden: false },
      { input: '["([)]"]', expectedOutput: "false", isHidden: true },
      { input: '["{[]}"]', expectedOutput: "true", isHidden: true },
      { input: '[""]', expectedOutput: "true", isHidden: true }
    ]
  },
  {
    title: "Maximum Subarray",
    difficulty: "Medium",
    company: "amazon",
    description: `Given an integer array nums, find the subarray with the largest sum and return its sum.

Input

An integer array nums where:

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4

Output

Return the largest sum of any contiguous subarray.

Example 1

Input

nums = [-2,1,-3,4,-1,2,1,-5,4]

Output

6

Explanation

The subarray [4,-1,2,1] has the largest sum 6.

Example 2

Input

nums = [1]

Output

1

Example 3

Input

nums = [5,4,-1,7,8]

Output

23

Explanation

Use Kadane's Algorithm — iterate through the array maintaining a running sum, resetting when it drops below 0.

Constraints
1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4`,
    snippets: {
      javascript: "function solve(nums) {\n  \n}",
      python: "def solve(nums):\n    pass",
      java: "class Solution {\n  public static int solve(int[] nums) {\n    return 0;\n  }\n}",
      cpp: "int solve(vector<int>& nums) {\n  return 0;\n}"
    },
    testCases: [
      { input: "[[-2,1,-3,4,-1,2,1,-5,4]]", expectedOutput: "6", isHidden: false },
      { input: "[[1]]", expectedOutput: "1", isHidden: false },
      { input: "[[5,4,-1,7,8]]", expectedOutput: "23", isHidden: false },
      { input: "[[-1]]", expectedOutput: "-1", isHidden: true },
      { input: "[[-2,-1]]", expectedOutput: "-1", isHidden: true }
    ]
  },
  {
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    company: "microsoft",
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Note: For this coding challenge, the input is given as two sorted arrays and you should return a sorted merged array.

Input

Two sorted integer arrays list1 and list2 where:

0 <= list1.length, list2.length <= 50
-100 <= list1[i], list2[i] <= 100
Both list1 and list2 are sorted in non-decreasing order.

Output

Return a merged sorted array.

Example 1

Input

list1 = [1,2,4], list2 = [1,3,4]

Output

[1,1,2,3,4,4]

Example 2

Input

list1 = [], list2 = []

Output

[]

Example 3

Input

list1 = [], list2 = [0]

Output

[0]

Constraints
0 <= list1.length, list2.length <= 50
-100 <= list1[i], list2[i] <= 100
Both list1 and list2 are sorted in non-decreasing order.`,
    snippets: {
      javascript: "function solve(list1, list2) {\n  \n}",
      python: "def solve(list1, list2):\n    pass",
      java: "class Solution {\n  public static int[] solve(int[] list1, int[] list2) {\n    return new int[]{};\n  }\n}",
      cpp: "vector<int> solve(vector<int>& list1, vector<int>& list2) {\n  return {};\n}"
    },
    testCases: [
      { input: "[[1,2,4],[1,3,4]]", expectedOutput: "[1,1,2,3,4,4]", isHidden: false },
      { input: "[[],[]]", expectedOutput: "[]", isHidden: false },
      { input: "[[],[0]]", expectedOutput: "[0]", isHidden: false },
      { input: "[[1,3,5],[2,4,6]]", expectedOutput: "[1,2,3,4,5,6]", isHidden: true },
      { input: "[[0],[0]]", expectedOutput: "[0,0]", isHidden: true }
    ]
  },
  {
    title: "Climbing Stairs",
    difficulty: "Easy",
    company: "meta",
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Input

An integer n where:

1 <= n <= 45

Output

Return the number of distinct ways to climb to the top.

Example 1

Input

n = 2

Output

2

Explanation

There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Example 2

Input

n = 3

Output

3

Explanation

There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

Explanation

This is a Fibonacci-like problem. The number of ways to reach step n is equal to the number of ways to reach step n-1 plus step n-2.

Constraints
1 <= n <= 45`,
    snippets: {
      javascript: "function solve(n) {\n  \n}",
      python: "def solve(n):\n    pass",
      java: "class Solution {\n  public static int solve(int n) {\n    return 0;\n  }\n}",
      cpp: "int solve(int n) {\n  return 0;\n}"
    },
    testCases: [
      { input: "[2]", expectedOutput: "2", isHidden: false },
      { input: "[3]", expectedOutput: "3", isHidden: false },
      { input: "[1]", expectedOutput: "1", isHidden: true },
      { input: "[10]", expectedOutput: "89", isHidden: true },
      { input: "[45]", expectedOutput: "1836311903", isHidden: true }
    ]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    company: "meta",
    description: `You are given an array prices where prices[i] is the price of a given stock on the i-th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Input

An integer array prices where:

1 <= prices.length <= 10^5
0 <= prices[i] <= 10^4

Output

Return the maximum profit. If no profit is possible, return 0.

Example 1

Input

prices = [7,1,5,3,6,4]

Output

5

Explanation

Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.

Example 2

Input

prices = [7,6,4,3,1]

Output

0

Explanation

In this case, no transactions are done and the max profit = 0.

Constraints
1 <= prices.length <= 10^5
0 <= prices[i] <= 10^4`,
    snippets: {
      javascript: "function solve(prices) {\n  \n}",
      python: "def solve(prices):\n    pass",
      java: "class Solution {\n  public static int solve(int[] prices) {\n    return 0;\n  }\n}",
      cpp: "int solve(vector<int>& prices) {\n  return 0;\n}"
    },
    testCases: [
      { input: "[[7,1,5,3,6,4]]", expectedOutput: "5", isHidden: false },
      { input: "[[7,6,4,3,1]]", expectedOutput: "0", isHidden: false },
      { input: "[[1,2]]", expectedOutput: "1", isHidden: true },
      { input: "[[2,4,1]]", expectedOutput: "2", isHidden: true },
      { input: "[[3,3,3,3]]", expectedOutput: "0", isHidden: true }
    ]
  },
  {
    title: "Binary Search",
    difficulty: "Easy",
    company: "microsoft",
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

Input

A sorted integer array nums and an integer target where:

1 <= nums.length <= 10^4
-10^4 <= nums[i], target <= 10^4
All integers in nums are unique.
nums is sorted in ascending order.

Output

Return the index of target if found, otherwise return -1.

Example 1

Input

nums = [-1,0,3,5,9,12], target = 9

Output

4

Explanation

9 exists in nums and its index is 4.

Example 2

Input

nums = [-1,0,3,5,9,12], target = 2

Output

-1

Explanation

2 does not exist in nums so return -1.

Constraints
1 <= nums.length <= 10^4
-10^4 < nums[i], target < 10^4
All the integers in nums are unique.
nums is sorted in ascending order.`,
    snippets: {
      javascript: "function solve(nums, target) {\n  \n}",
      python: "def solve(nums, target):\n    pass",
      java: "class Solution {\n  public static int solve(int[] nums, int target) {\n    return -1;\n  }\n}",
      cpp: "int solve(vector<int>& nums, int target) {\n  return -1;\n}"
    },
    testCases: [
      { input: "[[-1,0,3,5,9,12], 9]", expectedOutput: "4", isHidden: false },
      { input: "[[-1,0,3,5,9,12], 2]", expectedOutput: "-1", isHidden: false },
      { input: "[[5], 5]", expectedOutput: "0", isHidden: true },
      { input: "[[1,2,3,4,5], 3]", expectedOutput: "2", isHidden: true },
      { input: "[[1,2,3,4,5], 6]", expectedOutput: "-1", isHidden: true }
    ]
  },
  {
    title: "Jump Game",
    difficulty: "Medium",
    company: "amazon",
    description: `You are given an array of non-negative integers nums, where each element represents your maximum jump length at that position.

You start at the first index. Your goal is to determine if you can reach the last index.

Input

An integer array nums where:

1 <= nums.length <= 10^4
0 <= nums[i] <= 10^5

Output

Return true if you can reach the last index, or false otherwise.

Example 1

Input

nums = [2,3,1,1,4]

Output

true

Explanation

Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2

Input

nums = [3,2,1,0,4]

Output

false

Explanation

You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

Example 3

Input

nums = [1]

Output

true

Explanation

You are already at the last index.

Constraints
1 <= nums.length <= 10^4
0 <= nums[i] <= 10^5`,
    snippets: {
      javascript: "function solve(nums) {\n  \n}",
      python: "def solve(nums):\n    pass",
      java: "class Solution {\n  public static boolean solve(int[] nums) {\n    return false;\n  }\n}",
      cpp: "bool solve(vector<int>& nums) {\n  return false;\n}"
    },
    testCases: [
      { input: "[[2,3,1,1,4]]", expectedOutput: "true", isHidden: false },
      { input: "[[3,2,1,0,4]]", expectedOutput: "false", isHidden: false },
      { input: "[[1]]", expectedOutput: "true", isHidden: false },
      { input: "[[0]]", expectedOutput: "true", isHidden: true },
      { input: "[[2,0,0]]", expectedOutput: "true", isHidden: true },
      { input: "[[1,0,1,0]]", expectedOutput: "false", isHidden: true },
      { input: "[[5,0,0,0,0,0]]", expectedOutput: "true", isHidden: true }
    ]
  }
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    for (const q of QUESTIONS) {
      const existing = await Question.findOne({ title: q.title });
      if (existing) {
        existing.description = q.description;
        existing.snippets = q.snippets;
        existing.testCases = q.testCases;
        await existing.save();
        console.log(`✅ Updated: ${q.title}`);
      } else {
        await Question.create(q);
        console.log(`🆕 Created: ${q.title}`);
      }
    }

  } catch (e) {
    console.error("Seed error:", e);
  }
  process.exit();
};
run();
