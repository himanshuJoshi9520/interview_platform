import mongoose from "mongoose";
import Question from "../models/question.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const q = await Question.findOne({ title: { $regex: /Two Sum/i } });
        if(q) {
            q.testCases = [
                { input: "[[2,7,11,15], 9]", expectedOutput: "[0, 1]", isHidden: false },
                { input: "[[3,2,4], 6]", expectedOutput: "[1, 2]", isHidden: false },
                { input: "[[3,3], 6]", expectedOutput: "[0, 1]", isHidden: true }
            ];
            await q.save();
            console.log("Updated Two Sum test cases!");
        } else {
            console.log("Not found Two Sum question.");
            const newQ = new Question({
                title: "Two Sum",
                difficulty: "Easy",
                company: "google",
                description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
                snippets: {
                    javascript: "function solve(nums, target) {\n  \n}",
                    python: "def solve(nums, target):\n    pass",
                    java: "class Solution {\n  public static int[] solve(int[] nums, int target) {\n    return new int[]{};\n  }\n}",
                    cpp: "vector<int> solve(vector<int>& nums, int target) {\n  return {};\n}"
                },
                testCases: [
                    { input: "[[2,7,11,15], 9]", expectedOutput: "[0, 1]", isHidden: false },
                    { input: "[[3,2,4], 6]", expectedOutput: "[1, 2]", isHidden: false },
                    { input: "[[3,3], 6]", expectedOutput: "[0, 1]", isHidden: true }
                ]
            });
            await newQ.save();
            console.log("Created Two Sum question with test cases.");
        }

        const trw = await Question.findOne({ title: { $regex: /Trapping Rain Water/i } });
        if(!trw) {
            const newQ = new Question({
                title: "Trapping Rain Water",
                difficulty: "Hard",
                company: "google",
                description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nExample 1:\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.\n\nExample 2:\nInput: height = [4,2,0,3,2,5]\nOutput: 9\n\nConstraints:\n- n == height.length\n- 1 <= n <= 2 * 10^4\n- 0 <= height[i] <= 10^5",
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
            });
            await newQ.save();
            console.log("Created Trapping Rain Water question.");
        }
    } catch(e) {
        console.error(e);
    }
    process.exit();
}
run();
