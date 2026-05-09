import mongoose from "mongoose";
import Question from "../models/question.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// All question descriptions in the proper long format
const DESCRIPTIONS = {

  // =================== GOOGLE ===================

  "Subsets": `Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Input

An integer array nums where:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.

Output

Return a list of all possible subsets including the empty subset.

Example 1

Input

nums = [1,2,3]

Output

[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Example 2

Input

nums = [0]

Output

[[],[0]]

Explanation

For each element, you either include it or exclude it. This gives 2^n subsets total.

Constraints
1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.`,

  "Combination Sum": `Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.

You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times.

Input

An integer array candidates and an integer target where:

1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40

Output

Return all unique combinations of candidates that sum to target.

Example 1

Input

candidates = [2,3,6,7], target = 7

Output

[[2,2,3],[7]]

Explanation

2 and 3 are candidates, and 2+2+3=7. Note that 2 can be used multiple times.
7 is a candidate, and 7=7.

Example 2

Input

candidates = [2,3,5], target = 8

Output

[[2,2,2,2],[2,3,3],[3,5]]

Constraints
1 <= candidates.length <= 30
2 <= candidates[i] <= 40
1 <= target <= 40`,

  "Median of Two Sorted Arrays": `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log(m+n)).

Input

Two sorted integer arrays nums1 and nums2 where:

0 <= m, n <= 1000
1 <= m + n <= 2000
-10^6 <= nums1[i], nums2[i] <= 10^6

Output

Return the median of the two sorted arrays as a floating point number.

Example 1

Input

nums1 = [1,3], nums2 = [2]

Output

2.00000

Explanation

The merged array is [1,2,3] and the median is 2.

Example 2

Input

nums1 = [1,2], nums2 = [3,4]

Output

2.50000

Explanation

The merged array is [1,2,3,4] and the median is (2+3)/2 = 2.5.

Constraints
0 <= nums1.length, nums2.length <= 1000
1 <= nums1.length + nums2.length <= 2000
-10^6 <= nums1[i], nums2[i] <= 10^6`,

  "Container With Most Water": `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Input

An integer array height where:

2 <= n <= 10^5
0 <= height[i] <= 10^4

Output

Return the maximum amount of water the container can store.

Example 1

Input

height = [1,8,6,2,5,4,8,3,7]

Output

49

Explanation

The two lines at indices 1 and 8 (heights 8 and 7) form the best container with water = min(8,7) * (8-1) = 49.

Example 2

Input

height = [1,1]

Output

1

Constraints
2 <= n <= 10^5
0 <= height[i] <= 10^4`,

  "Jump Game II": `You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. Return the minimum number of jumps to reach nums[n - 1].

You can assume that you can always reach nums[n - 1].

Input

An integer array nums where:

1 <= nums.length <= 10^4
0 <= nums[i] <= 1000
It is guaranteed you can reach nums[n-1].

Output

Return the minimum number of jumps to reach the last index.

Example 1

Input

nums = [2,3,1,1,4]

Output

2

Explanation

The minimum number of jumps is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2

Input

nums = [2,3,0,1,4]

Output

2

Constraints
1 <= nums.length <= 10^4
0 <= nums[i] <= 1000`,

  "Search in Rotated Sorted Array": `There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k.

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Input

An integer array nums (possibly rotated) and integer target where:

1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
All values in nums are unique.
-10^4 <= target <= 10^4

Output

Return the index of target if found, otherwise return -1.

Example 1

Input

nums = [4,5,6,7,0,1,2], target = 0

Output

4

Example 2

Input

nums = [4,5,6,7,0,1,2], target = 3

Output

-1

Example 3

Input

nums = [1], target = 0

Output

-1

Constraints
1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
All values are unique.`,

  "Rotate Array": `Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

Input

An integer array nums and an integer k where:

1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1
0 <= k <= 10^5

Output

Return the rotated array (rotate in-place and return nums).

Example 1

Input

nums = [1,2,3,4,5,6,7], k = 3

Output

[5,6,7,1,2,3,4]

Explanation

rotate 1 step to right: [7,1,2,3,4,5,6]
rotate 2 steps to right: [6,7,1,2,3,4,5]
rotate 3 steps to right: [5,6,7,1,2,3,4]

Example 2

Input

nums = [-1,-100,3,99], k = 2

Output

[3,99,-1,-100]

Constraints
1 <= nums.length <= 10^5
0 <= k <= 10^5`,

  "Merge Intervals": `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals and return an array of the non-overlapping intervals.

Input

An array intervals where:

1 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^4

Output

Return an array of the merged non-overlapping intervals.

Example 1

Input

intervals = [[1,3],[2,6],[8,10],[15,18]]

Output

[[1,6],[8,10],[15,18]]

Explanation

[1,3] and [2,6] overlap, so they merge into [1,6].

Example 2

Input

intervals = [[1,4],[4,5]]

Output

[[1,5]]

Explanation

[1,4] and [4,5] are considered overlapping.

Constraints
1 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^4`,

  "Permutations": `Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

Input

An integer array nums where:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.

Output

Return all possible permutations of the array.

Example 1

Input

nums = [1,2,3]

Output

[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Example 2

Input

nums = [0,1]

Output

[[0,1],[1,0]]

Example 3

Input

nums = [1]

Output

[[1]]

Constraints
1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.`,

  "3Sum": `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.

The solution set must not contain duplicate triplets.

Input

An integer array nums where:

3 <= nums.length <= 3000
-10^5 <= nums[i] <= 10^5

Output

Return all unique triplets that sum to zero.

Example 1

Input

nums = [-1,0,1,2,-1,-4]

Output

[[-1,-1,2],[-1,0,1]]

Explanation

nums[0] + nums[1] + nums[2] = -1 + 0 + 1 = 0
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0
The distinct triplets are [-1,-1,2] and [-1,0,1].

Example 2

Input

nums = [0,1,1]

Output

[]

Example 3

Input

nums = [0,0,0]

Output

[[0,0,0]]

Constraints
3 <= nums.length <= 3000
-10^5 <= nums[i] <= 10^5`,

  "4Sum": `Given an array nums of n integers and an integer target, return an array of all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that their sum equals target.

Input

An integer array nums and an integer target where:

1 <= nums.length <= 200
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9

Output

Return all unique quadruplets that sum to target.

Example 1

Input

nums = [1,0,-1,0,-2,2], target = 0

Output

[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

Example 2

Input

nums = [2,2,2,2,2], target = 8

Output

[[2,2,2,2]]

Constraints
1 <= nums.length <= 200
-10^9 <= nums[i] <= 10^9`,

  "Spiral Matrix": `Given an m x n matrix, return all elements of the matrix in spiral order.

Input

An m x n integer matrix where:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100

Output

Return all elements of the matrix in spiral order.

Example 1

Input

matrix = [[1,2,3],[4,5,6],[7,8,9]]

Output

[1,2,3,6,9,8,7,4,5]

Example 2

Input

matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]

Output

[1,2,3,4,8,12,11,10,9,5,6,7]

Constraints
m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100`,

  "Longest Increasing Subsequence": `Given an integer array nums, return the length of the longest strictly increasing subsequence.

Input

An integer array nums where:

1 <= nums.length <= 2500
-10^4 <= nums[i] <= 10^4

Output

Return the length of the longest strictly increasing subsequence.

Example 1

Input

nums = [10,9,2,5,3,7,101,18]

Output

4

Explanation

The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Example 2

Input

nums = [0,1,0,3,2,3]

Output

4

Example 3

Input

nums = [7,7,7,7,7,7,7]

Output

1

Constraints
1 <= nums.length <= 2500
-10^4 <= nums[i] <= 10^4`,

  "Word Break": `Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Input

A string s and a list of strings wordDict where:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.

Output

Return true if s can be segmented into dictionary words, false otherwise.

Example 1

Input

s = "leetcode", wordDict = ["leet","code"]

Output

true

Explanation

Return true because "leetcode" can be segmented as "leet code".

Example 2

Input

s = "applepenapple", wordDict = ["apple","pen"]

Output

true

Explanation

Return true because "applepenapple" can be segmented as "apple pen apple".

Example 3

Input

s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]

Output

false

Constraints
1 <= s.length <= 300
1 <= wordDict.length <= 1000`,

  "House Robber": `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Input

An integer array nums where:

1 <= nums.length <= 100
0 <= nums[i] <= 400

Output

Return the maximum amount you can rob.

Example 1

Input

nums = [1,2,3,1]

Output

4

Explanation

Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 1 + 3 = 4.

Example 2

Input

nums = [2,7,9,3,1]

Output

12

Explanation

Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total = 2 + 9 + 1 = 12.

Constraints
1 <= nums.length <= 100
0 <= nums[i] <= 400`,

  "Best Time to Buy and Sell Stock II": `You are given an integer array prices where prices[i] is the price of a given stock on the i-th day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.

Input

An integer array prices where:

1 <= prices.length <= 3 * 10^4
0 <= prices[i] <= 10^4

Output

Return the maximum profit you can achieve with unlimited transactions.

Example 1

Input

prices = [7,1,5,3,6,4]

Output

7

Explanation

Buy on day 2 (price=1) and sell on day 3 (price=5), profit=4. Then buy on day 4 (price=3) and sell on day 5 (price=6), profit=3. Total profit=7.

Example 2

Input

prices = [1,2,3,4,5]

Output

4

Explanation

Buy on day 1 and sell on day 5. Total profit = 4.

Example 3

Input

prices = [7,6,4,3,1]

Output

0

Explanation

No transactions are done, max profit = 0.

Constraints
1 <= prices.length <= 3 * 10^4
0 <= prices[i] <= 10^4`,

  "Generate Parentheses": `Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Input

An integer n where:

1 <= n <= 8

Output

Return all combinations of well-formed parentheses for n pairs.

Example 1

Input

n = 3

Output

["((()))","(()())","(())()","()(())","()()()"]

Example 2

Input

n = 1

Output

["()"]

Explanation

Use backtracking — at each step add '(' if open count < n, and add ')' if close count < open count.

Constraints
1 <= n <= 8`,

  "Coin Change": `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Input

An integer array coins and an integer amount where:

1 <= coins.length <= 12
1 <= coins[i] <= 2^31 - 1
0 <= amount <= 10^4

Output

Return the fewest number of coins to make up amount, or -1 if impossible.

Example 1

Input

coins = [1,5,11], amount = 11

Output

1

Explanation

11 = 11 (1 coin)

Example 2

Input

coins = [1,5,6,9], amount = 11

Output

2

Explanation

11 = 5 + 6 (2 coins)

Example 3

Input

coins = [1,2,5], amount = 11

Output

3

Explanation

11 = 5 + 5 + 1 (3 coins)

Constraints
1 <= coins.length <= 12
1 <= coins[i] <= 2^31 - 1
0 <= amount <= 10^4`,

  "Decode Ways": `A message containing letters from A-Z can be encoded into numbers using the mapping: 'A' -> "1", 'B' -> "2", ..., 'Z' -> "26".

Given a string s containing only digits, return the number of ways to decode it.

Input

A string s containing only digits where:

1 <= s.length <= 100
s contains only digits and may contain leading zero(s).

Output

Return the total number of ways to decode the string.

Example 1

Input

s = "12"

Output

2

Explanation

"12" could be decoded as "AB" (1 2) or "L" (12).

Example 2

Input

s = "226"

Output

3

Explanation

"226" can be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

Example 3

Input

s = "06"

Output

0

Explanation

"06" cannot be mapped to "F" because of the leading zero.

Constraints
1 <= s.length <= 100
s contains only digits.`,

  "Longest Common Prefix": `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Input

An array of strings strs where:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of lowercase English letters only.

Output

Return the longest common prefix string, or "" if none exists.

Example 1

Input

strs = ["flower","flow","flight"]

Output

"fl"

Example 2

Input

strs = ["dog","racecar","car"]

Output

""

Explanation

There is no common prefix among the input strings.

Constraints
1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.`,

  "Set Matrix Zeroes": `Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.

You must do it in place.

Input

An m x n integer matrix where:

m == matrix.length
n == matrix[0].length
1 <= m, n <= 200
-2^31 <= matrix[i][j] <= 2^31 - 1

Output

Modify the matrix in place so that if matrix[i][j] == 0, all elements in row i and column j are set to 0. Return the modified matrix.

Example 1

Input

matrix = [[1,1,1],[1,0,1],[1,1,1]]

Output

[[1,0,1],[0,0,0],[1,0,1]]

Example 2

Input

matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]

Output

[[0,0,0,0],[0,4,5,0],[0,3,1,0]]

Constraints
m == matrix.length
n == matrix[0].length
1 <= m, n <= 200`,

  // =================== AMAZON ===================

  "Top K Frequent Elements": `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Input

An integer array nums and integer k where:

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
k is in the range [1, the number of unique elements in the array].

Output

Return the k most frequent elements in any order.

Example 1

Input

nums = [1,1,1,2,2,3], k = 2

Output

[1,2]

Example 2

Input

nums = [1], k = 1

Output

[1]

Explanation

Use a hash map to count frequencies, then find the top k elements using a heap or bucket sort.

Constraints
1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4`,

  "Pacific Atlantic Water Flow": `There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

Water can only flow in four directions: up, down, left, right, and only from a cell to another one with a height smaller or equal to the current cell's height.

Given an m x n integer matrix heights, return a list of grid coordinates where rain water can flow to both the Pacific and Atlantic oceans.

Input

An m x n integer matrix heights where:

m == heights.length
n == heights[i].length
1 <= m, n <= 200
0 <= heights[i][j] <= 10^5

Output

Return a list of [row, col] coordinates where water can flow to both oceans.

Example 1

Input

heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]

Output

[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

Example 2

Input

heights = [[2,1],[1,2]]

Output

[[0,0],[0,1],[1,0],[1,1]]

Constraints
m == heights.length
n == heights[i].length
1 <= m, n <= 200
0 <= heights[i][j] <= 10^5`,

  "Course Schedule": `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first to take course ai.

Return true if you can finish all courses, otherwise return false.

Input

An integer numCourses and a list of prerequisite pairs where:

1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All prerequisite pairs are unique.

Output

Return true if you can finish all courses, false otherwise.

Example 1

Input

numCourses = 2, prerequisites = [[1,0]]

Output

true

Explanation

There are 2 courses. To take course 1, you must first take course 0. So it is possible.

Example 2

Input

numCourses = 2, prerequisites = [[1,0],[0,1]]

Output

false

Explanation

There are 2 courses. To take course 1 you must take course 0, and to take course 0 you must take course 1. This is impossible.

Constraints
1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000`,

  "Subtree of Another Tree": `Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot, and false otherwise.

A subtree of a binary tree is a tree that consists of a node in the tree and all of this node's descendants.

Note: For this problem, represent the tree as an array in level-order traversal (BFS) where null values are represented as null.

Input

Two binary trees root and subRoot given as arrays (level-order).

Output

Return true if subRoot is a subtree of root, false otherwise.

Example 1

Input

root = [3,4,5,1,2], subRoot = [4,1,2]

Output

true

Example 2

Input

root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]

Output

false

Constraints
The number of nodes in root tree is in the range [1, 2000].
The number of nodes in subRoot tree is in the range [1, 1000].
-10^4 <= Node.val <= 10^4`,

  "Word Ladder": `A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence where every adjacent pair of words differs by a single letter and every word in the sequence is in wordList.

Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

Input

A string beginWord, string endWord, and list wordList where:

1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000

Output

Return the number of words in the shortest transformation sequence, or 0 if impossible.

Example 1

Input

beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]

Output

5

Explanation

hit -> hot -> dot -> dog -> cog (5 words)

Example 2

Input

beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]

Output

0

Explanation

The endWord "cog" is not in wordList, so no transformation possible.

Constraints
1 <= beginWord.length <= 10
1 <= wordList.length <= 5000`,

  "Reverse Linked List": `Given the head of a singly linked list, reverse the list, and return the reversed list.

Note: For this problem, the linked list is given as an array, and you should return the reversed array.

Input

An integer array representing a linked list where:

0 <= nodes <= 5000
-5000 <= Node.val <= 5000

Output

Return the reversed array.

Example 1

Input

head = [1,2,3,4,5]

Output

[5,4,3,2,1]

Example 2

Input

head = [1,2]

Output

[2,1]

Example 3

Input

head = []

Output

[]

Constraints
0 <= number of nodes <= 5000
-5000 <= Node.val <= 5000`,

  "Course Schedule II": `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Given a list of prerequisites, return the ordering of courses to finish all courses. If impossible, return an empty array.

Input

An integer numCourses and a list of prerequisite pairs where:

1 <= numCourses <= 2000
0 <= prerequisites.length <= numCourses * (numCourses - 1)

Output

Return a valid ordering of courses to take, or [] if impossible.

Example 1

Input

numCourses = 2, prerequisites = [[1,0]]

Output

[0,1]

Example 2

Input

numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Output

[0,2,1,3]

Example 3

Input

numCourses = 1, prerequisites = []

Output

[0]

Constraints
1 <= numCourses <= 2000
0 <= prerequisites.length <= numCourses * (numCourses - 1)`,

  "Kth Largest Element in an Array": `Given an integer array nums and an integer k, return the k-th largest element in the array.

Note that it is the k-th largest element in sorted order, not the k-th distinct element.

Input

An integer array nums and integer k where:

1 <= k <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4

Output

Return the k-th largest element.

Example 1

Input

nums = [3,2,1,5,6,4], k = 2

Output

5

Example 2

Input

nums = [3,2,3,1,2,4,5,5,6], k = 4

Output

4

Explanation

Use a min-heap of size k or QuickSelect algorithm for optimal performance.

Constraints
1 <= k <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4`,

  "Number of Islands": `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Input

A 2D grid of '1's and '0's where:

1 <= m, n <= 300
grid[i][j] is '0' or '1'

Output

Return the number of islands.

Example 1

Input

grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]

Output

1

Example 2

Input

grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]

Output

3

Constraints
1 <= m, n <= 300
grid[i][j] is '0' or '1'`,

  "Palindrome Linked List": `Given the head of a singly linked list, return true if it is a palindrome, false otherwise.

Note: For this problem, the linked list is given as an array.

Input

An integer array representing a linked list where:

0 <= nodes <= 10^5
0 <= Node.val <= 9

Output

Return true if the linked list is a palindrome, false otherwise.

Example 1

Input

head = [1,2,2,1]

Output

true

Example 2

Input

head = [1,2]

Output

false

Constraints
0 <= number of nodes <= 10^5
0 <= Node.val <= 9`,

  "Longest Palindromic Substring": `Given a string s, return the longest palindromic substring in s.

Input

A string s where:

1 <= s.length <= 1000
s consists of only digits and English letters.

Output

Return the longest palindromic substring.

Example 1

Input

s = "babad"

Output

"bab"

Explanation

"aba" is also a valid answer.

Example 2

Input

s = "cbbd"

Output

"bb"

Constraints
1 <= s.length <= 1000
s consists of only digits and English letters.`,

  "Design Tic-Tac-Toe": `Design a Tic-Tac-Toe game that is played between two players on a n x n grid. A player can place their mark if the spot is empty. The first player to fill an entire row, column, diagonal, or anti-diagonal wins.

Note: For this problem, simulate a sequence of moves and return the winner after each move (0 if no winner yet).

Input

An integer n (board size) and a list of moves [[row, col, player], ...] where:

2 <= n <= 100
player is 1 or 2
0 <= row, col < n

Output

Return the player number (1 or 2) who wins, or 0 if no winner yet after all moves.

Example 1

Input

n = 3, moves = [[0,0,1],[0,2,2],[1,1,1],[2,0,2],[2,2,1]]

Output

1

Explanation

Player 1 wins by filling the main diagonal.

Example 2

Input

n = 3, moves = [[0,0,1],[1,1,2],[0,1,1],[0,2,2],[1,0,1],[2,0,2]]

Output

2

Constraints
2 <= n <= 100
player is 1 or 2`,

  "Design Hit Counter": `Design a hit counter which counts the number of hits received in the past 5 minutes (300 seconds).

Your system should accept a timestamp (in seconds) and return the number of hits in the past 300 seconds.

Note: For this problem, simulate a list of [timestamp, operation] where operation is "hit" or "getHits", and return results of getHits operations.

Input

A list of operations [[timestamp, "hit"|"getHits"], ...] where:

1 <= timestamp <= 2 * 10^9
Timestamps for hits are non-decreasing.

Output

Return a list of results for each "getHits" operation.

Example 1

Input

ops = [[1,"hit"],[2,"hit"],[3,"hit"],[300,"hit"],[301,"getHits"]]

Output

[4]

Explanation

At second 301, hits at seconds 1, 2, 3, 300 are all within 300 seconds, so result is 4.

Example 2

Input

ops = [[1,"hit"],[2,"hit"],[300,"hit"],[301,"hit"],[302,"getHits"]]

Output

[3]

Constraints
1 <= timestamp <= 2 * 10^9
Timestamps for hits are non-decreasing.`,

  "Sliding Window Maximum": `You are given an array of integers nums, and there is a sliding window of size k which is moving from the very left of the array to the very right. For each position of the window, find the maximum value.

Input

An integer array nums and integer k where:

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
1 <= k <= nums.length

Output

Return an array of the maximum of each sliding window.

Example 1

Input

nums = [1,3,-1,-3,5,3,6,7], k = 3

Output

[3,3,5,5,6,7]

Explanation

Window: [1,3,-1]->3, [3,-1,-3]->3, [-1,-3,5]->5, [-3,5,3]->5, [5,3,6]->6, [3,6,7]->7

Example 2

Input

nums = [1], k = 1

Output

[1]

Constraints
1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
1 <= k <= nums.length`,

  "LRU Cache": `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class with get and put operations. Both should run in O(1) time.

Note: For this problem, simulate a list of [operation, args] and return results of get operations.

Input

An integer capacity and a list of operations [[op, args...], ...] where:

1 <= capacity <= 3000
0 <= key <= 10^4
0 <= value <= 10^5

Output

Return a list of results for each "get" operation (-1 if not found).

Example 1

Input

capacity = 2, ops = [["put",1,1],["put",2,2],["get",1],["put",3,3],["get",2],["put",4,4],["get",1],["get",3],["get",4]]

Output

[1,-1,-1,3,4]

Explanation

get(1)=1, get(2)=-1 (evicted), get(1)=-1 (evicted), get(3)=3, get(4)=4

Constraints
1 <= capacity <= 3000
0 <= key <= 10^4
0 <= value <= 10^5`,

  "Network Delay Time": `You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), representing a directed edge from node ui to vi with a travel time of wi.

We will send a signal from a given node k. Return the minimum time it takes for all n nodes to receive the signal. If it is impossible, return -1.

Input

A list of directed edges times[i] = [u, v, w], integers n and k where:

1 <= k <= n <= 100
1 <= times.length <= 6000
1 <= ui, vi <= n
0 <= wi <= 100

Output

Return the minimum time for all nodes to receive the signal, or -1 if impossible.

Example 1

Input

times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2

Output

2

Example 2

Input

times = [[1,2,1]], n = 2, k = 1

Output

1

Example 3

Input

times = [[1,2,1]], n = 2, k = 2

Output

-1

Constraints
1 <= k <= n <= 100
1 <= times.length <= 6000`,

  "Group Anagrams": `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.

Input

An array of strings strs where:

1 <= strs.length <= 10^4
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.

Output

Return a list of groups of anagrams.

Example 1

Input

strs = ["eat","tea","tan","ate","nat","bat"]

Output

[["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2

Input

strs = [""]

Output

[[""]]

Example 3

Input

strs = ["a"]

Output

[["a"]]

Constraints
1 <= strs.length <= 10^4
0 <= strs[i].length <= 100`,

  "Reorder Log Files": `You are given an array of logs. Each log is a space-delimited string of words, where the first word is the identifier.

There are two types of logs:
- Letter-logs: all words (except the identifier) consist of lowercase letters.
- Digit-logs: all words (except the identifier) consist of digits.

Reorder these logs so that all letter-logs come before digit-logs. Letter-logs are sorted lexicographically by content, then by identifier. Digit-logs maintain their relative order.

Input

An array of log strings where:

1 <= logs.length <= 100
3 <= logs[i].length <= 100

Output

Return the reordered logs.

Example 1

Input

logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]

Output

["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]

Constraints
1 <= logs.length <= 100
3 <= logs[i].length <= 100`,

  "K Closest Points to Origin": `Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points is the Euclidean distance.

Input

An array of points and integer k where:

1 <= k <= points.length <= 10^4
-10^4 <= xi, yi <= 10^4

Output

Return the k closest points to the origin in any order.

Example 1

Input

points = [[1,3],[-2,2]], k = 1

Output

[[-2,2]]

Explanation

Distance from (1,3) = sqrt(10), from (-2,2) = sqrt(8). So (-2,2) is closer.

Example 2

Input

points = [[3,3],[5,-1],[-2,4]], k = 2

Output

[[3,3],[-2,4]]

Constraints
1 <= k <= points.length <= 10^4
-10^4 <= xi, yi <= 10^4`,

  "Minimum Cost to Connect Sticks": `You have some number of sticks with positive integer lengths. These lengths are given as an array sticks, where sticks[i] is the length of the i-th stick.

You can connect any two sticks of lengths x and y into one stick by paying a cost of x + y. Return the minimum cost of connecting all the sticks into one stick.

Input

An integer array sticks where:

1 <= sticks.length <= 10^4
1 <= sticks[i] <= 10^4

Output

Return the minimum cost to connect all sticks into one.

Example 1

Input

sticks = [2,4,3]

Output

14

Explanation

Connect sticks 2+3=5 (cost 5), then 5+4=9 (cost 9). Total=14.

Example 2

Input

sticks = [1,8,3,5]

Output

30

Explanation

Connect 1+3=4 (cost 4), 4+5=9 (cost 9), 9+8=17 (cost 17). Total=30.

Constraints
1 <= sticks.length <= 10^4
1 <= sticks[i] <= 10^4`,

  "Detect Cycle in Linked List": `Given head, the head of a linked list, determine if the linked list has a cycle in it.

Note: For this problem, the linked list is given as an array, and cycle info is given separately.

Input

An integer array representing a linked list and an integer pos where:

pos = -1 means no cycle
pos >= 0 means the tail connects to node at index pos

Output

Return true if cycle exists, false otherwise.

Example 1

Input

head = [3,2,0,-4], pos = 1

Output

true

Explanation

The tail connects to node at index 1, forming a cycle.

Example 2

Input

head = [1,2], pos = 0

Output

true

Example 3

Input

head = [1], pos = -1

Output

false

Constraints
0 <= number of nodes <= 10^4
-10^5 <= Node.val <= 10^5`,

  "Minimum Window Substring": `Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

Input

Two strings s and t where:

1 <= m, n <= 10^5
s and t consist of uppercase and lowercase English letters.

Output

Return the minimum window substring, or "" if not possible.

Example 1

Input

s = "ADOBECODEBANC", t = "ABC"

Output

"BANC"

Explanation

The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2

Input

s = "a", t = "a"

Output

"a"

Example 3

Input

s = "a", t = "aa"

Output

""

Constraints
1 <= s.length, t.length <= 10^5
s and t consist of uppercase and lowercase English letters.`,

  "Serialize and Deserialize Binary Tree": `Design an algorithm to serialize and deserialize a binary tree. Serialization is the string representation of the tree, deserialization reconstructs the tree from the string.

Note: For this problem, the tree is given as an array in level-order traversal, and you should return the same level-order array after serialize + deserialize.

Input

A binary tree given as a level-order array where null represents missing nodes.

Output

Return the level-order array representation after serialize and deserialize operations.

Example 1

Input

root = [1,2,3,null,null,4,5]

Output

[1,2,3,null,null,4,5]

Example 2

Input

root = []

Output

[]

Constraints
0 <= number of nodes <= 10^4
-1000 <= Node.val <= 1000`,

  "Binary Tree Level Order Traversal": `Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

Input

A binary tree given as a level-order array where null means missing node.

Output

Return a 2D array where each inner array contains the values at that level.

Example 1

Input

root = [3,9,20,null,null,15,7]

Output

[[3],[9,20],[15,7]]

Example 2

Input

root = [1]

Output

[[1]]

Example 3

Input

root = []

Output

[]

Constraints
0 <= number of nodes <= 2000
-1000 <= Node.val <= 1000`,

  "Two Sum II - Input Array Is Sorted": `Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target.

Return the indices of the two numbers, index1 and index2, with 1 <= index1 < index2.

Input

A sorted integer array numbers and integer target where:

2 <= numbers.length <= 3 * 10^4
-1000 <= numbers[i] <= 1000
-1000 <= target <= 1000

Output

Return [index1, index2] (1-indexed).

Example 1

Input

numbers = [2,7,11,15], target = 9

Output

[1,2]

Explanation

numbers[1] + numbers[2] = 2 + 7 = 9. So index1 = 1, index2 = 2.

Example 2

Input

numbers = [2,3,4], target = 6

Output

[1,3]

Example 3

Input

numbers = [-1,0], target = -1

Output

[1,2]

Constraints
2 <= numbers.length <= 3 * 10^4
-1000 <= numbers[i] <= 1000`,

  "Find the Celebrity": `Suppose you are at a party with n people labeled from 0 to n - 1 and among them, there may exist one celebrity. A celebrity is someone who is known by everyone else but does not know any of them.

Given a square matrix knows[i][j] = 1 if person i knows person j, find the celebrity or return -1 if none exists.

Input

An n x n integer matrix knows where:

2 <= n <= 100
knows[i][j] is 0 or 1

Output

Return the celebrity's label, or -1 if no celebrity.

Example 1

Input

knows = [[0,1],[0,0]]

Output

1

Explanation

Person 1 is known by person 0, and person 1 doesn't know anyone. So person 1 is the celebrity.

Example 2

Input

knows = [[1,1],[1,1]]

Output

-1

Constraints
2 <= n <= 100
knows[i][j] is 0 or 1`,

  "Find Median from Data Stream": `The median is the middle value in an ordered integer list. If the list size is even, the median is the average of the two middle values.

Implement a solution that can continuously add numbers and find the current median.

Note: For this problem, given a list of numbers, return the median after each insertion.

Input

A list of integers nums where:

1 <= nums.length <= 5 * 10^4
-10^5 <= nums[i] <= 10^5

Output

Return a list of medians after each number is added.

Example 1

Input

nums = [1,2,3]

Output

[1.0, 1.5, 2.0]

Explanation

After adding 1: median=1.0, after adding 2: median=1.5, after adding 3: median=2.0

Example 2

Input

nums = [6,5,4,3,2,1]

Output

[6.0,5.5,5.0,4.5,4.0,3.5]

Constraints
1 <= nums.length <= 5 * 10^4
-10^5 <= nums[i] <= 10^5`,

  "Subarray Sum Equals K": `Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

Input

An integer array nums and integer k where:

1 <= nums.length <= 2 * 10^4
-1000 <= nums[i] <= 1000
-10^7 <= k <= 10^7

Output

Return the number of subarrays that sum to k.

Example 1

Input

nums = [1,1,1], k = 2

Output

2

Example 2

Input

nums = [1,2,3], k = 3

Output

2

Explanation

Subarrays: [1,2] and [3] both sum to 3.

Constraints
1 <= nums.length <= 2 * 10^4
-1000 <= nums[i] <= 1000`,

  // =================== MICROSOFT ===================

  "Single Number": `Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

Input

An integer array nums where:

1 <= nums.length <= 3 * 10^4
-3 * 10^4 <= nums[i] <= 3 * 10^4
Each element in the array appears twice except for one element which appears only once.

Output

Return the element that appears only once.

Example 1

Input

nums = [2,2,1]

Output

1

Example 2

Input

nums = [4,1,2,1,2]

Output

4

Example 3

Input

nums = [1]

Output

1

Explanation

XOR of all elements: pairs cancel each other out, leaving the single element.

Constraints
1 <= nums.length <= 3 * 10^4
Each element appears twice except one.`,

  "Edit Distance": `Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have three operations: Insert a character, Delete a character, Replace a character.

Input

Two strings word1 and word2 where:

0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.

Output

Return the minimum edit distance (Levenshtein distance).

Example 1

Input

word1 = "horse", word2 = "ros"

Output

3

Explanation

horse -> rorse (replace h with r)
rorse -> rose (remove r)
rose -> ros (remove e)

Example 2

Input

word1 = "intention", word2 = "execution"

Output

5

Constraints
0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.`,

  "Inorder Successor in BST": `Given the root of a binary search tree and a node p, find the in-order successor of that node in the BST.

The in-order successor of a node p is the node with the smallest key greater than p.val.

Note: For this problem, the BST is given as an array (level-order), and p is given as a value.

Input

A BST as a level-order array and an integer p.val.

Output

Return the value of the in-order successor, or -1 if none exists.

Example 1

Input

root = [2,1,3], p = 1

Output

2

Explanation

The in-order successor of 1 in [1,2,3] is 2.

Example 2

Input

root = [5,3,6,2,4,null,null,1], p = 6

Output

-1

Explanation

6 is the largest node, so there is no successor.

Constraints
The number of nodes is in range [1, 10^4].
-10^5 <= Node.val <= 10^5`,

  "Implement Trie (Prefix Tree)": `A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.

Implement the Trie class with insert, search, and startsWith operations.

Note: For this problem, simulate a list of [operation, word] and return results of search and startsWith.

Input

A list of operations [["insert","apple"],["search","apple"],["startsWith","app"],...].

Output

Return a list of results for search and startsWith operations (true/false).

Example 1

Input

ops = [["insert","apple"],["search","apple"],["search","app"],["startsWith","app"],["insert","app"],["search","app"]]

Output

[true,false,true,true]

Explanation

search("apple")=true, search("app")=false, startsWith("app")=true, search("app")=true (after insert).

Constraints
1 <= word.length <= 2000
word consists of lowercase English letters only.`,

  "Counting Bits": `Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

Input

An integer n where:

0 <= n <= 10^5

Output

Return an array of length n+1 where each element is the popcount of its index.

Example 1

Input

n = 2

Output

[0,1,1]

Explanation

0 -> 0 bits, 1 -> 1 bit, 2 -> 1 bit

Example 2

Input

n = 5

Output

[0,1,1,2,1,2]

Explanation

0->0, 1->1, 2->1, 3->2, 4->1, 5->2

Constraints
0 <= n <= 10^5`,

  "Word Search": `Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Input

An m x n character grid board and a string word where:

m == board.length
n == board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.

Output

Return true if word exists in the grid, false otherwise.

Example 1

Input

board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"

Output

true

Example 2

Input

board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"

Output

true

Example 3

Input

board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"

Output

false

Constraints
1 <= m, n <= 6
1 <= word.length <= 15`,

  "Valid Palindrome": `A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string s, return true if it is a palindrome, or false otherwise.

Input

A string s where:

1 <= s.length <= 2 * 10^5
s consists only of printable ASCII characters.

Output

Return true if the string is a palindrome (ignoring case and non-alphanumeric characters), false otherwise.

Example 1

Input

s = "A man, a plan, a canal: Panama"

Output

true

Explanation

"amanaplanacanalpanama" is a palindrome.

Example 2

Input

s = "race a car"

Output

false

Explanation

"raceacar" is not a palindrome.

Example 3

Input

s = " "

Output

true

Constraints
1 <= s.length <= 2 * 10^5
s consists of printable ASCII characters.`,

  "Unique Paths": `There is a robot on an m x n grid. The robot is initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths from top-left to bottom-right.

Input

Two integers m and n where:

1 <= m, n <= 100

Output

Return the number of unique paths.

Example 1

Input

m = 3, n = 7

Output

28

Example 2

Input

m = 3, n = 2

Output

3

Explanation

From the top-left corner, there are 3 ways: Right->Down->Down, Down->Right->Down, Down->Down->Right.

Constraints
1 <= m, n <= 100`,

  "Flatten Binary Tree to Linked List": `Given the root of a binary tree, flatten the tree into a "linked list" in-place.

The linked list should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null. The list should be in the same order as a pre-order traversal.

Note: For this problem, the tree is given as an array and you should return the flattened level-order.

Input

A binary tree as a level-order array.

Output

Return the pre-order flattened array (as a right-only linked list).

Example 1

Input

root = [1,2,5,3,4,null,6]

Output

[1,null,2,null,3,null,4,null,5,null,6]

Example 2

Input

root = []

Output

[]

Example 3

Input

root = [0]

Output

[0]

Constraints
0 <= number of nodes <= 2000
-100 <= Node.val <= 100`,

  "Maximum Depth of Binary Tree": `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Input

A binary tree given as a level-order array where null means missing node.

Output

Return the maximum depth of the tree.

Example 1

Input

root = [3,9,20,null,null,15,7]

Output

3

Example 2

Input

root = [1,null,2]

Output

2

Constraints
0 <= number of nodes <= 10^4
-100 <= Node.val <= 100`,

  "Power of Two": `Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2^x.

Input

An integer n where:

-2^31 <= n <= 2^31 - 1

Output

Return true if n is a power of two, false otherwise.

Example 1

Input

n = 1

Output

true

Explanation

2^0 = 1

Example 2

Input

n = 16

Output

true

Explanation

2^4 = 16

Example 3

Input

n = 3

Output

false

Constraints
-2^31 <= n <= 2^31 - 1`,

  "Roman to Integer": `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Given a roman numeral, convert it to an integer.

Input

A string s (roman numeral) where:

1 <= s.length <= 15
s contains only the characters 'I', 'V', 'X', 'L', 'C', 'D', 'M'.
It is guaranteed that s is a valid roman numeral in the range [1, 3999].

Output

Return the integer value of the roman numeral.

Example 1

Input

s = "III"

Output

3

Example 2

Input

s = "LVIII"

Output

58

Explanation

L=50, V=5, III=3

Example 3

Input

s = "MCMXCIV"

Output

1994

Explanation

M=1000, CM=900, XC=90, IV=4

Constraints
1 <= s.length <= 15
s is a valid roman numeral in range [1, 3999].`,

  "Validate Binary Search Tree": `Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as: left subtree contains only nodes with keys less than the node's key, right subtree only greater, and both subtrees are BSTs.

Input

A binary tree as a level-order array.

Output

Return true if the tree is a valid BST, false otherwise.

Example 1

Input

root = [2,1,3]

Output

true

Example 2

Input

root = [5,1,4,null,null,3,6]

Output

false

Explanation

Root node's value is 5 but right child's value is 4.

Constraints
0 <= number of nodes <= 10^4
-2^31 <= Node.val <= 2^31 - 1`,

  "Add and Search Word": `Design a data structure that supports adding new words and finding if a string matches any previously added string. A word may contain dots '.' where dots can match any letter.

Note: For this problem, simulate [["addWord","bad"],["search",".ad"],...] and return results.

Input

A list of [operation, word] pairs.

Output

Return results of search operations (true/false), where '.' matches any character.

Example 1

Input

ops = [["addWord","bad"],["addWord","dad"],["addWord","mad"],["search","pad"],["search","bad"],["search",".ad"],["search","b.."]]

Output

[false,true,true,true]

Constraints
1 <= word.length <= 25
Calls to addWord and search will be at most 10^4.`,

  "Number of Connected Components": `You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates there is an edge between nodes ai and bi.

Return the number of connected components in the graph.

Input

An integer n and edge list where:

1 <= n <= 2000
1 <= edges.length <= 5000
edges[i].length == 2
0 <= ai <= bi < n
No repeated edges.

Output

Return the number of connected components.

Example 1

Input

n = 5, edges = [[0,1],[1,2],[3,4]]

Output

2

Example 2

Input

n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]

Output

1

Constraints
1 <= n <= 2000
0 <= edges.length <= 5000`,

  "Reverse Bits": `Reverse bits of a given 32 bits unsigned integer.

Input

An unsigned 32-bit integer n.

Output

Return the integer whose binary representation is the reverse of the input.

Example 1

Input

n = 43261596

Output

964176192

Explanation

43261596 in binary: 00000010100101000001111010011100
Reversed: 00111001011110000010100101000000 = 964176192

Example 2

Input

n = 4294967293

Output

3221225471

Constraints
The input must be a binary string of length 32.`,

  "Binary Tree Zigzag Level Order Traversal": `Given the root of a binary tree, return the zigzag level order traversal of its nodes' values (i.e., from left to right, then right to left for the next level and alternate between).

Input

A binary tree as a level-order array.

Output

Return a 2D array where alternate levels are reversed.

Example 1

Input

root = [3,9,20,null,null,15,7]

Output

[[3],[20,9],[15,7]]

Example 2

Input

root = [1]

Output

[[1]]

Example 3

Input

root = []

Output

[]

Constraints
0 <= number of nodes <= 2000
-100 <= Node.val <= 100`,

  "Reverse Words in a String": `Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space.

Input

A string s where:

1 <= s.length <= 10^4
s contains English letters, digits, and spaces ' '.
There is at least one word in s.

Output

Return the string with words in reversed order.

Example 1

Input

s = "the sky is blue"

Output

"blue is sky the"

Example 2

Input

s = "  hello world  "

Output

"world hello"

Explanation

Leading and trailing spaces are removed, and multiple spaces between words are reduced to one.

Example 3

Input

s = "a good   example"

Output

"example good a"

Constraints
1 <= s.length <= 10^4`,

  "Lowest Common Ancestor of BST": `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q.

The LCA is defined between two nodes p and q as the lowest node in the tree that has both p and q as descendants.

Input

A BST as a level-order array and two node values p and q.

Output

Return the value of the lowest common ancestor node.

Example 1

Input

root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8

Output

6

Example 2

Input

root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4

Output

2

Constraints
2 <= number of nodes <= 10^5
All node values are unique.`,

  "Copy List with Random Pointer": `A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list.

Note: For this problem, the linked list is given as [[val1, random_index1], ...] and you should return the same structure.

Input

A list of [val, random_index] pairs where:

0 <= n <= 1000
-10^4 <= Node.val <= 10^4
Node.random is null or points to some node in the linked list.

Output

Return the deep copied list as [[val, random_index], ...].

Example 1

Input

head = [[7,null],[13,0],[11,4],[10,2],[1,0]]

Output

[[7,null],[13,0],[11,4],[10,2],[1,0]]

Constraints
0 <= n <= 1000
-10^4 <= Node.val <= 10^4`,

  "Word Search II": `Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, and the same letter cell may not be used more than once in a word.

Input

An m x n character board and a list of words where:

1 <= m, n <= 12
words.length <= 3 * 10^4

Output

Return all words found in the board.

Example 1

Input

board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]

Output

["eat","oath"]

Example 2

Input

board = [["a","b"],["c","d"]], words = ["abcb"]

Output

[]

Constraints
1 <= m, n <= 12
words.length <= 3 * 10^4`,

  "Graph Valid Tree": `You have a graph of n nodes labeled 0 to n-1. Given a list of edges, determine whether these edges form a valid tree.

A valid tree must be connected and have no cycles (n-1 edges for n nodes).

Input

An integer n and a list of edges where:

1 <= n <= 2000
0 <= edges.length <= 5000

Output

Return true if the graph forms a valid tree, false otherwise.

Example 1

Input

n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]

Output

true

Example 2

Input

n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]

Output

false

Constraints
1 <= n <= 2000
0 <= edges.length <= 5000`,

  "Longest Consecutive Sequence": `Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Input

An integer array nums where:

0 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9

Output

Return the length of the longest consecutive sequence.

Example 1

Input

nums = [100,4,200,1,3,2]

Output

4

Explanation

The longest consecutive sequence is [1,2,3,4]. Its length is 4.

Example 2

Input

nums = [0,3,7,2,5,8,4,6,0,1]

Output

9

Constraints
0 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9`,

  "Missing Number": `Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

Input

An integer array nums where:

n == nums.length
1 <= n <= 10^4
0 <= nums[i] <= n
All the numbers of nums are unique.

Output

Return the missing number.

Example 1

Input

nums = [3,0,1]

Output

2

Explanation

n = 3 since there are 3 numbers. Missing from [0,1,2,3] is 2.

Example 2

Input

nums = [0,1]

Output

2

Example 3

Input

nums = [9,6,4,2,3,5,7,0,1]

Output

8

Constraints
n == nums.length
1 <= n <= 10^4
All numbers are unique.`,

  "Sum of Two Integers Without + Operator": `Given two integers a and b, return the sum of the two integers without using the operators + and -.

Input

Two integers a and b where:

-1000 <= a, b <= 1000

Output

Return a + b without using + or -.

Example 1

Input

a = 1, b = 2

Output

3

Example 2

Input

a = 2, b = 3

Output

5

Explanation

Use bitwise operations: XOR gives sum without carry, AND + left shift gives carry. Repeat until no carry.

Constraints
-1000 <= a, b <= 1000`,

  "Minimum Path Sum": `Given an m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Input

An m x n integer grid where:

m == grid.length
n == grid[i].length
1 <= m, n <= 200
0 <= grid[i][j] <= 200

Output

Return the minimum path sum from top-left to bottom-right.

Example 1

Input

grid = [[1,3,1],[1,5,1],[4,2,1]]

Output

7

Explanation

The path 1→3→1→1→1 minimizes the sum to 7.

Example 2

Input

grid = [[1,2,3],[4,5,6]]

Output

12

Constraints
1 <= m, n <= 200
0 <= grid[i][j] <= 200`,

  "Excel Sheet Column Number": `Given a string columnTitle that represents the column title as appears in an Excel sheet, return its corresponding column number.

A=1, B=2, ..., Z=26, AA=27, AB=28, ...

Input

A string columnTitle where:

1 <= columnTitle.length <= 7
columnTitle consists only of uppercase English letters.

Output

Return the column number.

Example 1

Input

columnTitle = "A"

Output

1

Example 2

Input

columnTitle = "AB"

Output

28

Example 3

Input

columnTitle = "ZY"

Output

701

Constraints
1 <= columnTitle.length <= 7
columnTitle consists only of uppercase English letters.`,

  "Convert Sorted Array to BST": `Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

Input

A sorted integer array nums where:

1 <= nums.length <= 10^4
-10^4 <= nums[i] <= 10^4
nums is sorted in strictly increasing order.

Output

Return the level-order array representation of the height-balanced BST.

Example 1

Input

nums = [-10,-3,0,5,9]

Output

[0,-3,9,-10,null,5]

Example 2

Input

nums = [1,3]

Output

[3,1]

Constraints
1 <= nums.length <= 10^4
-10^4 <= nums[i] <= 10^4`,

  "Number of 1 Bits": `Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).

Input

An integer n where:

1 <= n <= 2^31 - 1

Output

Return the number of 1 bits.

Example 1

Input

n = 11

Output

3

Explanation

11 in binary is 1011, which has 3 ones.

Example 2

Input

n = 128

Output

1

Explanation

128 in binary is 10000000, which has 1 one.

Example 3

Input

n = 2147483645

Output

30

Constraints
1 <= n <= 2^31 - 1`,

  "Integer to Roman": `Given an integer, convert it to a roman numeral.

Input

An integer num where:

1 <= num <= 3999

Output

Return the roman numeral string.

Example 1

Input

num = 3749

Output

"MMMDCCXLIX"

Example 2

Input

num = 58

Output

"LVIII"

Explanation

L=50, V=5, III=3

Example 3

Input

num = 1994

Output

"MCMXCIV"

Explanation

M=1000, CM=900, XC=90, IV=4

Constraints
1 <= num <= 3999`,

  // =================== META ===================

  "Meeting Rooms II": `Given an array of meeting time intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

Input

An array of meeting intervals where:

1 <= intervals.length <= 10^4
0 <= starti < endi <= 10^6

Output

Return the minimum number of conference rooms required.

Example 1

Input

intervals = [[0,30],[5,10],[15,20]]

Output

2

Example 2

Input

intervals = [[7,10],[2,4]]

Output

1

Explanation

Sort by start time, use a min-heap to track end times. If earliest end <= current start, reuse room; else add a new one.

Constraints
1 <= intervals.length <= 10^4
0 <= starti < endi <= 10^6`,

  "Hand of Straights": `Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.

Given an integer array hand where hand[i] is the value written on the i-th card and an integer groupSize, return true if she can rearrange the cards, false otherwise.

Input

An integer array hand and integer groupSize where:

1 <= hand.length <= 10^4
0 <= hand[i] <= 10^9
1 <= groupSize <= hand.length

Output

Return true if cards can be rearranged into groups of consecutive groupSize, false otherwise.

Example 1

Input

hand = [1,2,3,6,2,3,4,7,8], groupSize = 3

Output

true

Explanation

Alice can rearrange her hand as [1,2,3],[2,3,4],[6,7,8]

Example 2

Input

hand = [1,2,3,4,5], groupSize = 4

Output

false

Explanation

Alice can't form groups of 4.

Constraints
1 <= hand.length <= 10^4
1 <= groupSize <= hand.length`,

  "Flatten Nested List Iterator": `You are given a nested list of integers nestedList. Each element is either an integer or a list of integers. Implement a flattened iterator to iterate over all integers.

Note: For this problem, given a nested list (as a string), return the flattened array.

Input

A nested list representation (e.g., "[1,[4,[6]],[2,3]]").

Output

Return the flattened array of all integers.

Example 1

Input

nestedList = "[[[1,1],2],[1,1]]"

Output

[1,1,2,1,1]

Example 2

Input

nestedList = "[1,[4,[6]]]"

Output

[1,4,6]

Constraints
1 <= nestedList.length <= 500
The values of the integers in the nested list is in the range [-10^6, 10^6].`,

  "Daily Temperatures": `Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.

If there is no future day for which this is possible, keep answer[i] == 0.

Input

An integer array temperatures where:

1 <= temperatures.length <= 10^5
30 <= temperatures[i] <= 100

Output

Return an array of integers where answer[i] is the number of days to wait for a warmer temperature.

Example 1

Input

temperatures = [73,74,75,71,69,72,76,73]

Output

[1,1,4,2,1,1,0,0]

Example 2

Input

temperatures = [30,40,50,60]

Output

[1,1,1,0]

Example 3

Input

temperatures = [30,60,90]

Output

[1,1,0]

Constraints
1 <= temperatures.length <= 10^5
30 <= temperatures[i] <= 100`,

  "Accounts Merge": `Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails.

Merge accounts that share emails. Return accounts in any order.

Input

A list of accounts where:

1 <= accounts.length <= 1000
2 <= accounts[i].length <= 10
1 <= accounts[i][j].length <= 30

Output

Return the merged accounts list, each sorted, with name first.

Example 1

Input

accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]

Output

[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]

Constraints
1 <= accounts.length <= 1000
2 <= accounts[i].length <= 10`,

  "Max Consecutive Ones III": `Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

Input

A binary integer array nums and integer k where:

1 <= nums.length <= 10^5
nums[i] is 0 or 1
0 <= k <= nums.length

Output

Return the maximum number of consecutive 1's with at most k flips.

Example 1

Input

nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2

Output

6

Explanation

[1,1,1,0,0,1,1,1,1,1,1] bolded subarray has 6 ones.

Example 2

Input

nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3

Output

10

Constraints
1 <= nums.length <= 10^5
0 <= k <= nums.length`,

  "Basic Calculator II": `Given a string s which represents an expression, evaluate this expression and return its value.

The expression contains only non-negative integers, +, -, *, / operators, and empty spaces. The integer division should truncate toward zero.

Input

A string s where:

1 <= s.length <= 3 * 10^5
s consists of integers and operators (+, -, *, /).

Output

Return the evaluated integer result.

Example 1

Input

s = "3+2*2"

Output

7

Example 2

Input

s = " 3/2 "

Output

1

Example 3

Input

s = " 3+5 / 2 "

Output

5

Constraints
1 <= s.length <= 3 * 10^5
s represents a valid expression with non-negative integers.`,

  "Product of Array Except Self": `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

You must write an algorithm that runs in O(n) time and without using the division operation.

Input

An integer array nums where:

2 <= nums.length <= 10^5
-30 <= nums[i] <= 30

Output

Return the product-except-self array.

Example 1

Input

nums = [1,2,3,4]

Output

[24,12,8,6]

Example 2

Input

nums = [-1,1,0,-3,3]

Output

[0,0,9,0,0]

Constraints
2 <= nums.length <= 10^5
-30 <= nums[i] <= 30`,

  "Encode and Decode Strings": `Design an algorithm to encode a list of strings to a single string and decode it back.

Note: Your encoded string will be sent over the network and then decoded back to the original list of strings.

Input

A list of strings where:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] contains any possible characters out of 256 valid ASCII characters.

Output

Return the original list after encode then decode.

Example 1

Input

strs = ["neet","code","love","you"]

Output

["neet","code","love","you"]

Example 2

Input

strs = ["we","say",":","yes"]

Output

["we","say",":","yes"]

Constraints
1 <= strs.length <= 200
0 <= strs[i].length <= 200`,

  "Insert Interval": `You are given an array of non-overlapping intervals sorted by their start times, and an interval newInterval. Insert newInterval into intervals and merge if any merge is needed.

Input

A sorted list of non-overlapping intervals and a new interval where:

0 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^5

Output

Return the resulting intervals after insertion and merge.

Example 1

Input

intervals = [[1,3],[6,9]], newInterval = [2,5]

Output

[[1,5],[6,9]]

Example 2

Input

intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]

Output

[[1,2],[3,10],[12,16]]

Explanation

[4,8] overlaps with [3,5],[6,7],[8,10].

Constraints
0 <= intervals.length <= 10^4
intervals[i].length == 2`,

  "Non-overlapping Intervals": `Given an array of intervals, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Input

An array of intervals where:

1 <= intervals.length <= 10^5
intervals[i].length == 2
-5 * 10^4 <= starti < endi <= 5 * 10^4

Output

Return the minimum number of intervals to remove.

Example 1

Input

intervals = [[1,2],[2,3],[3,4],[1,3]]

Output

1

Explanation

[1,3] can be removed and the rest are non-overlapping.

Example 2

Input

intervals = [[1,2],[1,2],[1,2]]

Output

2

Example 3

Input

intervals = [[1,2],[2,3]]

Output

0

Constraints
1 <= intervals.length <= 10^5
starti < endi`,

  "Task Scheduler": `You are given an array of CPU tasks, each labeled with a letter from A to Z, and a number n. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order. Between two tasks of the same label there must be a cooldown of n intervals.

Return the minimum number of CPU intervals required to finish all the tasks.

Input

A character array tasks and integer n where:

1 <= tasks.length <= 10^4
tasks[i] is uppercase English letter
0 <= n <= 100

Output

Return the minimum number of intervals to finish all tasks.

Example 1

Input

tasks = ["A","A","A","B","B","B"], n = 2

Output

8

Explanation

A->B->idle->A->B->idle->A->B

Example 2

Input

tasks = ["A","C","A","B","D","B"], n = 1

Output

6

Constraints
1 <= tasks.length <= 10^4
0 <= n <= 100`,

  "Contiguous Array": `Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

Input

A binary integer array nums where:

1 <= nums.length <= 10^5
nums[i] is 0 or 1.

Output

Return the maximum length of contiguous subarray with equal 0s and 1s.

Example 1

Input

nums = [0,1]

Output

2

Explanation

[0,1] is the longest contiguous subarray with equal 0s and 1s.

Example 2

Input

nums = [0,1,0]

Output

2

Explanation

[0,1] or [1,0] are the longest subarrays.

Constraints
1 <= nums.length <= 10^5
nums[i] is 0 or 1.`,

  "Largest Rectangle in Histogram": `Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

Input

An integer array heights where:

1 <= heights.length <= 10^5
0 <= heights[i] <= 10^4

Output

Return the area of the largest rectangle.

Example 1

Input

heights = [2,1,5,6,2,3]

Output

10

Explanation

The largest rectangle has an area of 10 units (bars 3 and 4 of height 5 and 6).

Example 2

Input

heights = [2,4]

Output

4

Constraints
1 <= heights.length <= 10^5
0 <= heights[i] <= 10^4`,

  "Meeting Rooms": `Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.

Input

An array of meeting intervals where:

0 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti < endi <= 10^6

Output

Return true if a person can attend all meetings, false if any two meetings overlap.

Example 1

Input

intervals = [[0,30],[5,10],[15,20]]

Output

false

Example 2

Input

intervals = [[7,10],[2,4]]

Output

true

Constraints
0 <= intervals.length <= 10^4
0 <= starti < endi <= 10^6`,

  "Redundant Connection": `In this problem, a tree is an undirected graph that is connected and has no cycles. Given a graph that started as a tree with n nodes (1 to n) with one additional edge added, return the edge that can be removed to make the graph a tree again.

Input

A list of edges where:

n == edges.length
3 <= n <= 1000
edges[i].length == 2
1 <= ai < bi <= n

Output

Return the redundant edge.

Example 1

Input

edges = [[1,2],[1,3],[2,3]]

Output

[2,3]

Example 2

Input

edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]

Output

[1,4]

Constraints
3 <= n <= 1000
edges[i] are valid and unique.`,

  "Maximal Rectangle": `Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Input

A 2D binary character matrix where:

rows == matrix.length
cols == matrix[i].length
1 <= rows, cols <= 200
matrix[i][j] is '0' or '1'

Output

Return the area of the largest rectangle of 1s.

Example 1

Input

matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]

Output

6

Example 2

Input

matrix = [["0"]]

Output

0

Constraints
1 <= rows, cols <= 200
matrix[i][j] is '0' or '1'`,

  "Evaluate Reverse Polish Notation": `You are given an array of strings tokens that represents an arithmetic expression in Reverse Polish Notation. Evaluate and return the integer result.

Input

A string array tokens where:

1 <= tokens.length <= 10^4
tokens[i] is either an integer or one of "+", "-", "*", "/".

Output

Return the evaluated integer.

Example 1

Input

tokens = ["2","1","+","3","*"]

Output

9

Explanation

((2+1)*3) = 9

Example 2

Input

tokens = ["4","13","5","/","+"]

Output

6

Explanation

(4+(13/5)) = 6

Example 3

Input

tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]

Output

22

Constraints
1 <= tokens.length <= 10^4`,

  "First Bad Version": `You are a product manager and currently leading a team to develop a new product. You have n versions [1, 2, ..., n] and you want to find out the first bad version which causes all the following ones to be bad.

Given a function isBadVersion(version) that returns true if version is bad, implement a function to find the first bad version.

Note: For this problem, given n and bad (the first bad version), find the first bad version using binary search.

Input

An integer n (total versions) and an integer bad (first bad version).

Output

Return the first bad version number.

Example 1

Input

n = 5, bad = 4

Output

4

Explanation

call isBadVersion(3) -> false, isBadVersion(5) -> true, isBadVersion(4) -> true. So 4 is the first bad version.

Example 2

Input

n = 1, bad = 1

Output

1

Constraints
1 <= bad <= n <= 2^31 - 1`,

  "Move Zeroes": `Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Input

An integer array nums where:

1 <= nums.length <= 10^4
-2^31 <= nums[i] <= 2^31 - 1

Output

Return the array with all zeroes moved to the end.

Example 1

Input

nums = [0,1,0,3,12]

Output

[1,3,12,0,0]

Example 2

Input

nums = [0]

Output

[0]

Constraints
1 <= nums.length <= 10^4
-2^31 <= nums[i] <= 2^31 - 1`,

  "Car Fleet": `There are n cars going to the same destination along a one-lane road. The destination is target miles away. Each car i has a constant speed speed[i] and starts at position position[i].

A car can never pass another car ahead of it, but it can catch up to it, and drive bumper to bumper at the same speed. Return the number of car fleets that will arrive at the destination.

Input

Integers target, and arrays position and speed where:

n == position.length == speed.length
1 <= n <= 10^5
0 < target <= 10^6
0 <= position[i] < target
0 < speed[i] <= 10^6

Output

Return the number of car fleets.

Example 1

Input

target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]

Output

3

Explanation

Cars at 10 and 8 form a fleet. Car at 0 is alone. Cars at 5 and 3 form a fleet.

Example 2

Input

target = 10, position = [3], speed = [3]

Output

1

Constraints
1 <= n <= 10^5
0 < target <= 10^6`,

  "Valid Anagram": `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word using all the original letters exactly once.

Input

Two strings s and t where:

1 <= s.length, t.length <= 5 * 10^4
s and t consist of lowercase English letters.

Output

Return true if t is an anagram of s, false otherwise.

Example 1

Input

s = "anagram", t = "nagaram"

Output

true

Example 2

Input

s = "rat", t = "car"

Output

false

Constraints
1 <= s.length, t.length <= 5 * 10^4
s and t consist of lowercase English letters.`,

  "Squares of a Sorted Array": `Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

Input

A sorted integer array nums where:

1 <= nums.length <= 10^4
-10^4 <= nums[i] <= 10^4
nums is sorted in non-decreasing order.

Output

Return the sorted array of squares.

Example 1

Input

nums = [-4,-1,0,3,10]

Output

[0,1,9,16,100]

Example 2

Input

nums = [-7,-3,2,3,11]

Output

[4,9,9,49,121]

Constraints
1 <= nums.length <= 10^4
-10^4 <= nums[i] <= 10^4`,

  "Count of Smaller Numbers After Self": `Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].

Input

An integer array nums where:

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4

Output

Return the count array.

Example 1

Input

nums = [5,2,6,1]

Output

[2,1,1,0]

Explanation

Right of 5: [2,6,1] has 2 smaller (2,1). Right of 2: [6,1] has 1 smaller (1). Right of 6: [1] has 1 smaller (1). Right of 1: [] has 0 smaller.

Example 2

Input

nums = [-1]

Output

[0]

Constraints
1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4`,

  "Interval List Intersections": `You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

Input

Two sorted lists of intervals where:

0 <= firstList.length, secondList.length <= 1000
firstList[i].length == secondList[j].length == 2
0 <= starti <= endi <= 10^9

Output

Return a list of all intersecting intervals.

Example 1

Input

firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]

Output

[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

Example 2

Input

firstList = [[1,3],[5,9]], secondList = []

Output

[]

Constraints
0 <= firstList.length, secondList.length <= 1000`,

  "Friend Circles": `There are n students. Some of them are friends, some are not. Their friendship is transitive. Given an n x n matrix isConnected where isConnected[i][j] = 1 if students i and j are directly friends, return the total number of friend circles (provinces).

Input

An n x n integer matrix isConnected where:

1 <= n <= 200
n == isConnected.length
n == isConnected[i].length
isConnected[i][j] is 1 or 0

Output

Return the number of friend circles.

Example 1

Input

isConnected = [[1,1,0],[1,1,0],[0,0,1]]

Output

2

Example 2

Input

isConnected = [[1,0,0],[0,1,0],[0,0,1]]

Output

3

Constraints
1 <= n <= 200
isConnected[i][j] is 1 or 0`,

  "Largest Color Value in Directed Graph": `There is a directed graph of n colored nodes and m edges. Each node has a color given as a lowercase English letter. Given edges and colors, find the largest color value of any valid path in the graph, or return -1 if there is a cycle.

The color value of a path is the number of nodes that are colored the most frequent color along that path.

Input

A string colors and a list of directed edges where:

n == colors.length
1 <= n <= 10^5
0 <= edges.length <= 10^5

Output

Return the largest color value, or -1 if there is a cycle.

Example 1

Input

colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]

Output

3

Explanation

The path 0->2->3->4 has color sequence "aaca" and the color 'a' appears 3 times.

Example 2

Input

colors = "a", edges = [[0,0]]

Output

-1

Explanation

There is a cycle, so return -1.

Constraints
n == colors.length
1 <= n <= 10^5`
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    let updated = 0;
    let notFound = 0;

    for (const [title, description] of Object.entries(DESCRIPTIONS)) {
      const q = await Question.findOne({ title });
      if (q) {
        q.description = description;
        await q.save();
        console.log(`✅ Updated: ${title}`);
        updated++;
      } else {
        console.log(`❌ Not found: ${title}`);
        notFound++;
      }
    }

    console.log(`\nDone! ${updated} updated, ${notFound} not found.`);
  } catch (e) {
    console.error("Error:", e);
  }
  process.exit();
};

run();
