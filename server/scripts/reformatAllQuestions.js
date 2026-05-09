import mongoose from "mongoose";
import Question from "../models/question.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * Reformats a question description to the standard long format:
 * - "Input: xyz" becomes "\nInput\n\nxyz"
 * - "Output: xyz" becomes "\nOutput\n\nxyz"
 * - "Explanation: xyz" becomes "\nExplanation\n\nxyz"
 * - "Example N\nInput: ..." becomes "Example N\n\nInput\n\n..."
 */
function reformatDescription(desc) {
  if (!desc) return desc;

  let lines = desc.split('\n');
  let result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match "Example N" standalone line
    if (/^Example \d+$/.test(line.trim())) {
      // Ensure blank line before Example heading
      if (result.length > 0 && result[result.length - 1].trim() !== '') {
        result.push('');
      }
      result.push(line);
      result.push(''); // blank line after Example N
      continue;
    }

    // Match "Input: value..."
    if (/^Input:\s+/.test(line.trim())) {
      const value = line.replace(/^Input:\s+/, '').trim();
      if (result.length > 0 && result[result.length - 1].trim() !== '') result.push('');
      result.push('Input');
      result.push('');
      result.push(value);
      continue;
    }

    // Match "Output: value..."
    if (/^Output:\s+/.test(line.trim())) {
      const value = line.replace(/^Output:\s+/, '').trim();
      if (result.length > 0 && result[result.length - 1].trim() !== '') result.push('');
      result.push('Output');
      result.push('');
      result.push(value);
      continue;
    }

    // Match "Explanation: value..."
    if (/^Explanation:\s+/.test(line.trim())) {
      const value = line.replace(/^Explanation:\s+/, '').trim();
      if (result.length > 0 && result[result.length - 1].trim() !== '') result.push('');
      result.push('Explanation');
      result.push('');
      result.push(value);
      continue;
    }

    result.push(line);
  }

  // Collapse 3+ consecutive blank lines into max 2
  let cleaned = [];
  let blankCount = 0;
  for (const line of result) {
    if (line.trim() === '') {
      blankCount++;
      if (blankCount <= 2) cleaned.push(line);
    } else {
      blankCount = 0;
      cleaned.push(line);
    }
  }

  return cleaned.join('\n');
}

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    const all = await Question.find({});
    console.log(`Found ${all.length} questions. Reformatting...`);

    let updated = 0;
    for (const q of all) {
      const newDesc = reformatDescription(q.description);
      if (newDesc !== q.description) {
        q.description = newDesc;
        await q.save();
        console.log(`✅ Reformatted: ${q.title}`);
        updated++;
      } else {
        console.log(`⏭️  Already OK: ${q.title}`);
      }
    }

    console.log(`\nDone! ${updated} questions updated.`);
  } catch (e) {
    console.error("Error:", e);
  }
  process.exit();
};

run();
