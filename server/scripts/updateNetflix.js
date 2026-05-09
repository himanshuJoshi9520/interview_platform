import mongoose from "mongoose";
import Question from "../models/question.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const DESCRIPTIONS = {

  "Rotate Image": `You are given an n x n 2D matrix representing an image. Rotate the image by 90 degrees clockwise.

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. Do not allocate another 2D matrix and do the rotation.

Input

An n x n integer matrix where:

n == matrix.length
n == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000

Output

Return the matrix rotated 90 degrees clockwise (in-place).

Example 1

Input

matrix = [[1,2,3],[4,5,6],[7,8,9]]

Output

[[7,4,1],[8,5,2],[9,6,3]]

Example 2

Input

matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]

Output

[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Explanation

Transpose the matrix first, then reverse each row to achieve 90-degree clockwise rotation.

Constraints
n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000`,

  "Wildcard Matching": `Given an input string s and a pattern p, implement wildcard pattern matching with support for '?' and '*' where:

'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).

The matching should cover the entire input string (not partial).

Input

A string s and a pattern p where:

0 <= s.length, p.length <= 2000
s contains only lowercase English letters.
p contains only lowercase English letters, '?' or '*'.

Output

Return true if the pattern matches the entire string, false otherwise.

Example 1

Input

s = "aa", p = "a"

Output

false

Explanation

"a" does not match the entire string "aa".

Example 2

Input

s = "aa", p = "*"

Output

true

Explanation

'*' matches any sequence.

Example 3

Input

s = "cb", p = "?a"

Output

false

Explanation

'?' matches 'c', but the second character 'b' does not match 'a'.

Constraints
0 <= s.length, p.length <= 2000
s contains only lowercase English letters.
p contains only lowercase English letters, '?' or '*'.`,

  "First Missing Positive": `Given an unsorted integer array nums, return the smallest missing positive integer.

You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.

Input

An integer array nums where:

1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1

Output

Return the smallest missing positive integer.

Example 1

Input

nums = [1,2,0]

Output

3

Explanation

1 and 2 are present, so the smallest missing positive is 3.

Example 2

Input

nums = [3,4,-1,1]

Output

2

Explanation

1 is present. 2 is missing, so return 2.

Example 3

Input

nums = [7,8,9,11,12]

Output

1

Explanation

The smallest missing positive is 1.

Constraints
1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1`,

  "Burst Balloons": `You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.

If you burst the i-th balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds, treat it as if there is a balloon with a 1 painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.

Input

An integer array nums where:

1 <= nums.length <= 300
0 <= nums[i] <= 100

Output

Return the maximum coins you can collect.

Example 1

Input

nums = [3,1,5,8]

Output

167

Explanation

Burst 1 -> coins = 3*1*5 = 15, then 5 -> 3*5*8=120, then 3 -> 3*8*1=24, then 8 -> 1*8*1=8. Total = 167.

Example 2

Input

nums = [1,5]

Output

10

Constraints
1 <= nums.length <= 300
0 <= nums[i] <= 100`,

  "Jump Game III": `Given an array of non-negative integers arr, you are initially positioned at start index. When you are at index i, you can jump to i + arr[i] or i - arr[i].

Check if you can reach any index with value 0.

Input

An integer array arr and integer start where:

1 <= arr.length <= 5 * 10^4
0 <= arr[i] < arr.length
0 <= start < arr.length

Output

Return true if you can reach any index with value 0, false otherwise.

Example 1

Input

arr = [4,2,3,0,3,1,2], start = 5

Output

true

Explanation

Start at index 5: 5 -> 4 -> 1 -> 3 (value 0).

Example 2

Input

arr = [4,2,3,0,3,1,2], start = 0

Output

true

Explanation

Start at index 0: 0 -> 4 -> 1 -> 3 (value 0).

Example 3

Input

arr = [3,0,2,1,2], start = 2

Output

false

Explanation

You cannot reach index 1 (value 0).

Constraints
1 <= arr.length <= 5 * 10^4
0 <= start < arr.length`,

  "Regular Expression Matching": `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' matches any single character.
'*' matches zero or more of the preceding element.

The matching should cover the entire input string.

Input

A string s and a pattern p where:

1 <= s.length <= 20
1 <= p.length <= 30
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.

Output

Return true if the pattern matches the entire string, false otherwise.

Example 1

Input

s = "aa", p = "a"

Output

false

Explanation

"a" does not match the entire string "aa".

Example 2

Input

s = "aa", p = "a*"

Output

true

Explanation

'*' means zero or more 'a's. "a*" matches "aa".

Example 3

Input

s = "ab", p = ".*"

Output

true

Explanation

".*" matches any string ("ab").

Constraints
1 <= s.length <= 20
1 <= p.length <= 30
s contains only lowercase English letters.`,

  "Merge k Sorted Lists": `You are given an array of k linked lists, each list is sorted in ascending order.

Merge all the linked lists into one sorted linked list and return it.

Note: For this problem, each linked list is given as a sorted array. Return the merged sorted array.

Input

An array of sorted arrays where:

k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4

Output

Return the merged sorted array.

Example 1

Input

lists = [[1,4,5],[1,3,4],[2,6]]

Output

[1,1,2,3,4,4,5,6]

Example 2

Input

lists = []

Output

[]

Example 3

Input

lists = [[]]

Output

[]

Constraints
k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4`,

  "Find Duplicate Number": `Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, there is only one repeated number in nums. Return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.

Input

An integer array nums where:

1 <= n <= 10^5
nums.length == n + 1
1 <= nums[i] <= n
All integers in nums appear only once except for precisely one integer which appears two or more times.

Output

Return the duplicate number.

Example 1

Input

nums = [1,3,4,2,2]

Output

2

Example 2

Input

nums = [3,1,3,4,2]

Output

3

Explanation

Use Floyd's Tortoise and Hare (cycle detection) algorithm for O(1) space and O(n) time.

Constraints
1 <= n <= 10^5
nums.length == n + 1
All integers appear once except exactly one.`,

  "Longest Palindromic Subsequence": `Given a string s, find the longest palindromic subsequence's length in s.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

Input

A string s where:

1 <= s.length <= 1000
s consists only of lowercase English letters.

Output

Return the length of the longest palindromic subsequence.

Example 1

Input

s = "bbbab"

Output

4

Explanation

One possible longest palindromic subsequence is "bbbb".

Example 2

Input

s = "cbbd"

Output

2

Explanation

One possible longest palindromic subsequence is "bb".

Constraints
1 <= s.length <= 1000
s consists only of lowercase English letters.`,

  "Decode String": `Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

Input

A string s where:

1 <= s.length <= 30
s consists of lowercase English letters, digits, and square brackets '[]'.
s is guaranteed to be a valid input.
All the integers in s are in the range [1, 300].

Output

Return the decoded string.

Example 1

Input

s = "3[a]2[bc]"

Output

"aaabcbc"

Example 2

Input

s = "3[a2[c]]"

Output

"accaccacc"

Explanation

Inner 2[c] = "cc", so 3[a2[c]] = 3[acc] = "accaccacc".

Example 3

Input

s = "2[abc]3[cd]ef"

Output

"abcabccdcdcdef"

Constraints
1 <= s.length <= 30
s consists of lowercase English letters, digits, and square brackets.`
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

    console.log(`\nDone! ${updated} Netflix questions updated.`);
  } catch (e) {
    console.error("Error:", e);
  }
  process.exit();
};

run();
