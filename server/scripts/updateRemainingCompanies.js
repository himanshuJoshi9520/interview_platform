import mongoose from "mongoose";
import Question from "../models/question.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const DESCRIPTIONS = {

  // =================== APPLE ===================

  "Design Parking System": `Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.

Implement the ParkingSystem class with an addCar method that checks if there is a parking space of that type for the given car. A car can only park in a parking space of its own type.

Note: For this problem, given capacity [big, medium, small] and a list of car types to park, return true/false for each.

Input

Three integers big, medium, small (capacities) and a list of car types [1=big, 2=medium, 3=small].

Output

Return a list of booleans — true if the car was parked, false if no space available.

Example 1

Input

big = 1, medium = 1, small = 0, cars = [1,2,3,1]

Output

[true,true,false,false]

Explanation

Car type 1 (big) parks -> true. Car type 2 (medium) parks -> true. Car type 3 (small), no space -> false. Car type 1 (big), no space left -> false.

Constraints
0 <= big, medium, small <= 1000
carType is 1, 2, or 3
At most 1000 calls to addCar.`,

  "Kth Smallest Element in BST": `Given the root of a binary search tree and an integer k, return the k-th smallest value (1-indexed) of all the values of the nodes in the tree.

Input

A BST given as a level-order array and an integer k where:

1 <= k <= n <= 10^4
0 <= Node.val <= 10^4

Output

Return the k-th smallest element.

Example 1

Input

root = [3,1,4,null,2], k = 1

Output

1

Example 2

Input

root = [5,3,6,2,4,null,null,1], k = 3

Output

3

Explanation

In-order traversal of BST gives sorted values. The k-th element is the answer.

Constraints
1 <= k <= number of nodes <= 10^4
0 <= Node.val <= 10^4`,

  "Diagonal Traverse": `Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

Input

An m x n integer matrix where:

m == mat.length
n == mat[i].length
1 <= m, n <= 10^4
1 <= m * n <= 10^4
-10^5 <= mat[i][j] <= 10^5

Output

Return the elements in diagonal traversal order.

Example 1

Input

mat = [[1,2,3],[4,5,6],[7,8,9]]

Output

[1,2,4,7,5,3,6,8,9]

Example 2

Input

mat = [[1,2],[3,4]]

Output

[1,2,3,4]

Explanation

Traverse diagonals alternating direction — up-right then down-left.

Constraints
1 <= m, n <= 10^4
1 <= m * n <= 10^4`,

  "Surrounded Regions": `Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region. 'O's on the border or connected to border 'O's are never flipped.

Input

An m x n character matrix where:

m == board.length
n == board[i].length
1 <= m, n <= 200
board[i][j] is 'X' or 'O'

Output

Return the board after capturing all surrounded regions.

Example 1

Input

board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

Output

[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

Explanation

The bottom-left 'O' is connected to the border, so it stays. All other 'O's are surrounded and get flipped.

Example 2

Input

board = [["X"]]

Output

[["X"]]

Constraints
1 <= m, n <= 200
board[i][j] is 'X' or 'O'`,

  "Next Permutation": `A permutation of an array of integers is an arrangement of its members into a sequence. The next permutation is the next lexicographically greater permutation of the array.

Given an array of integers nums, find the next permutation in place.

Input

An integer array nums where:

1 <= nums.length <= 100
0 <= nums[i] <= 100

Output

Return the array rearranged to its next permutation (modify in-place and return).

Example 1

Input

nums = [1,2,3]

Output

[1,3,2]

Example 2

Input

nums = [3,2,1]

Output

[1,2,3]

Explanation

The last permutation wraps around to the first (smallest).

Example 3

Input

nums = [1,1,5]

Output

[1,5,1]

Constraints
1 <= nums.length <= 100
0 <= nums[i] <= 100`,

  "Minimum Falling Path Sum": `Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right.

Input

An n x n integer matrix where:

n == matrix.length
n == matrix[i].length
1 <= n <= 100
-100 <= matrix[i][j] <= 100

Output

Return the minimum falling path sum.

Example 1

Input

matrix = [[2,1,3],[6,5,4],[7,8,9]]

Output

13

Explanation

Path: 1 -> 4 -> 8 = 13

Example 2

Input

matrix = [[-19,57],[-40,-5]]

Output

-59

Explanation

Path: -19 -> -40 = -59

Constraints
n == matrix.length == matrix[i].length
1 <= n <= 100
-100 <= matrix[i][j] <= 100`,

  "Swap Nodes in Pairs": `Given a linked list, swap every two adjacent nodes and return its head.

You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).

Note: For this problem, the linked list is given as an array.

Input

An integer array representing a linked list where:

0 <= nodes <= 100
0 <= Node.val <= 100

Output

Return the array after swapping every two adjacent nodes.

Example 1

Input

head = [1,2,3,4]

Output

[2,1,4,3]

Example 2

Input

head = []

Output

[]

Example 3

Input

head = [1]

Output

[1]

Constraints
0 <= number of nodes <= 100
0 <= Node.val <= 100`,

  "Max Area of Island": `You are given an m x n binary matrix grid. An island is a group of 1's connected 4-directionally. Return the maximum area of an island in grid. If there is no island, return 0.

Input

An m x n binary integer matrix where:

m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] is 0 or 1

Output

Return the maximum area of any island.

Example 1

Input

grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]

Output

6

Example 2

Input

grid = [[0,0,0,0,0,0,0,0]]

Output

0

Constraints
m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] is 0 or 1`,

  "Time Based Key-Value Store": `Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Note: For this problem, simulate operations [["set",key,value,timestamp],["get",key,timestamp],...] and return results of get operations.

Input

A list of operations where set stores (key, value, timestamp) and get retrieves the value at the largest timestamp <= given timestamp.

Output

Return a list of results for each get operation ("" if none found).

Example 1

Input

ops = [["set","foo","bar",1],["get","foo",1],["get","foo",3],["set","foo","bar2",4],["get","foo",4],["get","foo",5]]

Output

["bar","bar","bar2","bar2"]

Explanation

get("foo",3) returns "bar" (largest ts <= 3 is 1). get("foo",5) returns "bar2" (largest ts <= 5 is 4).

Constraints
1 <= key.length, value.length <= 100
1 <= timestamp <= 10^7
At most 2 * 10^5 calls to set and get.`,

  "Maximum Binary Tree": `You are given an integer array nums with no duplicates. The maximum binary tree is built recursively: the root is the maximum number, left subtree from elements to its left, right subtree from elements to its right.

Return the root of the maximum binary tree built from nums.

Input

An integer array nums where:

1 <= nums.length <= 1000
0 <= nums[i] <= 1000
All integers in nums are unique.

Output

Return the level-order array representation of the maximum binary tree.

Example 1

Input

nums = [3,2,1,6,0,5]

Output

[6,3,5,null,2,0,null,null,1]

Explanation

6 is root (max). Left: [3,2,1], right: [0,5]. Root of [3,2,1] is 3. Root of [0,5] is 5.

Example 2

Input

nums = [3,2,1]

Output

[3,null,2,null,1]

Constraints
1 <= nums.length <= 1000
0 <= nums[i] <= 1000
All integers are unique.`,

  // =================== LINKEDIN ===================

  "Nested List Weight Sum": `You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists.

The depth of an integer is the number of lists it is inside of. Return the sum of all integers multiplied by their depth.

Input

A nested list given as a string representation where:

1 <= nestedList.length <= 50
The values of integers in the list is in the range [-100, 100].
The maximum depth of any integer is 50.

Output

Return the depth-weighted sum.

Example 1

Input

nestedList = [[1,1],2,[1,1]]

Output

10

Explanation

Four 1's at depth 2, one 2 at depth 1. Sum = 4*2 + 2*1 = 10.

Example 2

Input

nestedList = [1,[4,[6]]]

Output

27

Explanation

1*1 + 4*2 + 6*3 = 27

Constraints
1 <= nestedList.length <= 50
The values are in range [-100, 100].`,

  "Shortest Word Distance": `Given an array of strings wordsDict and two different strings word1 and word2, return the shortest distance between these two words in the list.

Input

An array of strings wordsDict and strings word1, word2 where:

1 <= wordsDict.length <= 3 * 10^4
1 <= wordsDict[i].length <= 10
word1 and word2 are in wordsDict.
word1 != word2

Output

Return the shortest distance (minimum index difference) between word1 and word2.

Example 1

Input

wordsDict = ["practice","makes","perfect","coding","makes"], word1 = "coding", word2 = "practice"

Output

3

Example 2

Input

wordsDict = ["practice","makes","perfect","coding","makes"], word1 = "makes", word2 = "coding"

Output

1

Explanation

"makes" appears at index 1 and 4. "coding" at index 3. Minimum distance = |4-3| = 1.

Constraints
1 <= wordsDict.length <= 3 * 10^4
word1 != word2`,

  "Maximum Product Subarray": `Given an integer array nums, find a subarray that has the largest product, and return the product.

Input

An integer array nums where:

1 <= nums.length <= 2 * 10^4
-10 <= nums[i] <= 10
The product of any subarray of nums is guaranteed to fit in a 32-bit integer.

Output

Return the maximum product of any subarray.

Example 1

Input

nums = [2,3,-2,4]

Output

6

Explanation

[2,3] has the largest product = 6.

Example 2

Input

nums = [-2,0,-1]

Output

0

Explanation

The result cannot be 2 because [-2,-1] is not a subarray.

Constraints
1 <= nums.length <= 2 * 10^4
-10 <= nums[i] <= 10`,

  "Insert Delete GetRandom O(1)": `Implement the RandomizedSet class that supports insert, remove, and getRandom operations, each in average O(1) time.

Note: For this problem, simulate the operations and return results of getRandom calls given a fixed seed.

Input

A list of operations [["insert",val],["remove",val],["getRandom"],...] where:

-2^31 <= val <= 2^31 - 1
At most 2 * 10^5 calls in total.

Output

Return results of getRandom operations (each call returns a random element from the current set).

Example 1

Input

ops = [["insert",1],["remove",2],["insert",2],["getRandom"],["remove",1],["insert",2],["getRandom"]]

Output

[1,2]

Explanation

After inserts of 1 and 2, getRandom returns either; after removing 1, only 2 remains.

Constraints
-2^31 <= val <= 2^31 - 1
At most 2 * 10^5 calls.`,

  "Can Place Flowers": `You have a long flowerbed in which some plots are planted and some are not. Flowers cannot be planted in adjacent plots.

Given an integer array flowerbed containing 0's (empty) and 1's (planted) and an integer n, return true if n new flowers can be planted without violating the no-adjacent rule.

Input

A binary integer array flowerbed and integer n where:

1 <= flowerbed.length <= 2 * 10^4
flowerbed[i] is 0 or 1
0 <= n <= flowerbed.length

Output

Return true if n flowers can be planted, false otherwise.

Example 1

Input

flowerbed = [1,0,0,0,1], n = 1

Output

true

Example 2

Input

flowerbed = [1,0,0,0,1], n = 2

Output

false

Constraints
1 <= flowerbed.length <= 2 * 10^4
flowerbed[i] is 0 or 1
0 <= n <= flowerbed.length`,

  "Find Peak Element": `A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array nums, find a peak element and return its index. If the array contains multiple peaks, return the index of any peak.

You may imagine that nums[-1] = nums[n] = -infinity.

Input

An integer array nums where:

1 <= nums.length <= 1000
-2^31 <= nums[i] <= 2^31 - 1
nums[i] != nums[i+1] for all valid i.

Output

Return the index of any peak element.

Example 1

Input

nums = [1,2,3,1]

Output

2

Explanation

3 is a peak element and index 2 is returned.

Example 2

Input

nums = [1,2,1,3,5,6,4]

Output

5

Explanation

Either index 1 or 5 is a valid peak.

Constraints
1 <= nums.length <= 1000
nums[i] != nums[i+1]`,

  "Second Minimum Node in Binary Tree": `Given a non-empty special binary tree consisting of nodes with non-negative values, where each node has exactly two or zero child nodes. If a node has two children, this node's value <= its children's values.

Find the second minimum value in the set made of all the nodes' values in the whole tree.

If no such second minimum value exists, output -1 instead.

Input

A binary tree as a level-order array where:

1 <= number of nodes <= 25
1 <= Node.val <= 2^31 - 1

Output

Return the second minimum value, or -1 if none.

Example 1

Input

root = [2,2,5,null,null,5,7]

Output

5

Example 2

Input

root = [2,2,2]

Output

-1

Explanation

All nodes have value 2, so there is no second minimum.

Constraints
1 <= number of nodes <= 25
1 <= Node.val <= 2^31 - 1`,

  "Isomorphic Strings": `Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t. All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

Input

Two strings s and t where:

1 <= s.length <= 5 * 10^4
t.length == s.length
s and t consist of any valid ASCII character.

Output

Return true if the strings are isomorphic, false otherwise.

Example 1

Input

s = "egg", t = "add"

Output

true

Example 2

Input

s = "foo", t = "bar"

Output

false

Example 3

Input

s = "paper", t = "title"

Output

true

Constraints
1 <= s.length <= 5 * 10^4
t.length == s.length`,

  // =================== TWITTER ===================

  "Number of Recent Calls": `You have a RecentCounter class which counts the number of recent requests within a certain time frame.

Implement the ping(t) method which adds a new request at time t (in milliseconds), and returns the number of requests that have happened in the past 3000 milliseconds (including the current request). So only requests in the range [t - 3000, t] count.

Note: For this problem, given a list of ping timestamps, return the result for each ping.

Input

A list of integers t representing ping timestamps (strictly increasing).

Output

Return a list of counts for each ping call.

Example 1

Input

pings = [1,100,3001,3002]

Output

[1,2,3,3]

Explanation

ping(1) -> [1,1] has 1 request. ping(100) -> [1,100] has 2. ping(3001) -> [1,3001] has 3. ping(3002) -> [2,3002] has 3.

Constraints
1 <= t <= 10^9
Each test case will call ping with strictly increasing values of t.
At most 10^4 calls to ping.`,

  "Top K Frequent Words": `Given an array of strings words and an integer k, return the k most frequent strings.

Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

Input

A string array words and integer k where:

1 <= words.length <= 500
1 <= words[i].length <= 10
words[i] consists of lowercase English letters.
k is in the range [1, the number of unique words[i]].

Output

Return the k most frequent words in sorted order.

Example 1

Input

words = ["i","love","leetcode","i","love","coding"], k = 2

Output

["i","love"]

Example 2

Input

words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4

Output

["the","is","sunny","day"]

Explanation

"the" appears 4 times, "is" 3 times, "sunny" 2 times, "day" 1 time.

Constraints
1 <= words.length <= 500
1 <= k <= number of unique words`,

  "Design Twitter": `Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user's news feed.

Note: For this problem, simulate [["postTweet",userId,tweetId],["getNewsFeed",userId],["follow",followerId,followeeId],["unfollow",...]] and return results of getNewsFeed.

Input

A list of operations on the Twitter system.

Output

Return a list of results for each getNewsFeed call (up to 10 most recent tweet IDs).

Example 1

Input

ops = [["postTweet",1,5],["getNewsFeed",1],["follow",1,2],["postTweet",2,6],["getNewsFeed",1],["unfollow",1,2],["getNewsFeed",1]]

Output

[[5],[6,5],[5]]

Explanation

User 1 posts tweet 5. After following user 2 who posts 6, feed shows [6,5]. After unfollow, feed shows [5].

Constraints
1 <= userId, followerId, followeeId <= 500
0 <= tweetId <= 10^4
At most 3 * 10^4 calls.`,

  "Find the Difference": `You are given two strings s and t. t is generated by random shuffling string s and then adding one more letter at a random position.

Return the letter that was added to t.

Input

Two strings s and t where:

0 <= s.length <= 1000
t.length == s.length + 1
s and t consist of lowercase English letters.

Output

Return the extra character added to t.

Example 1

Input

s = "abcd", t = "abcde"

Output

"e"

Explanation

'e' is the letter added.

Example 2

Input

s = "", t = "y"

Output

"y"

Constraints
0 <= s.length <= 1000
t.length == s.length + 1`,

  "Palindrome Pairs": `Given a 0-indexed array of unique strings words, return all the pairs of the distinct indices (i, j) in the given list, so that the concatenation of the two words words[i] + words[j] is a palindrome.

Input

A string array words where:

1 <= words.length <= 5000
0 <= words[i].length <= 300
words[i] consists of lowercase English letters.

Output

Return all pairs [i, j] such that words[i] + words[j] is a palindrome.

Example 1

Input

words = ["abcd","dcba","lls","s","sssll"]

Output

[[0,1],[1,0],[3,2],[2,4]]

Example 2

Input

words = ["bat","tab","cat"]

Output

[[0,1],[1,0]]

Constraints
1 <= words.length <= 5000
0 <= words[i].length <= 300`,

  "Rank Teams by Votes": `In a special ranking system, each voter gives a rank from highest to lowest to all teams. The ordering of teams is decided by who received the most first-position votes. If tied, consider second-position votes, and so on.

Given an array of strings votes, return a string of all teams sorted by the ranking system.

Input

A string array votes where:

1 <= votes.length <= 1000
1 <= votes[i].length <= 26
votes[i].length == votes[0].length

Output

Return the ranking of teams as a single string.

Example 1

Input

votes = ["ABC","ACB","ABC","ACB","ACB"]

Output

"ACB"

Explanation

A has 5 first-place votes. C has 3 second-place votes vs B's 2 second-place votes.

Example 2

Input

votes = ["WXYZ","XYZW"]

Output

"XWYZ"

Constraints
1 <= votes.length <= 1000
votes[i].length == votes[0].length`,

  "Stream of Characters": `Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string in a given array of words.

Note: For this problem, given a string of characters and a word list, return the index of each character at which a suffix matches any word in the list (or -1 if none).

Input

A list of words and a string stream of characters where:

1 <= words.length <= 2000
1 <= words[i].length <= 2000
stream consists of lowercase English letters.

Output

Return a list of booleans — true if any word in the list is a suffix at that stream position, false otherwise.

Example 1

Input

words = ["cd","f","kl"], stream = "abcdefgklop"

Output

[false,false,false,false,true,false,true,false,true,false,false]

Constraints
1 <= words.length <= 2000
1 <= words[i].length <= 2000`,

  // =================== ADOBE ===================

  "Image Smoother": `An image smoother is a filter of the size 3 x 3 that can be applied to each cell of an image by rounding down the average of the cell and the eight surrounding cells.

Given an m x n integer matrix img representing the grayscale of an image, return the image after applying the smoother on every cell of it.

Input

An m x n integer matrix img where:

m == img.length
n == img[i].length
1 <= m, n <= 200
0 <= img[i][j] <= 255

Output

Return the smoothed image matrix.

Example 1

Input

img = [[1,1,1],[1,0,1],[1,1,1]]

Output

[[0,0,0],[0,0,0],[0,0,0]]

Explanation

Each cell averages its neighbors including itself. The center cell: (1+1+1+1+0+1+1+1+1)/9 = 8/9 = 0 (floor).

Example 2

Input

img = [[100,200,100],[200,50,200],[100,200,100]]

Output

[[137,141,137],[141,138,141],[137,141,137]]

Constraints
m == img.length, n == img[i].length
1 <= m, n <= 200
0 <= img[i][j] <= 255`,

  "Sparse Matrix Multiplication": `Given two sparse matrices mat1 of size m x k and mat2 of size k x n, return the result of mat1 x mat2.

You may assume that multiplication is always possible.

Input

Two 2D integer matrices mat1 (m x k) and mat2 (k x n) where:

m == mat1.length
k == mat1[i].length == mat2.length
n == mat2[i].length
1 <= m, k, n <= 100
-100 <= mat1[i][j], mat2[i][j] <= 100

Output

Return the product matrix of size m x n.

Example 1

Input

mat1 = [[1,0,0],[-1,0,3]], mat2 = [[7,0,0],[0,0,0],[0,0,1]]

Output

[[7,0,0],[-7,0,3]]

Example 2

Input

mat1 = [[0]], mat2 = [[0]]

Output

[[0]]

Constraints
1 <= m, k, n <= 100
-100 <= mat1[i][j], mat2[i][j] <= 100`,

  "Bold Words in String": `Given a string s and an array of strings words, return the string with all substrings that match any word in words wrapped in bold tags <b> and </b>.

If two such substrings overlap, they should be wrapped together. If two substrings are consecutive, they should also be wrapped together.

Input

A string s and a list of words where:

1 <= s.length <= 1000
0 <= words.length <= 100
1 <= words[i].length <= 1000

Output

Return the string with matching substrings bolded.

Example 1

Input

s = "abcxyz123", words = ["abc","123"]

Output

"<b>abc</b>xyz<b>123</b>"

Example 2

Input

s = "aaabbb", words = ["aa","b"]

Output

"<b>aaabbb</b>"

Constraints
1 <= s.length <= 1000
words[i] consists of lowercase English letters.`,

  "24 Game": `You are given an integer array cards of length 4. You have four cards, each containing a number from 1 to 9. You should use basic arithmetic operations (+, -, *, /) and parentheses to get the value 24.

Return true if you can get the value 24 from the four cards, false otherwise.

Input

An integer array cards of length 4 where:

cards.length == 4
1 <= cards[i] <= 9

Output

Return true if 24 can be reached, false otherwise.

Example 1

Input

cards = [4,1,8,7]

Output

true

Explanation

(8-4) * (7-1) = 24

Example 2

Input

cards = [1,2,1,2]

Output

false

Constraints
cards.length == 4
1 <= cards[i] <= 9`,

  "Rectangle Area": `Given the coordinates of two rectilinear rectangles in a 2D plane, return the total area covered by the two rectangles.

The first rectangle is defined by its bottom-left corner (ax1, ay1) and top-right corner (ax2, ay2).
The second rectangle is defined by its bottom-left corner (bx1, by1) and top-right corner (bx2, by2).

Input

Six integers ax1, ay1, ax2, ay2, bx1, by1, bx2, by2 where:

-10^4 <= ax1 <= ax2 <= 10^4
-10^4 <= ay1 <= ay2 <= 10^4
-10^4 <= bx1 <= bx2 <= 10^4
-10^4 <= by1 <= by2 <= 10^4

Output

Return the total area covered by both rectangles.

Example 1

Input

ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2

Output

45

Example 2

Input

ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2

Output

16

Constraints
-10^4 <= coordinates <= 10^4`,

  "Confusing Number": `A confusing number is a number where if you rotate it 180 degrees, it becomes a different valid number. Each digit transforms: 0->0, 1->1, 6->9, 8->8, 9->6. Digits 2, 3, 4, 5, 7 are invalid after rotation.

Given an integer n, return true if it is a confusing number, false otherwise.

Input

An integer n where:

0 <= n <= 10^9

Output

Return true if n is a confusing number (valid after 180 rotation but different value), false otherwise.

Example 1

Input

n = 6

Output

true

Explanation

6 rotated 180 degrees becomes 9, which is a valid and different number.

Example 2

Input

n = 89

Output

true

Explanation

89 becomes 68, which is valid and different.

Example 3

Input

n = 11

Output

false

Explanation

11 rotated is still 11, same number.

Constraints
0 <= n <= 10^9`,

  "Max Points on a Line": `Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.

Input

An array of points where:

1 <= points.length <= 300
points[i].length == 2
-10^4 <= xi, yi <= 10^4
All points are unique.

Output

Return the maximum number of points on a single line.

Example 1

Input

points = [[1,1],[2,2],[3,3]]

Output

3

Example 2

Input

points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]

Output

4

Explanation

The line through [1,1],[3,2],[5,3] passes through 3 points. The line through [1,4],[2,3],[3,2],[4,1] has 4 points.

Constraints
1 <= points.length <= 300
All points are unique.`,

  // =================== FLIPKART ===================

  "Minimum Cost to Hire K Workers": `There are n workers. You are given two integer arrays quality and wage where quality[i] and wage[i] are the quality and minimum wage expectation for the i-th worker.

We want to hire exactly k workers to form a paid group. To hire a group, pay each worker in the group at least their minimum wage expectation. If a worker is hired, their pay must be proportional to their quality relative to other workers in the group.

Return the least amount of money needed to form a paid group satisfying the above conditions.

Input

Integer arrays quality and wage, and integer k where:

n == quality.length == wage.length
1 <= k <= n <= 10^4
1 <= quality[i], wage[i] <= 10^4

Output

Return the minimum cost (as a floating point) to hire k workers.

Example 1

Input

quality = [10,20,5], wage = [70,50,30], k = 2

Output

105.00000

Explanation

Hire workers 0 and 2 at $70 and $35: total = $105.

Example 2

Input

quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3

Output

30.66667

Constraints
n == quality.length == wage.length
1 <= k <= n <= 10^4`,

  "Find if Path Exists in Graph": `There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1. Given a 2D integer array edges where edges[i] = [ui, vi] indicates there is an undirected edge, and two integers source and destination, return true if there is a valid path from source to destination, or false otherwise.

Input

An integer n, list of edges, integer source, and integer destination where:

1 <= n <= 2 * 10^5
0 <= edges.length <= 2 * 10^5
0 <= source, destination < n

Output

Return true if a path exists, false otherwise.

Example 1

Input

n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2

Output

true

Example 2

Input

n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5

Output

false

Constraints
1 <= n <= 2 * 10^5
0 <= edges.length <= 2 * 10^5`,

  "Count Good Nodes in Binary Tree": `Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X's value.

Return the number of good nodes in the binary tree.

Input

A binary tree given as a level-order array where:

1 <= number of nodes <= 10^5
-10^4 <= Node.val <= 10^4

Output

Return the count of good nodes.

Example 1

Input

root = [3,1,4,3,null,1,5]

Output

4

Explanation

Good nodes: root(3), 4, 3 (left child of 1, path max is 3), 5 (path max is 4).

Example 2

Input

root = [3,3,null,4,2]

Output

3

Explanation

Good nodes: root(3), 3 (left child), 4.

Constraints
1 <= number of nodes <= 10^5
-10^4 <= Node.val <= 10^4`,

  "Minimum Number of Arrows to Burst Balloons": `There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend].

An arrow shot vertically at x will burst any balloon where xstart <= x <= xend. Return the minimum number of arrows needed to burst all balloons.

Input

A 2D array points where:

1 <= points.length <= 10^5
points[i].length == 2
-2^31 <= xstart <= xend <= 2^31 - 1

Output

Return the minimum number of arrows to burst all balloons.

Example 1

Input

points = [[10,16],[2,8],[1,6],[7,12]]

Output

2

Explanation

Shoot at x=6 (bursts [2,8] and [1,6]) and at x=11 (bursts [10,16] and [7,12]).

Example 2

Input

points = [[1,2],[3,4],[5,6],[7,8]]

Output

4

Example 3

Input

points = [[1,2],[2,3],[3,4],[4,5]]

Output

2

Constraints
1 <= points.length <= 10^5`,

  "Sell Diminishing-Valued Colored Balls": `You have an inventory of different colored balls, and there is a customer that wants orders balls of any color. The customer weirdly values the colored balls: the price of selling the i-th ball of the same color is the value of the last ball sold of that color minus 1.

Given an integer array inventory where inventory[i] represents the number of balls of the i-th color, and an integer orders (total balls to sell), return the maximum total value.

Input

An integer array inventory and integer orders where:

1 <= inventory.length <= 10^5
1 <= inventory[i] <= 10^9
1 <= orders <= min(sum(inventory[i]), 10^9)

Output

Return the maximum total value modulo 10^9 + 7.

Example 1

Input

inventory = [2,5], orders = 4

Output

14

Explanation

Sell balls in order: 5,4,3,5 -> total = 5+4+3+2 = 14... actually sell optimally.

Example 2

Input

inventory = [3,5], orders = 6

Output

19

Constraints
1 <= inventory.length <= 10^5
1 <= orders <= 10^9`,

  "Jump Game IV": `Given an array of integers arr, you start at the 0-th index. In one step from index i, you can go to: i + 1, i - 1, or j where arr[i] == arr[j] and i != j.

Return the minimum number of steps to reach the last index.

Input

An integer array arr where:

1 <= arr.length <= 5 * 10^4
-10^8 <= arr[i] <= 10^8

Output

Return the minimum number of steps to reach the last index.

Example 1

Input

arr = [100,-23,-23,404,100,23,23,23,3,404]

Output

3

Explanation

0 -> 4 (both are 100) -> 3 (both are 404 at steps 4 and 9, but index 3 has 404!) -> 9. Steps: 3.

Example 2

Input

arr = [7]

Output

0

Explanation

Already at last index.

Example 3

Input

arr = [7,6,9,6,9,6,9,7]

Output

1

Constraints
1 <= arr.length <= 5 * 10^4
-10^8 <= arr[i] <= 10^8`,

  "Max Stack": `Design a max stack data structure that supports the stack operations and supports finding the stack's maximum element.

Note: For this problem, simulate operations [["push",x],["top"],["peekMax"],["popMax"],["pop"],...] and return results of top, peekMax, popMax, and pop calls.

Input

A list of operations where:

-10^7 <= x <= 10^7
At most 10^4 calls will be made to push, pop, top, peekMax, and popMax.

Output

Return a list of results for each non-push operation.

Example 1

Input

ops = [["push",5],["push",1],["push",5],["top"],["popMax"],["top"],["peekMax"],["pop"],["top"]]

Output

[5,5,1,5,1,5]

Explanation

After pushes [5,1,5]: top=5, popMax removes top 5, top=1, peekMax=5, pop removes 1, top=5.

Constraints
-10^7 <= x <= 10^7
At most 10^4 calls.`,

  // =================== UBER ===================

  "Rearrange String k Distance Apart": `Given a string s and an integer k, rearrange s such that the same characters are at least k distance apart. If it is not possible to rearrange the string, return an empty string "".

Input

A string s and integer k where:

1 <= s.length <= 3 * 10^5
s consists of lowercase English letters.
0 <= k <= s.length

Output

Return the rearranged string, or "" if impossible.

Example 1

Input

s = "aabbcc", k = 3

Output

"abcabc"

Example 2

Input

s = "aaabc", k = 3

Output

""

Explanation

It's not possible to rearrange 'a','a','a' with at least 3 distance apart.

Example 3

Input

s = "aaadbbcc", k = 2

Output

"abacabcd"

Constraints
1 <= s.length <= 3 * 10^5
s consists of lowercase English letters.`,

  "Verifying an Alien Dictionary": `In an alien language, the alphabet letters are in a different order. Given a list of words sorted lexicographically in the alien language, and the order of the alphabet, return true if words are sorted correctly, false otherwise.

Input

A list of strings words and a string order where:

1 <= words.length <= 100
1 <= words[i].length <= 20
order.length == 26
All characters in words[i] and order are lowercase English letters.

Output

Return true if words are sorted in the alien alphabet order.

Example 1

Input

words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"

Output

true

Example 2

Input

words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"

Output

false

Explanation

"world" comes before "word" in this ordering since 'l' < 'd' by the alien order.

Example 3

Input

words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"

Output

false

Constraints
1 <= words.length <= 100
1 <= words[i].length <= 20`,

  "Reorganize String": `Given a string s, rearrange the characters of s so that any two adjacent characters are not the same. Return any possible rearrangement of s or return "" if not possible.

Input

A string s where:

1 <= s.length <= 500
s consists of lowercase English letters.

Output

Return a rearranged string with no two adjacent characters the same, or "" if impossible.

Example 1

Input

s = "aab"

Output

"aba"

Example 2

Input

s = "aaab"

Output

""

Constraints
1 <= s.length <= 500
s consists of lowercase English letters.`,

  "Increasing Triplet Subsequence": `Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exist, return false.

Input

An integer array nums where:

1 <= nums.length <= 5 * 10^5
-2^31 <= nums[i] <= 2^31 - 1

Output

Return true if an increasing triplet subsequence exists, false otherwise.

Example 1

Input

nums = [1,2,3,4,5]

Output

true

Explanation

Any triplet with increasing indices works, like (1,2,3).

Example 2

Input

nums = [5,4,3,2,1]

Output

false

Example 3

Input

nums = [2,1,5,0,4,6]

Output

true

Explanation

Triplet (0,4,6) works since 0 < 4 < 6.

Constraints
1 <= nums.length <= 5 * 10^5`,

  "Optimal Account Balancing": `You have a list of transactions between a group of people. Each transaction is represented as [from, to, amount]. Return the minimum number of transactions to settle the debts.

Input

A list of transactions [from, to, amount] where:

1 <= transactions.length <= 8
0 <= from, to <= 20
1 <= amount <= 100

Output

Return the minimum number of transactions to complete settlement.

Example 1

Input

transactions = [[0,1,10],[2,0,5]]

Output

2

Explanation

Person 0 owes person 1 $10. Person 2 owes person 0 $5. Settle: 0->1 $10, 2->0 $5. 2 transactions.

Example 2

Input

transactions = [[0,1,10],[1,0,1],[1,2,5],[2,0,5]]

Output

1

Explanation

Person 1 is owed 10 and owes 1+5=6, so net = 4. Can settle with 1 transaction.

Constraints
1 <= transactions.length <= 8
0 <= from, to <= 20`,

  "Path Sum II": `Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of the node values in the path equals targetSum.

Input

A binary tree as a level-order array and integer targetSum where:

0 <= number of nodes <= 5000
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000

Output

Return all root-to-leaf paths (as arrays of node values) that sum to targetSum.

Example 1

Input

root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22

Output

[[5,4,11,2],[5,8,4,5]]

Example 2

Input

root = [1,2,3], targetSum = 5

Output

[]

Example 3

Input

root = [1,2], targetSum = 0

Output

[]

Constraints
0 <= number of nodes <= 5000
-1000 <= targetSum <= 1000`,

  "String Compression": `Given an array of characters chars, compress it using the following algorithm: Begin with an empty string s. For each group of consecutive repeating characters in chars, append the character, and if the group's length > 1, append the group's length.

The compressed string should not be returned separately, but instead, be stored in the input character array chars. Return the new length of the array.

Input

A character array chars where:

1 <= chars.length <= 2000
chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.

Output

Return the new length after in-place compression.

Example 1

Input

chars = ["a","a","b","b","c","c","c"]

Output

6

Explanation

Compressed: ["a","2","b","2","c","3"] has length 6.

Example 2

Input

chars = ["a"]

Output

1

Example 3

Input

chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]

Output

4

Explanation

Compressed: ["a","b","1","2"] has length 4.

Constraints
1 <= chars.length <= 2000`,

  "Sum Root to Leaf Numbers": `You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number. Return the total sum of all root-to-leaf numbers.

Input

A binary tree as a level-order array where:

1 <= number of nodes <= 1000
0 <= Node.val <= 9
The depth of the tree will not exceed 10.

Output

Return the total sum of all root-to-leaf numbers.

Example 1

Input

root = [1,2,3]

Output

25

Explanation

The root-to-leaf path 1->2 represents the number 12. Path 1->3 represents 13. Sum = 12 + 13 = 25.

Example 2

Input

root = [4,9,0,5,1]

Output

1026

Explanation

Path 4->9->5 = 495, path 4->9->1 = 491, path 4->0 = 40. Sum = 495 + 491 + 40 = 1026.

Constraints
1 <= number of nodes <= 1000
0 <= Node.val <= 9`
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

    console.log(`\nDone! ${updated} questions updated.`);
  } catch (e) {
    console.error("Error:", e);
  }
  process.exit();
};

run();
