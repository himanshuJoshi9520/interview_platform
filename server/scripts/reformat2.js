import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedFile = path.join(__dirname, '../seed2.js');

let content = fs.readFileSync(seedFile, 'utf8');

// A simpler, more robust replacement that iterates line by line.
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('Input: ')) {
        const remaining = lines[i].slice('Input: '.length);
        lines[i] = `\nInput\n\n${remaining}`;
    }
    else if (lines[i].startsWith('Output: ')) {
        const remaining = lines[i].slice('Output: '.length);
        lines[i] = `\nOutput\n\n${remaining}`;
    }
    else if (lines[i].startsWith('Explanation: ')) {
        const remaining = lines[i].slice('Explanation: '.length);
        lines[i] = `\nExplanation\n\n${remaining}`;
    }
}

// Merge lines back
content = lines.join('\n');

// Clean up redundant newlines if we created more than 2, but just leave them mostly
content = content.replace(/\n{4,}/g, '\n\n\n'); // At most 3 newlines

fs.writeFileSync(seedFile, content);
console.log('Formatted seed2 again');
