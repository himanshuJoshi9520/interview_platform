import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/question.model.js";
dotenv.config();

const s = (js, py, java, cpp) => ({ javascript: js, python: py, java, cpp });

const more = [
  // Google
  { company:'google', title:'Palindrome Pairs', difficulty:'Hard', description:'Find all pairs (i,j) where words[i]+words[j] is a palindrome.',
    snippets: s('function palindromePairs(words){\n  \n}','def palindromePairs(words):\n    pass','class Solution{\n  public List<List<Integer>> palindromePairs(String[] w){}\n}','class Solution{\npublic:\n  vector<vector<int>> palindromePairs(vector<string>&w){};\n};'),
    testCases:[{input:'[["abcd","dcba","lls","s","sssll"]]',expectedOutput:'[[0,1],[1,0],[3,2],[2,4]]',isHidden:false},{input:'[["bat","tab","cat"]]',expectedOutput:'[[0,1],[1,0]]',isHidden:false},{input:'[["a",""]]',expectedOutput:'[[0,1],[1,0]]',isHidden:true}]
  },
  { company:'google', title:'Longest Common Subsequence', difficulty:'Medium', description:'Return length of longest common subsequence of two strings.',
    snippets: s('function longestCommonSubsequence(a,b){\n  \n}','def longestCommonSubsequence(a,b):\n    pass','class Solution{\n  public int longestCommonSubsequence(String a,String b){}\n}','class Solution{\npublic:\n  int longestCommonSubsequence(string a,string b){};\n};'),
    testCases:[{input:'["abcde","ace"]',expectedOutput:'3',isHidden:false},{input:'["abc","abc"]',expectedOutput:'3',isHidden:false},{input:'["abc","def"]',expectedOutput:'0',isHidden:true},{input:'["bl","yby"]',expectedOutput:'1',isHidden:true}]
  },
  { company:'google', title:'Count Primes', difficulty:'Medium', description:'Count primes less than n using Sieve of Eratosthenes.',
    snippets: s('function countPrimes(n){\n  \n}','def countPrimes(n):\n    pass','class Solution{\n  public int countPrimes(int n){}\n}','class Solution{\npublic:\n  int countPrimes(int n){};\n};'),
    testCases:[{input:'[10]',expectedOutput:'4',isHidden:false},{input:'[0]',expectedOutput:'0',isHidden:false},{input:'[1]',expectedOutput:'0',isHidden:true},{input:'[20]',expectedOutput:'8',isHidden:true}]
  },

  // Amazon
  { company:'amazon', title:'Partition Equal Subset Sum', difficulty:'Medium', description:'Determine if array can be partitioned into two equal-sum subsets.',
    snippets: s('function canPartition(nums){\n  \n}','def canPartition(nums):\n    pass','class Solution{\n  public boolean canPartition(int[] nums){}\n}','class Solution{\npublic:\n  bool canPartition(vector<int>&nums){};\n};'),
    testCases:[{input:'[[1,5,11,5]]',expectedOutput:'true',isHidden:false},{input:'[[1,2,3,5]]',expectedOutput:'false',isHidden:false},{input:'[[1,1]]',expectedOutput:'true',isHidden:true},{input:'[[3,1,1,2,2,1]]',expectedOutput:'true',isHidden:true}]
  },
  { company:'amazon', title:'Longest Consecutive Sequence', difficulty:'Medium', description:'Find length of longest consecutive elements sequence in O(n).',
    snippets: s('function longestConsecutive(nums){\n  \n}','def longestConsecutive(nums):\n    pass','class Solution{\n  public int longestConsecutive(int[] nums){}\n}','class Solution{\npublic:\n  int longestConsecutive(vector<int>&nums){};\n};'),
    testCases:[{input:'[[100,4,200,1,3,2]]',expectedOutput:'4',isHidden:false},{input:'[[0,3,7,2,5,8,4,6,0,1]]',expectedOutput:'9',isHidden:false},{input:'[[1]]',expectedOutput:'1',isHidden:true}]
  },
  { company:'amazon', title:'Rotting Oranges', difficulty:'Medium', description:'Return minimum minutes until no fresh orange remains, or -1.',
    snippets: s('function orangesRotting(grid){\n  \n}','def orangesRotting(grid):\n    pass','class Solution{\n  public int orangesRotting(int[][] grid){}\n}','class Solution{\npublic:\n  int orangesRotting(vector<vector<int>>&grid){};\n};'),
    testCases:[{input:'[[[2,1,1],[1,1,0],[0,1,1]]]',expectedOutput:'4',isHidden:false},{input:'[[[2,1,1],[0,1,1],[1,0,1]]]',expectedOutput:'-1',isHidden:false},{input:'[[[0,2]]]',expectedOutput:'0',isHidden:true}]
  },

  // Microsoft
  { company:'microsoft', title:'All Paths From Source to Target', difficulty:'Medium', description:'Find all paths from node 0 to node n-1 in a DAG.',
    snippets: s('function allPathsSourceTarget(graph){\n  \n}','def allPathsSourceTarget(graph):\n    pass','class Solution{\n  public List<List<Integer>> allPathsSourceTarget(int[][] graph){}\n}','class Solution{\npublic:\n  vector<vector<int>> allPathsSourceTarget(vector<vector<int>>&g){};\n};'),
    testCases:[{input:'[[[1,2],[3],[3],[]]]',expectedOutput:'[[0,1,3],[0,2,3]]',isHidden:false},{input:'[[[4,3,1],[3,2,4],[3],[4],[]]]',expectedOutput:'[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]',isHidden:false}]
  },
  { company:'microsoft', title:'Find Median from Data Stream', difficulty:'Hard', description:'Design a data structure to find the median from a data stream.',
    snippets: s('class MedianFinder{\n  constructor(){}\n  addNum(n){}\n  findMedian(){}\n}','class MedianFinder:\n  def __init__(self):pass\n  def addNum(self,n):pass\n  def findMedian(self):pass','class MedianFinder{\n  public void addNum(int n){}\n  public double findMedian(){}\n}','class MedianFinder{\npublic:\n  void addNum(int n){}\n  double findMedian(){};\n};'),
    testCases:[{input:'[[["add",1],["add",2],["median"],["add",3],["median"]]]',expectedOutput:'[1.5,2.0]',isHidden:false}]
  },
  { company:'microsoft', title:'Minimum Rotations to Open Lock', difficulty:'Medium', description:'Find minimum turns to open a combination lock avoiding deadends.',
    snippets: s('function openLock(deadends,target){\n  \n}','def openLock(deadends,target):\n    pass','class Solution{\n  public int openLock(String[] deadends,String target){}\n}','class Solution{\npublic:\n  int openLock(vector<string>&deadends,string target){};\n};'),
    testCases:[{input:'[["0201","0101","0102","1212","2002"],"0202"]',expectedOutput:'6',isHidden:false},{input:'[["8888"],"0009"]',expectedOutput:'1',isHidden:false},{input:'[["0000"],"8888"]',expectedOutput:'-1',isHidden:true}]
  },

  // Meta
  { company:'meta', title:'Number of Islands II', difficulty:'Hard', description:'Count islands after each addLand operation using Union-Find.',
    snippets: s('function numIslands2(m,n,positions){\n  \n}','def numIslands2(m,n,positions):\n    pass','class Solution{\n  public List<Integer> numIslands2(int m,int n,int[][] positions){}\n}','class Solution{\npublic:\n  vector<int> numIslands2(int m,int n,vector<vector<int>>&positions){};\n};'),
    testCases:[{input:'[3,3,[[0,0],[0,1],[1,2],[2,1]]]',expectedOutput:'[1,1,2,3]',isHidden:false},{input:'[1,1,[[0,0]]]',expectedOutput:'[1]',isHidden:true}]
  },
  { company:'meta', title:'Minimum Window Substring', difficulty:'Hard', description:'Find the minimum window in s that contains all characters of t.',
    snippets: s('function minWindow(s,t){\n  \n}','def minWindow(s,t):\n    pass','class Solution{\n  public String minWindow(String s,String t){}\n}','class Solution{\npublic:\n  string minWindow(string s,string t){};\n};'),
    testCases:[{input:'["ADOBECODEBANC","ABC"]',expectedOutput:'"BANC"',isHidden:false},{input:'["a","a"]',expectedOutput:'"a"',isHidden:false},{input:'["a","aa"]',expectedOutput:'""',isHidden:true}]
  },
  { company:'meta', title:'Kth Largest Element in a Stream', difficulty:'Easy', description:'Design a class to find the kth largest element in a stream.',
    snippets: s('class KthLargest{\n  constructor(k,nums){}\n  add(val){}\n}','class KthLargest:\n  def __init__(self,k,nums):pass\n  def add(self,val):pass','class KthLargest{\n  public KthLargest(int k,int[] nums){}\n  public int add(int val){}\n}','class KthLargest{\npublic:\n  KthLargest(int k,vector<int>&nums){}\n  int add(int val){};\n};'),
    testCases:[{input:'[3,[4,5,8,2],[[add,3],[add,5],[add,10],[add,9],[add,4]]]',expectedOutput:'[4,5,5,8,8]',isHidden:false}]
  },

  // Netflix
  { company:'netflix', title:'Maximum Average Subarray I', difficulty:'Easy', description:'Find the maximum average of a contiguous subarray of length k.',
    snippets: s('function findMaxAverage(nums,k){\n  \n}','def findMaxAverage(nums,k):\n    pass','class Solution{\n  public double findMaxAverage(int[] nums,int k){}\n}','class Solution{\npublic:\n  double findMaxAverage(vector<int>&nums,int k){};\n};'),
    testCases:[{input:'[[1,12,-5,-6,50,3],4]',expectedOutput:'12.75',isHidden:false},{input:'[[5],1]',expectedOutput:'5.0',isHidden:false},{input:'[[0,1,1,3,3],4]',expectedOutput:'2.0',isHidden:true}]
  },
  { company:'netflix', title:'Minimum Size Subarray Sum', difficulty:'Medium', description:'Find the minimal length subarray with sum >= target.',
    snippets: s('function minSubArrayLen(target,nums){\n  \n}','def minSubArrayLen(target,nums):\n    pass','class Solution{\n  public int minSubArrayLen(int target,int[] nums){}\n}','class Solution{\npublic:\n  int minSubArrayLen(int target,vector<int>&nums){};\n};'),
    testCases:[{input:'[7,[2,3,1,2,4,3]]',expectedOutput:'2',isHidden:false},{input:'[4,[1,4,4]]',expectedOutput:'1',isHidden:false},{input:'[11,[1,1,1,1,1,1,1,1]]',expectedOutput:'0',isHidden:true}]
  },

  // Apple
  { company:'apple', title:'Find All Duplicates in an Array', difficulty:'Medium', description:'Find all elements that appear twice in O(n) time and O(1) space.',
    snippets: s('function findDuplicates(nums){\n  \n}','def findDuplicates(nums):\n    pass','class Solution{\n  public List<Integer> findDuplicates(int[] nums){}\n}','class Solution{\npublic:\n  vector<int> findDuplicates(vector<int>&nums){};\n};'),
    testCases:[{input:'[[4,3,2,7,8,2,3,1]]',expectedOutput:'[2,3]',isHidden:false},{input:'[[1,1,2]]',expectedOutput:'[1]',isHidden:false},{input:'[[1]]',expectedOutput:'[]',isHidden:true}]
  },
  { company:'apple', title:'Majority Element II', difficulty:'Medium', description:'Find all elements appearing more than n/3 times.',
    snippets: s('function majorityElement(nums){\n  \n}','def majorityElement(nums):\n    pass','class Solution{\n  public List<Integer> majorityElement(int[] nums){}\n}','class Solution{\npublic:\n  vector<int> majorityElement(vector<int>&nums){};\n};'),
    testCases:[{input:'[[3,2,3]]',expectedOutput:'[3]',isHidden:false},{input:'[[1]]',expectedOutput:'[1]',isHidden:false},{input:'[[1,2]]',expectedOutput:'[1,2]',isHidden:true}]
  },

  // LinkedIn
  { company:'linkedin', title:'Zigzag Conversion', difficulty:'Medium', description:'Convert string to zigzag pattern on given number of rows.',
    snippets: s('function convert(s,rows){\n  \n}','def convert(s,rows):\n    pass','class Solution{\n  public String convert(String s,int numRows){}\n}','class Solution{\npublic:\n  string convert(string s,int numRows){};\n};'),
    testCases:[{input:'["PAYPALISHIRING",3]',expectedOutput:'"PAHNAPLSIIGYIR"',isHidden:false},{input:'["PAYPALISHIRING",4]',expectedOutput:'"PINALSIGYAHRPI"',isHidden:false},{input:'["A",1]',expectedOutput:'"A"',isHidden:true}]
  },
  { company:'linkedin', title:'Minimum Genetic Mutation', difficulty:'Medium', description:'Find minimum mutations to reach endGene from startGene using a gene bank.',
    snippets: s('function minMutation(start,end,bank){\n  \n}','def minMutation(start,end,bank):\n    pass','class Solution{\n  public int minMutation(String s,String e,String[] bank){}\n}','class Solution{\npublic:\n  int minMutation(string s,string e,vector<string>&bank){};\n};'),
    testCases:[{input:'["AACCGGTT","AACCGGTA",["AACCGGTA"]]',expectedOutput:'1',isHidden:false},{input:'["AACCGGTT","AAACGGTA",["AACCGGTA","AACCGCTA","AAACGGTA"]]',expectedOutput:'2',isHidden:false},{input:'["AAAAACCC","AACCCCCC",["AAAACCCC","AAACCCCC","AACCCCCC"]]',expectedOutput:'3',isHidden:true}]
  },

  // Uber
  { company:'uber', title:'Minimum Cost to Connect Points', difficulty:'Medium', description:'Find minimum cost to connect all points using Manhattan distance (MST).',
    snippets: s('function minCostConnectPoints(points){\n  \n}','def minCostConnectPoints(points):\n    pass','class Solution{\n  public int minCostConnectPoints(int[][] points){}\n}','class Solution{\npublic:\n  int minCostConnectPoints(vector<vector<int>>&points){};\n};'),
    testCases:[{input:'[[[0,0],[2,2],[3,10],[5,2],[7,0]]]',expectedOutput:'20',isHidden:false},{input:'[[[3,12],[-2,5],[-4,1]]]',expectedOutput:'18',isHidden:false},{input:'[[[0,0]]]',expectedOutput:'0',isHidden:true}]
  },
  { company:'uber', title:'Check if Two String Arrays are Equivalent', difficulty:'Easy', description:'Check if two string arrays represent the same string.',
    snippets: s('function arrayStringsAreEqual(w1,w2){\n  \n}','def arrayStringsAreEqual(w1,w2):\n    pass','class Solution{\n  public boolean arrayStringsAreEqual(String[] w1,String[] w2){}\n}','class Solution{\npublic:\n  bool arrayStringsAreEqual(vector<string>&w1,vector<string>&w2){};\n};'),
    testCases:[{input:'[["ab","c"],["a","bc"]]',expectedOutput:'true',isHidden:false},{input:'[["a","cb"],["ab","c"]]',expectedOutput:'false',isHidden:false},{input:'[["abc","d","defg"],["abcddefg"]]',expectedOutput:'true',isHidden:true}]
  },

  // Twitter
  { company:'twitter', title:'Random Pick with Weight', difficulty:'Medium', description:'Pick index randomly proportional to its weight.',
    snippets: s('class Solution{\n  constructor(w){}\n  pickIndex(){}\n}','class Solution:\n  def __init__(self,w):pass\n  def pickIndex(self):pass','class Solution{\n  public Solution(int[] w){}\n  public int pickIndex(){}\n}','class Solution{\npublic:\n  Solution(vector<int>&w){}\n  int pickIndex(){};\n};'),
    testCases:[{input:'[[[1]],[["pick"]]]',expectedOutput:'[0]',isHidden:false}]
  },
  { company:'twitter', title:'Longest Turbulent Subarray', difficulty:'Medium', description:'Find the length of the maximum turbulent subarray.',
    snippets: s('function maxTurbulenceSize(arr){\n  \n}','def maxTurbulenceSize(arr):\n    pass','class Solution{\n  public int maxTurbulenceSize(int[] arr){}\n}','class Solution{\npublic:\n  int maxTurbulenceSize(vector<int>&arr){};\n};'),
    testCases:[{input:'[[9,4,2,10,7,8,8,1,9]]',expectedOutput:'5',isHidden:false},{input:'[[4,8,12,16]]',expectedOutput:'2',isHidden:false},{input:'[[100]]',expectedOutput:'1',isHidden:true}]
  },

  // Adobe
  { company:'adobe', title:'Sentence Screen Fitting', difficulty:'Medium', description:'Count how many times a sentence fits on a screen.',
    snippets: s('function wordsTyping(sentence,rows,cols){\n  \n}','def wordsTyping(sentence,rows,cols):\n    pass','class Solution{\n  public int wordsTyping(String[] sentence,int rows,int cols){}\n}','class Solution{\npublic:\n  int wordsTyping(vector<string>&sentence,int rows,int cols){};\n};'),
    testCases:[{input:'[["hello","world"],2,8]',expectedOutput:'1',isHidden:false},{input:'[["a","b","c","d"],4,5]',expectedOutput:'4',isHidden:false},{input:'[["I","had","apple","pie"],4,5]',expectedOutput:'1',isHidden:true}]
  },
  { company:'adobe', title:'Detect Capital', difficulty:'Easy', description:'Check if usage of capitals in a word is correct.',
    snippets: s('function detectCapitalUse(word){\n  \n}','def detectCapitalUse(word):\n    pass','class Solution{\n  public boolean detectCapitalUse(String word){}\n}','class Solution{\npublic:\n  bool detectCapitalUse(string word){};\n};'),
    testCases:[{input:'["USA"]',expectedOutput:'true',isHidden:false},{input:'["FlaG"]',expectedOutput:'false',isHidden:false},{input:'["leetcode"]',expectedOutput:'true',isHidden:true},{input:'["Google"]',expectedOutput:'true',isHidden:true}]
  },

  // Flipkart
  { company:'flipkart', title:'Reverse Nodes in k-Group', difficulty:'Hard', description:'Reverse every k nodes in the linked list.',
    snippets: s('function reverseKGroup(head,k){\n  \n}','def reverseKGroup(head,k):\n    pass','class Solution{\n  public ListNode reverseKGroup(ListNode head,int k){}\n}','class Solution{\npublic:\n  ListNode* reverseKGroup(ListNode* head,int k){};\n};'),
    testCases:[{input:'[[1,2,3,4,5],2]',expectedOutput:'[2,1,4,3,5]',isHidden:false},{input:'[[1,2,3,4,5],3]',expectedOutput:'[3,2,1,4,5]',isHidden:false},{input:'[[1,2,3],1]',expectedOutput:'[1,2,3]',isHidden:true}]
  },
  { company:'flipkart', title:'Maximum Points on a Line', difficulty:'Hard', description:'Return the maximum number of collinear points.',
    snippets: s('function maxPoints(points){\n  \n}','def maxPoints(points):\n    pass','class Solution{\n  public int maxPoints(int[][] points){}\n}','class Solution{\npublic:\n  int maxPoints(vector<vector<int>>&points){};\n};'),
    testCases:[{input:'[[[1,1],[2,2],[3,3]]]',expectedOutput:'3',isHidden:false},{input:'[[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]]',expectedOutput:'4',isHidden:false},{input:'[[[1,1]]]',expectedOutput:'1',isHidden:true}]
  },

  // Other
  { company:'other', title:'Fibonacci Number', difficulty:'Easy', description:'Calculate the nth Fibonacci number.',
    snippets: s('function fib(n){\n  \n}','def fib(n):\n    pass','class Solution{\n  public int fib(int n){}\n}','class Solution{\npublic:\n  int fib(int n){};\n};'),
    testCases:[{input:'[2]',expectedOutput:'1',isHidden:false},{input:'[3]',expectedOutput:'2',isHidden:false},{input:'[10]',expectedOutput:'55',isHidden:true}]
  },
  { company:'other', title:'Palindrome Number', difficulty:'Easy', description:'Determine if an integer is a palindrome without converting to string.',
    snippets: s('function isPalindrome(x){\n  \n}','def isPalindrome(x):\n    pass','class Solution{\n  public boolean isPalindrome(int x){}\n}','class Solution{\npublic:\n  bool isPalindrome(int x){};\n};'),
    testCases:[{input:'[121]',expectedOutput:'true',isHidden:false},{input:'[-121]',expectedOutput:'false',isHidden:false},{input:'[10]',expectedOutput:'false',isHidden:true}]
  },
  { company:'other', title:'Contains Duplicate', difficulty:'Easy', description:'Return true if any value appears at least twice in the array.',
    snippets: s('function containsDuplicate(nums){\n  \n}','def containsDuplicate(nums):\n    pass','class Solution{\n  public boolean containsDuplicate(int[] nums){}\n}','class Solution{\npublic:\n  bool containsDuplicate(vector<int>&nums){};\n};'),
    testCases:[{input:'[[1,2,3,1]]',expectedOutput:'true',isHidden:false},{input:'[[1,2,3,4]]',expectedOutput:'false',isHidden:false},{input:'[[1,1,1,3,3,4,3,2,4,2]]',expectedOutput:'true',isHidden:true}]
  },
  { company:'other', title:'Reverse String', difficulty:'Easy', description:'Reverse a string in-place using two pointers.',
    snippets: s('function reverseString(s){\n  \n}','def reverseString(s):\n    pass','class Solution{\n  public void reverseString(char[] s){}\n}','class Solution{\npublic:\n  void reverseString(vector<char>&s){};\n};'),
    testCases:[{input:'[["h","e","l","l","o"]]',expectedOutput:'["o","l","l","e","h"]',isHidden:false},{input:'[["H","a","n","n","a","h"]]',expectedOutput:'["h","a","n","n","a","H"]',isHidden:false}]
  },
  { company:'other', title:'Majority Element', difficulty:'Easy', description:'Find the element that appears more than n/2 times (Boyer-Moore voting).',
    snippets: s('function majorityElement(nums){\n  \n}','def majorityElement(nums):\n    pass','class Solution{\n  public int majorityElement(int[] nums){}\n}','class Solution{\npublic:\n  int majorityElement(vector<int>&nums){};\n};'),
    testCases:[{input:'[[3,2,3]]',expectedOutput:'3',isHidden:false},{input:'[[2,2,1,1,1,2,2]]',expectedOutput:'2',isHidden:false},{input:'[[1]]',expectedOutput:'1',isHidden:true}]
  },
  { company:'other', title:'Happy Number', difficulty:'Easy', description:'Determine if a number is happy using cycle detection.',
    snippets: s('function isHappy(n){\n  \n}','def isHappy(n):\n    pass','class Solution{\n  public boolean isHappy(int n){}\n}','class Solution{\npublic:\n  bool isHappy(int n){};\n};'),
    testCases:[{input:'[19]',expectedOutput:'true',isHidden:false},{input:'[2]',expectedOutput:'false',isHidden:false},{input:'[1]',expectedOutput:'true',isHidden:true}]
  },
  { company:'other', title:'Plus One', difficulty:'Easy', description:'Increment a large integer represented as an array of digits by one.',
    snippets: s('function plusOne(digits){\n  \n}','def plusOne(digits):\n    pass','class Solution{\n  public int[] plusOne(int[] digits){}\n}','class Solution{\npublic:\n  vector<int> plusOne(vector<int>&digits){};\n};'),
    testCases:[{input:'[[1,2,3]]',expectedOutput:'[1,2,4]',isHidden:false},{input:'[[4,3,2,1]]',expectedOutput:'[4,3,2,2]',isHidden:false},{input:'[[9]]',expectedOutput:'[1,0]',isHidden:true}]
  },
  { company:'other', title:'Symmetric Tree', difficulty:'Easy', description:'Check whether a binary tree is a mirror of itself.',
    snippets: s('function isSymmetric(root){\n  \n}','def isSymmetric(root):\n    pass','class Solution{\n  public boolean isSymmetric(TreeNode root){}\n}','class Solution{\npublic:\n  bool isSymmetric(TreeNode* root){};\n};'),
    testCases:[{input:'[[1,2,2,3,4,4,3]]',expectedOutput:'true',isHidden:false},{input:'[[1,2,2,null,3,null,3]]',expectedOutput:'false',isHidden:false}]
  },
  { company:'other', title:'Invert Binary Tree', difficulty:'Easy', description:'Invert a binary tree.',
    snippets: s('function invertTree(root){\n  \n}','def invertTree(root):\n    pass','class Solution{\n  public TreeNode invertTree(TreeNode root){}\n}','class Solution{\npublic:\n  TreeNode* invertTree(TreeNode* root){};\n};'),
    testCases:[{input:'[[4,2,7,1,3,6,9]]',expectedOutput:'[4,7,2,9,6,3,1]',isHidden:false},{input:'[[2,1,3]]',expectedOutput:'[2,3,1]',isHidden:false}]
  },
  { company:'other', title:'Diameter of Binary Tree', difficulty:'Easy', description:'Find the length of the diameter (longest path between two nodes).',
    snippets: s('function diameterOfBinaryTree(root){\n  \n}','def diameterOfBinaryTree(root):\n    pass','class Solution{\n  public int diameterOfBinaryTree(TreeNode root){}\n}','class Solution{\npublic:\n  int diameterOfBinaryTree(TreeNode* root){};\n};'),
    testCases:[{input:'[[1,2,3,4,5]]',expectedOutput:'3',isHidden:false},{input:'[[1,2]]',expectedOutput:'1',isHidden:false},{input:'[[1]]',expectedOutput:'0',isHidden:true}]
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Connected');
  let added = 0;
  for (const q of more) {
    const exists = await Question.findOne({ title: q.title, company: q.company });
    if (!exists) {
      await Question.create(q);
      console.log(`✅ Added: [${q.company}] ${q.title}`);
      added++;
    } else {
      console.log(`⚠️  Exists: [${q.company}] ${q.title}`);
    }
  }
  console.log(`\nDone! Added ${added} new questions.`);
  process.exit(0);
};

run().catch(e => { console.error(e); process.exit(1); });
