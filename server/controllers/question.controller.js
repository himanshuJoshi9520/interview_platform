import Question from "../models/question.model.js";
import axios from "axios";

export const getQuestionsByCompany = async (req, res) => {
  try {
    const { company } = req.query;
    const companyFilter = company ? company.toLowerCase() : "google";
    const questions = await Question.find({ company: companyFilter });
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions", error: error.message });
  }
};

export const runCode = async (req, res) => {
  const { exec } = await import('child_process');
  const { writeFile, unlink, mkdir } = await import('fs/promises');
  const { join } = await import('path');
  const { tmpdir } = await import('os');

  const { language, code, questionId, runType } = req.body;

  const id = `run_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const dir = join(tmpdir(), id);

  try {
    await mkdir(dir, { recursive: true });
    
    // Fetch test cases
    const Question = (await import('../models/question.model.js')).default;
    let testCases = [];
    if (questionId) {
      const question = await Question.findById(questionId);
      if (question && question.testCases) {
        testCases = (runType === 'submit') 
          ? question.testCases 
          : question.testCases.filter(tc => !tc.isHidden);
      }
    }

    let cmd;
    let filePath;

    if (language === 'javascript') {
      filePath = join(dir, 'main.js');
      let wrapperCode = code;
      if (testCases.length > 0) {
        wrapperCode += `\n
const testCases = ${JSON.stringify(testCases)};
const results = testCases.map((tc, idx) => {
  try {
     const inputs = JSON.parse(tc.input);
     const actual = (Array.isArray(inputs)) ? solve(...inputs) : solve(inputs);
     const actualStr = JSON.stringify(actual);
     const expectedStr = JSON.stringify(JSON.parse(tc.expectedOutput));
     return {
       index: idx,
       passed: actualStr === expectedStr,
       actual: actualStr,
       expected: expectedStr,
       isHidden: tc.isHidden,
       input: tc.input
     };
  } catch(e) {
     return { index: idx, passed: false, error: e.message, isHidden: tc.isHidden, input: tc.input };
  }
});
console.log(JSON.stringify({ isTestResult: true, results }));
        `;
      }
      await writeFile(filePath, wrapperCode);
      cmd = `node "${filePath}"`;

    } else if (language === 'python') {
      filePath = join(dir, 'main.py');
      let wrapperCode = code;
      if (testCases.length > 0) {
        wrapperCode += `\n
import json
testCases = json.loads('${JSON.stringify(testCases).replace(/'/g, "\\'")}')
results = []
for idx, tc in enumerate(testCases):
    try:
        inputs = json.loads(tc['input'])
        actual = solve(*inputs) if isinstance(inputs, list) else solve(inputs)
        actualStr = json.dumps(actual)
        expectedStr = json.dumps(json.loads(tc['expectedOutput']))
        results.append({
            "index": idx,
            "passed": actualStr == expectedStr,
            "actual": actualStr,
            "expected": expectedStr,
            "isHidden": tc.get('isHidden', False),
            "input": tc['input']
        })
    except Exception as e:
        results.append({ "index": idx, "passed": False, "error": str(e), "isHidden": tc.get('isHidden', False), "input": tc.get('input', '') })

print(json.dumps({ "isTestResult": True, "results": results }))
        `;
      }
      await writeFile(filePath, wrapperCode);
      cmd = `python "${filePath}"`;

    } else if (language === 'java') {
      filePath = join(dir, 'Main.java');
      let wrapperCode = code;
      if (testCases.length > 0) {
        wrapperCode = `
import java.util.*;

${code}

public class Main {
    public static String toJsonString(int[] arr) { 
        StringBuilder sb = new StringBuilder("[");
        for(int i=0; i<arr.length; i++) {
            sb.append(arr[i]);
            if(i < arr.length-1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }
    public static String toJsonString(int val) { return String.valueOf(val); }
    public static String toJsonString(String val) { return "\\"" + val + "\\""; }

    public static void main(String[] args) {
        System.out.print("{\\"isTestResult\\":true, \\"results\\":[");
`;
        wrapperCode += testCases.map((tc, idx) => {
            let inputs = JSON.parse(tc.input);
            if (!Array.isArray(inputs)) inputs = [inputs]; // Just in case
            let javaArgs = inputs.map(val => {
               if (typeof val === 'number') return `${val}`;
               if (typeof val === 'string') return `"${val}"`;
               if (Array.isArray(val)) {
                   if (val.length === 0) return `new int[]{}`;
                   const type = typeof val[0] === 'string' ? 'String' : 'int';
                   return `new ${type}[]{${val.map(v => typeof v === 'string' ? `"${v}"` : v).join(',')}}`;
               }
               return `${val}`;
            }).join(", ");
            let expectedStr = JSON.stringify(JSON.parse(tc.expectedOutput)).replace(/"/g, '\\"');
            
            return `
        try {
            var actual = Solution.solve(${javaArgs});
            String actualStr = toJsonString(actual);
            String expectedStr = "${expectedStr}";
            boolean passed = actualStr.equals(expectedStr);
            System.out.print("{\\"index\\":${idx}, \\"passed\\":" + passed + ", \\"actual\\":\\"" + actualStr + "\\", \\"expected\\":\\"" + expectedStr + "\\", \\"input\\":\\"${tc.input.replace(/"/g, '\\"')}\\", \\"isHidden\\":${tc.isHidden?"true":"false"}}");
            ${idx < testCases.length - 1 ? 'System.out.print(",");' : ''}
        } catch(Exception e) {
            System.out.print("{\\"index\\":${idx}, \\"passed\\":false, \\"error\\":\\"" + e.getMessage() + "\\", \\"isHidden\\":${tc.isHidden?"true":"false"}}");
            ${idx < testCases.length - 1 ? 'System.out.print(",");' : ''}
        }
            `;
        }).join("");

        wrapperCode += "\n        System.out.print(\"]}\");\n    }\n}\n";
      }

      await writeFile(filePath, wrapperCode);
      cmd = `javac "${filePath}" && java -cp "${dir}" Main`;

    } else if (language === 'cpp') {
      filePath = join(dir, 'main.cpp');
      
      const cppHeaders = `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <stack>
#include <climits>
using namespace std;

`;

      let wrapperCode;
      if (testCases.length > 0) {
        wrapperCode = cppHeaders + `${code}

// Forward declaration for template recursion
template <typename T> string to_json_string(const vector<T>& vec);

string to_json_string(int val) { return to_string(val); }
string to_json_string(long val) { return to_string(val); }
string to_json_string(long long val) { return to_string(val); }
string to_json_string(double val) { return to_string(val); }
string to_json_string(float val) { return to_string(val); }
string to_json_string(long double val) { return to_string((double)val); }
string to_json_string(bool val) { return val ? "true" : "false"; }
string to_json_string(const string& val) { return "\\"" + val + "\\""; }
string to_json_string(const char* val) { return "\\"" + string(val) + "\\""; }

template <typename T>
string to_json_string(const vector<T>& vec) {
    string res = "[";
    for(size_t i=0; i<vec.size(); ++i) {
        res += to_json_string(vec[i]);
        if(i < vec.size()-1) res += ",";
    }
    res += "]";
    return res;
}

int main() {
    cout << "{\\"isTestResult\\":true, \\"results\\":[" << flush;
`;
        const getCppTypeAndVal = (val) => {
            if (typeof val === 'number') return { type: Number.isInteger(val) ? 'int' : 'double', str: val };
            if (typeof val === 'string') return { type: 'string', str: `"${val}"` };
            if (typeof val === 'boolean') return { type: 'bool', str: val ? 'true' : 'false' };
            if (Array.isArray(val)) {
                if (val.length === 0) return { type: 'vector<int>', str: '{}' };
                const inner = getCppTypeAndVal(val[0]);
                const innerStrs = val.map(v => getCppTypeAndVal(v).str);
                return { type: `vector<${inner.type}>`, str: `{${innerStrs.join(',')}}` };
            }
            return { type: 'auto', str: JSON.stringify(val) };
        };

        wrapperCode += testCases.map((tc, idx) => {
            let inputs = JSON.parse(tc.input);
            if (!Array.isArray(inputs)) inputs = [inputs];
            
            // Generate named variable declarations to avoid rvalue-reference binding
            let varDecls = inputs.map((val, i) => {
               const { type, str } = getCppTypeAndVal(val);
               return `${type} arg${i} = ${str};`;
            });
            let argNames = inputs.map((_, i) => `arg${i}`).join(', ');
            let expectedStr = JSON.stringify(JSON.parse(tc.expectedOutput)).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
            
            return `
    {
        ${varDecls.join('\n        ')}
        try {
            auto actual = solve(${argNames});
            string actualStr = to_json_string(actual);
            string expectedStr = "${expectedStr}";
            bool passed = (actualStr == expectedStr);
            cout << "{\\"index\\":${idx},\\"passed\\":" << (passed?"true":"false") << ",\\"actual\\":\\"" << actualStr << "\\",\\"expected\\":\\"" << expectedStr << "\\",\\"isHidden\\":${tc.isHidden?"true":"false"}}";
            ${idx < testCases.length - 1 ? 'cout << ",";' : ''}
        } catch(const exception& e) {
            cout << "{\\"index\\":${idx},\\"passed\\":false,\\"error\\":\\"" << e.what() << "\\",\\"isHidden\\":${tc.isHidden?"true":"false"}}";
            ${idx < testCases.length - 1 ? 'cout << ",";' : ''}
        } catch(...) {
            cout << "{\\"index\\":${idx},\\"passed\\":false,\\"error\\":\\"Unknown exception\\",\\"isHidden\\":${tc.isHidden?"true":"false"}}";
            ${idx < testCases.length - 1 ? 'cout << ",";' : ''}
        }
    }
            `;
        }).join("");
        
        wrapperCode += "\n    cout << \"]}\" << endl;\n    return 0;\n}\n";
      } else {
        wrapperCode = cppHeaders + `${code}

int main() {
    cout << "No test cases to run." << endl;
    return 0;
}
`;
      }

      await writeFile(filePath, wrapperCode);
      const exePath = join(dir, 'main.exe');
      cmd = `g++ -std=c++17 "${filePath}" -o "${exePath}" && "${exePath}"`;
    } else {
      return res.status(400).json({ output: `Unsupported language: ${language}`, error: true });
    }

    const output = await new Promise((resolve) => {
      exec(cmd, { timeout: 10000, cwd: dir }, (err, stdout, stderr) => {
        resolve(stdout || stderr || (err ? err.message : 'No output.'));
      });
    });

    res.status(200).json({ output, error: false });

  } catch (err) {
    console.error('runCode error:', err.message);
    res.status(500).json({ output: `Server Error: ${err.message}`, error: true });
  } finally {
    // Cleanup temp dir silently
    try {
      const { rm } = await import('fs/promises');
      await rm(dir, { recursive: true, force: true });
    } catch {}
  }
};
