import mongoose from "mongoose";
import Question from "../models/question.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const DESCRIPTIONS = {

  "Intersection of Two Arrays": `Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

Input

Two integer arrays nums1 and nums2 where:

1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000

Output

Return the array of unique intersection elements.

Example 1

Input

nums1 = [1,2,2,1], nums2 = [2,2]

Output

[2]

Example 2

Input

nums1 = [4,9,5], nums2 = [9,4,9,8,4]

Output

[9,4]

Explanation

[4,9] is also accepted.

Constraints
1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000`,

  "Binary Watch": `A binary watch has 4 LEDs on the top to represent the hours (0-11) and 6 LEDs on the bottom to represent the minutes (0-59). Each LED represents a zero or one, with the least significant bit on the right.

Given an integer turnedOn which represents the number of LEDs that are currently on, return all possible times the watch could represent.

Input

An integer turnedOn where:

0 <= turnedOn <= 10

Output

Return all valid times in "H:MM" format (no leading zero for hours, leading zero for minutes if < 10).

Example 1

Input

turnedOn = 1

Output

["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]

Example 2

Input

turnedOn = 9

Output

[]

Constraints
0 <= turnedOn <= 10`,

  "Prison Cells After N Days": `There are 8 prison cells in a row and each cell is either occupied or vacant. Each day, whether the cell is occupied changes according to the following rules: If the two adjacent neighbors of the cell are both occupied or both vacant, then the cell becomes occupied. Otherwise, it becomes vacant.

Note that because the prison is a row, the first and the last cells in the row can't have two adjacent neighbors.

Given the initial state of the prison cells as an array and the number of days n, return the state of the prison after n days.

Input

An integer array cells of length 8 and integer n where:

cells.length == 8
cells[i] is 0 or 1
1 <= n <= 10^9

Output

Return the state of the 8 cells after n days.

Example 1

Input

cells = [0,1,0,1,1,0,0,1], n = 7

Output

[0,0,1,1,0,0,0,0]

Example 2

Input

cells = [1,0,0,1,0,0,1,0], n = 1000000000

Output

[0,0,1,1,1,1,1,0]

Constraints
cells.length == 8
1 <= n <= 10^9`,

  "Implement Queue using Stacks": `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Note: For this problem, simulate operations [["push",x],["pop"],["peek"],["empty"],...] and return results of pop, peek, and empty.

Input

A list of operations where:

1 <= x <= 9
At most 100 calls to push, pop, peek, and empty.
All calls to pop and peek are valid.

Output

Return a list of results for pop, peek, and empty operations.

Example 1

Input

ops = [["push",1],["push",2],["peek"],["pop"],["empty"]]

Output

[1,1,false]

Explanation

peek() = 1 (front of queue), pop() = 1, empty() = false (still has 2).

Constraints
1 <= x <= 9
At most 100 calls total.`,

  "Largest Number": `Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.

Since the result may be very large, return it as a string.

Input

An integer array nums where:

1 <= nums.length <= 100
0 <= nums[i] <= 10^9

Output

Return the largest number as a string.

Example 1

Input

nums = [10,2]

Output

"210"

Example 2

Input

nums = [3,30,34,5,9]

Output

"9534330"

Explanation

Sort by comparing which concatenation is larger: "9" > "5" > "34" > "3" > "30".

Constraints
1 <= nums.length <= 100
0 <= nums[i] <= 10^9`,

  "Majority Element": `Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Input

An integer array nums where:

n == nums.length
1 <= n <= 5 * 10^4
-10^9 <= nums[i] <= 10^9
The majority element always exists.

Output

Return the majority element.

Example 1

Input

nums = [3,2,3]

Output

3

Example 2

Input

nums = [2,2,1,1,1,2,2]

Output

2

Explanation

Use Boyer-Moore Voting Algorithm for O(n) time and O(1) space.

Constraints
n == nums.length
1 <= n <= 5 * 10^4
The majority element always exists.`,

  "Happy Number": `Write an algorithm to determine if a number n is happy.

A happy number is defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat until the number either equals 1 (happy) or loops endlessly in a cycle that does not include 1.

Input

An integer n where:

1 <= n <= 2^31 - 1

Output

Return true if n is a happy number, false otherwise.

Example 1

Input

n = 19

Output

true

Explanation

1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0^2 + 0^2 = 1.

Example 2

Input

n = 2

Output

false

Constraints
1 <= n <= 2^31 - 1`,

  "Number of Ways to Stay in the Same Place After Some Steps": `You have a pointer at index 0 in an array of size arrLen. At each step, you can move 1 position to the left, 1 position to the right in the array, or stay in the same place (the pointer cannot leave the array).

Given two integers steps and arrLen, return the number of ways such that your pointer is still at index 0 after exactly steps steps. The answer may be large, return it modulo 10^9 + 7.

Input

Two integers steps and arrLen where:

1 <= steps <= 500
1 <= arrLen <= 10^6

Output

Return the number of ways to stay at index 0 after steps steps, modulo 10^9 + 7.

Example 1

Input

steps = 3, arrLen = 2

Output

4

Explanation

3 ways: Stay,Stay,Stay | Right,Left,Stay | Right,Stay,Left | Stay,Right,Left.

Example 2

Input

steps = 2, arrLen = 4

Output

2

Constraints
1 <= steps <= 500
1 <= arrLen <= 10^6`,

  "Maximum Depth of N-ary Tree": `Given a root of an N-ary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Note: For this problem, the N-ary tree is given as a level-order array where null separates children groups.

Input

An N-ary tree given as a level-order array.

Output

Return the maximum depth.

Example 1

Input

root = [1,null,3,2,4,null,5,6]

Output

3

Example 2

Input

root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]

Output

5

Constraints
0 <= number of nodes <= 10^4
0 <= Node.val <= 10^4`,

  "Path Sum": `Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

Input

A binary tree as a level-order array and integer targetSum where:

0 <= number of nodes <= 5000
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000

Output

Return true if any root-to-leaf path sums to targetSum, false otherwise.

Example 1

Input

root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22

Output

true

Explanation

The root-to-leaf path 5->4->11->2 has sum 22.

Example 2

Input

root = [1,2,3], targetSum = 5

Output

false

Constraints
0 <= number of nodes <= 5000
-1000 <= Node.val <= 1000`,

  "Invert Binary Tree": `Given the root of a binary tree, invert the tree, and return its root.

Input

A binary tree as a level-order array where:

0 <= number of nodes <= 100
-100 <= Node.val <= 100

Output

Return the level-order array of the inverted binary tree.

Example 1

Input

root = [4,2,7,1,3,6,9]

Output

[4,7,2,9,6,3,1]

Example 2

Input

root = [2,1,3]

Output

[2,3,1]

Example 3

Input

root = []

Output

[]

Constraints
0 <= number of nodes <= 100
-100 <= Node.val <= 100`,

  "Pascal's Triangle": `Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it.

Input

An integer numRows where:

1 <= numRows <= 30

Output

Return the first numRows of Pascal's triangle as a 2D array.

Example 1

Input

numRows = 5

Output

[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

Example 2

Input

numRows = 1

Output

[[1]]

Constraints
1 <= numRows <= 30`,

  "Ugly Number II": `An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Given an integer n, return the n-th ugly number.

Input

An integer n where:

1 <= n <= 1690

Output

Return the n-th ugly number.

Example 1

Input

n = 10

Output

12

Explanation

[1,2,3,4,5,6,8,9,10,12] is the sequence of the first 10 ugly numbers.

Example 2

Input

n = 1

Output

1

Explanation

1 has no prime factors, therefore all prime factors are 2, 3, and 5.

Constraints
1 <= n <= 1690`,

  "Find All Numbers Disappeared in an Array": `Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

Input

An integer array nums where:

n == nums.length
1 <= n <= 10^5
1 <= nums[i] <= n

Output

Return a list of all missing integers.

Example 1

Input

nums = [4,3,2,7,8,2,3,1]

Output

[5,6]

Example 2

Input

nums = [1,1]

Output

[2]

Constraints
n == nums.length
1 <= n <= 10^5
1 <= nums[i] <= n`,

  "Nth Digit": `Given an integer n, return the n-th digit of the infinite integer sequence [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...].

Input

An integer n where:

1 <= n <= 2^31 - 1

Output

Return the n-th digit in the sequence.

Example 1

Input

n = 3

Output

3

Example 2

Input

n = 11

Output

0

Explanation

The 11th digit in sequence 1,2,3,...,9,10,11,... is 0 (the first digit of 10).

Constraints
1 <= n <= 2^31 - 1`,

  "Minimum Depth of Binary Tree": `Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Input

A binary tree as a level-order array where:

0 <= number of nodes <= 10^5
-1000 <= Node.val <= 1000

Output

Return the minimum depth of the tree.

Example 1

Input

root = [3,9,20,null,null,15,7]

Output

2

Example 2

Input

root = [2,null,3,null,4,null,5,null,6]

Output

5

Constraints
0 <= number of nodes <= 10^5
-1000 <= Node.val <= 1000`,

  "Fibonacci Number": `The Fibonacci numbers, commonly denoted F(n) form a sequence called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.

F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.

Given n, calculate F(n).

Input

An integer n where:

0 <= n <= 30

Output

Return F(n).

Example 1

Input

n = 2

Output

1

Explanation

F(2) = F(1) + F(0) = 1 + 0 = 1.

Example 2

Input

n = 3

Output

2

Explanation

F(3) = F(2) + F(1) = 1 + 1 = 2.

Example 3

Input

n = 4

Output

3

Constraints
0 <= n <= 30`,

  "Palindrome Number": `Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same forward and backward.

Input

An integer x where:

-2^31 <= x <= 2^31 - 1

Output

Return true if x is a palindrome integer, false otherwise.

Example 1

Input

x = 121

Output

true

Explanation

121 reads as 121 from left to right and from right to left.

Example 2

Input

x = -121

Output

false

Explanation

From left to right, it reads -121. From right to left, it reads 121-. Not a palindrome.

Example 3

Input

x = 10

Output

false

Constraints
-2^31 <= x <= 2^31 - 1`,

  "Reverse String": `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Input

A character array s where:

1 <= s.length <= 10^5
s[i] is a printable ASCII character.

Output

Return the reversed character array.

Example 1

Input

s = ["h","e","l","l","o"]

Output

["o","l","l","e","h"]

Example 2

Input

s = ["H","a","n","n","a","h"]

Output

["h","a","n","n","a","H"]

Constraints
1 <= s.length <= 10^5
s[i] is a printable ASCII character.`,

  "Min Stack": `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Note: For this problem, simulate operations [["push",val],["pop"],["top"],["getMin"],...] and return results of top and getMin.

Input

A list of operations where:

-2^31 <= val <= 2^31 - 1
At most 3 * 10^4 calls total.
pop, top, getMin will always be called on non-empty stacks.

Output

Return a list of results for top and getMin operations.

Example 1

Input

ops = [["push",-2],["push",0],["push",-3],["getMin"],["pop"],["top"],["getMin"]]

Output

[-3,0,-2]

Explanation

getMin() = -3, after pop top() = 0, getMin() = -2.

Constraints
-2^31 <= val <= 2^31 - 1
At most 3 * 10^4 calls.`,

  "Contains Duplicate": `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Input

An integer array nums where:

1 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9

Output

Return true if any value appears more than once, false otherwise.

Example 1

Input

nums = [1,2,3,1]

Output

true

Example 2

Input

nums = [1,2,3,4]

Output

false

Example 3

Input

nums = [1,1,1,3,3,4,3,2,4,2]

Output

true

Constraints
1 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9`,

  "Balanced Binary Tree": `Given a binary tree, determine if it is height-balanced.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

Input

A binary tree as a level-order array where:

0 <= number of nodes <= 5000
-10^4 <= Node.val <= 10^4

Output

Return true if the tree is height-balanced, false otherwise.

Example 1

Input

root = [3,9,20,null,null,15,7]

Output

true

Example 2

Input

root = [1,2,2,3,3,null,null,4,4]

Output

false

Constraints
0 <= number of nodes <= 5000
-10^4 <= Node.val <= 10^4`,

  "First Unique Character in a String": `Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

Input

A string s where:

1 <= s.length <= 10^5
s consists of only lowercase English letters.

Output

Return the index of the first non-repeating character, or -1 if none.

Example 1

Input

s = "leetcode"

Output

0

Explanation

'l' at index 0 appears only once.

Example 2

Input

s = "loveleetcode"

Output

2

Explanation

'l' appears twice, 'o' appears twice, 'v' at index 2 appears only once.

Constraints
1 <= s.length <= 10^5
s consists of only lowercase English letters.`,

  "Merge Sorted Array": `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums2 into nums1 as one sorted array, in-place.

Input

Integer arrays nums1 (length m+n) and nums2 (length n), and integers m and n where:

0 <= m, n <= 200
1 <= m + n
-10^9 <= nums1[i], nums2[j] <= 10^9

Output

Return nums1 after merging (sorted in non-decreasing order).

Example 1

Input

nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3

Output

[1,2,2,3,5,6]

Example 2

Input

nums1 = [1], m = 1, nums2 = [], n = 0

Output

[1]

Example 3

Input

nums1 = [0], m = 0, nums2 = [1], n = 1

Output

[1]

Constraints
0 <= m, n <= 200
1 <= m + n`,

  "Guess Number Higher or Lower": `We are playing the Guess Game. I pick a number from 1 to n. You have to guess which number I picked.

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

Note: For this problem, given n and pick (the secret number), return the number of guesses made using binary search.

Input

An integer n and the secret pick where:

1 <= n <= 2^31 - 1
1 <= pick <= n

Output

Return the picked number (using binary search approach).

Example 1

Input

n = 10, pick = 6

Output

6

Example 2

Input

n = 1, pick = 1

Output

1

Example 3

Input

n = 2, pick = 1

Output

1

Constraints
1 <= n <= 2^31 - 1
1 <= pick <= n`,

  "Sum of Left Leaves": `Given the root of a binary tree, return the sum of all left leaves.

A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.

Input

A binary tree as a level-order array where:

1 <= number of nodes <= 1000
-1000 <= Node.val <= 1000

Output

Return the sum of all left leaf nodes.

Example 1

Input

root = [3,9,20,null,null,15,7]

Output

24

Explanation

Left leaves are 9 and 15. Sum = 9 + 15 = 24.

Example 2

Input

root = [1]

Output

0

Constraints
1 <= number of nodes <= 1000
-1000 <= Node.val <= 1000`,

  "Leaf-Similar Trees": `Consider all the leaves of a binary tree, from left to right order, which form the leaf value sequence of that tree.

Two binary trees are considered leaf-similar if their leaf value sequence is the same.

Input

Two binary trees given as level-order arrays.

Output

Return true if the two trees are leaf-similar, false otherwise.

Example 1

Input

root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]

Output

true

Example 2

Input

root1 = [1,2,3], root2 = [1,3,2]

Output

false

Constraints
The number of nodes in each tree is in range [1, 200].
Both trees have at least 1 leaf.`,

  "Symmetric Tree": `Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

Input

A binary tree as a level-order array where:

1 <= number of nodes <= 1000
-100 <= Node.val <= 100

Output

Return true if the tree is symmetric, false otherwise.

Example 1

Input

root = [1,2,2,3,4,4,3]

Output

true

Example 2

Input

root = [1,2,2,null,3,null,3]

Output

false

Constraints
1 <= number of nodes <= 1000
-100 <= Node.val <= 100`,

  "Diameter of Binary Tree": `Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root.

The length of a path between two nodes is the number of edges between them.

Input

A binary tree as a level-order array where:

1 <= number of nodes <= 10^4
-100 <= Node.val <= 100

Output

Return the diameter (number of edges in the longest path).

Example 1

Input

root = [1,2,3,4,5]

Output

3

Explanation

The longest path is [4,2,1,3] or [5,2,1,3] with length 3.

Example 2

Input

root = [1,2]

Output

1

Constraints
1 <= number of nodes <= 10^4
-100 <= Node.val <= 100`,

  "Implement Stack using Queues": `Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

Note: For this problem, simulate operations [["push",x],["pop"],["top"],["empty"],...] and return results of pop, top, and empty.

Input

A list of operations where:

1 <= x <= 9
At most 100 calls to push, pop, top, and empty.
All calls to pop and top are valid.

Output

Return results for pop, top, and empty operations.

Example 1

Input

ops = [["push",1],["push",2],["top"],["pop"],["empty"]]

Output

[2,2,false]

Explanation

top() = 2 (last pushed), pop() = 2, empty() = false.

Constraints
1 <= x <= 9
At most 100 calls.`
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    let updated = 0;
    for (const [title, description] of Object.entries(DESCRIPTIONS)) {
      const q = await Question.findOne({ title });
      if (q) {
        q.description = description;
        await q.save();
        console.log(`✅ Updated: ${title}`);
        updated++;
      } else {
        console.log(`❌ Not found: ${title}`);
      }
    }

    console.log(`\nDone! ${updated} "Other" questions updated.`);
  } catch (e) {
    console.error("Error:", e);
  }
  process.exit();
};

run();
