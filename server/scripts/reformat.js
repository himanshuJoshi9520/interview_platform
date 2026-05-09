import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedFile = path.join(__dirname, '../seed2.js');

let content = fs.readFileSync(seedFile, 'utf8');

// The pattern to match is:
// Example 1
// Input: xyz
// Output: xyz
// (Optional) Explanation: xyz

const newContent = content.replace(/Example (\d+)\nInput: (.*?)\nOutput: (.*?)(?=\n\nExample|\n\nConstraints|\n\nExplanation|\n\nFollow-up|`)/g, (match, exNum, inText, outText) => {
    let res = `Example ${exNum}\n\nInput\n\n${inText}\n\nOutput\n\n${outText}`;
    return res;
});

// For Explanation: we also need to replace Explanation: xyz
const finalContent = newContent.replace(/\nExplanation: (.*?)(?=\n\nExample|\n\nConstraints|\n\nExplanation|\n\nFollow-up|`)/g, '\n\nExplanation\n\n$1');

fs.writeFileSync(seedFile, finalContent);
console.log('Formatted seed2.js');
