import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.service.js";
import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";
import mammoth from "mammoth";

// Resume keyword check — must contain at least 2 of these to be considered a resume
const RESUME_KEYWORDS = [
  'experience', 'education', 'skills', 'project', 'work', 'employment',
  'university', 'college', 'degree', 'internship', 'certification',
  'objective', 'summary', 'profile', 'achievement', 'responsibility',
  'developer', 'engineer', 'resume', 'cv', 'curriculum', 'vitae', 'linkedin'
];

const isLikelyResume = (text) => {
  const lower = text.toLowerCase();
  const matchCount = RESUME_KEYWORDS.filter(kw => lower.includes(kw)).length;
  return matchCount >= 2;
};

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume required" });
    }
    const filepath = req.file.path;
    const mimetype = req.file.mimetype;
    let resumeText = "";

    if (mimetype === 'application/pdf') {
      // PDF extraction
      const fileBuffer = await fs.promises.readFile(filepath);
      const uint8Array = new Uint8Array(fileBuffer);
      const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        resumeText += content.items.map(item => item.str).join(" ") + "\n";
      }
    } else {
      // DOCX / DOC extraction using mammoth
      const result = await mammoth.extractRawText({ path: filepath });
      resumeText = result.value;
    }

    resumeText = resumeText.replace(/\s+/g, " ").trim();

    // Validate it looks like a resume
    if (!isLikelyResume(resumeText)) {
      fs.unlinkSync(filepath);
      return res.status(400).json({
        message: "The uploaded file doesn't appear to be a resume. Please upload a valid resume containing your experience, skills, education, or projects."
      });
    }

    const messages = [
      {
        role: "system",
        content: `
Extract structured data from resume.

First, determine if the provided text is actually a resume. If it is NOT a resume (e.g., just random text, a generic article, etc.), set "isResume" to false and you can leave other fields empty.

Strict rules for "name" extraction:
- Extract the candidate's full name as it appears at the top of the resume.
- If you cannot find a clear name, set "name" to an empty string "".

Strict rules for "role" extraction:
- DO NOT use degree names or student titles (e.g. "B.Tech Student", "Computer Science Student").
- If the candidate is a student or fresher, deduce their target job role based on their skills and projects (e.g. "Full Stack Developer", "Frontend Developer", "Machine Learning Engineer").
- If you absolutely cannot decide a specific technical role, use exactly "Graduate Trainee".

Strict rules for "experience" extraction:
- If they have no work experience (only academic projects), set experience to exactly "0".
- If they ONLY have internship experience, calculate the total duration and set experience to "Intern for X months" (replace X with the number of months).
- For full-time roles, extract the total years of experience as a number string (e.g. "1", "2", "5+").

Return strictly JSON:

{
  "isResume": boolean,
  "name": "string",
  "role": "string",
  "experience": "string",
  "workExperience": [
    {
      "role": "string",
      "company": "string",
      "duration": "string",
      "responsibilities": ["resp1", "resp2"]
    }
  ],
  "projects": ["project1", "project2"],
  "skills": ["skill1", "skill2"]
}
`
      },
      {
        role: "user",
        content: resumeText
      }
    ];


    const aiResponse = await askAi(messages)

    const parsed = JSON.parse(aiResponse);

    fs.unlinkSync(filepath)

    if (parsed.isResume === false) {
      return res.status(400).json({
        message: "The uploaded file doesn't appear to be a resume. Please upload a valid resume."
      });
    }


    res.json({
      name: parsed.name || "",
      role: parsed.role,
      experience: parsed.experience,
      workExperience: parsed.workExperience || [],
      projects: parsed.projects || [],
      skills: parsed.skills || [],
      resumeText
    });

  } catch (error) {
    console.error(error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ message: error.message });
  }
};


export const generateQuestion = async (req, res) => {
  try {
    let { role, experience, mode, resumeText, projects, skills, candidateName } = req.body

    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if (!role || !experience || !mode) {
      return res.status(400).json({ message: "Role, Experience and Mode are required." })
    }

    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    if (user.credits < 50) {
      return res.status(400).json({
        message: "Not enough credits. Minimum 50 required."
      });
    }

    const projectText = Array.isArray(projects) && projects.length
      ? projects.join(", ")
      : "None";

    const skillsText = Array.isArray(skills) && skills.length
      ? skills.join(", ")
      : "None";

    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
    Role:${role}
    Experience:${experience}
    InterviewMode:${mode}
    Projects:${projectText}
    Skills:${skillsText},
    Resume:${safeResume}
    `;

    if (!userPrompt.trim()) {
      return res.status(400).json({
        message: "Prompt content is empty."
      });
    }

    const messages = [

      {
        role: "system",
        content: `
You are a real human interviewer conducting a professional interview.

Speak in simple, natural English as if you are directly talking to the candidate.

Generate exactly 1 initial interview question to start the conversation.
This should be a welcoming question asking them to introduce themselves and maybe touching upon their experience.

Strict Rules:
- The question must contain between 15 and 30 words.
- The question must be a single complete sentence.
- Do NOT add explanations or extra text.
- Keep language simple, conversational, and welcoming.

CRITICAL INSTRUCTION:
Make the question based strictly on the candidate’s USER-SELECTED Role and Experience.
Use the candidate's Projects, Skills, and Resume details ONLY as supporting context. The difficulty and topic MUST align with the User-Selected Role and Experience level.
`
      }
      ,
      {
        role: "user",
        content: userPrompt
      }
    ];


    const aiResponse = await askAi(messages)

    if (!aiResponse || !aiResponse.trim()) {
           
      return res.status(500).json({
        message: "AI returned empty response."
      });

    }

    const firstQuestion = aiResponse.trim();

    if (!firstQuestion) {
      
      return res.status(500).json({
        message: "AI failed to generate question."
      });
    }

    user.credits -= 50;
    await user.save();

    const interview = await Interview.create({
      userId: user._id,
      role,
      experience,
      mode,
      resumeText: safeResume,
      questions: [{
        question: firstQuestion,
        difficulty: "easy",
        timeLimit: 50,
      }]
    })

    res.json({
      interviewId: interview._id,
      creditsLeft: user.credits,
      userName: (candidateName && candidateName.trim()) ? candidateName.trim() : user.name,
      questions: interview.questions
    });
  } catch (error) {
    return res.status(500).json({message:`failed to create interview ${error}`})
  }
}


export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, timeTaken, isSkipped } = req.body

    const interview = await Interview.findById(interviewId)
    const question = interview.questions[questionIndex]

    let finalAnswer = answer || "";
    if (isSkipped) {
      finalAnswer = "[The user explicitly skipped this question. Give brief neutral feedback and move on.]";
    }

    // If no answer and not skipped
    if (!finalAnswer && !isSkipped) {
      question.score = 0;
      question.feedback = "You did not submit an answer.";
      question.answer = "";

      await interview.save();

      return res.json({
        feedback: question.feedback
      });
    }

    const pastConversation = interview.questions.map((q, i) => `
Q${i+1}: ${q.question}
A${i+1}: ${q.answer || "(No answer)"}
`).join("\n");

    const messages = [
      {
        role: "system",
        content: `
You are a professional human interviewer evaluating a candidate's answer and deciding how to proceed in a real conversational interview.

Evaluate naturally and fairly.

Score the current answer in these areas (0 to 10):
1. Confidence – Does the answer sound clear, confident, and well-presented?
2. Communication – Is the language simple, clear, and easy to understand?
3. Correctness – Is the answer accurate, relevant, and complete?

Calculate:
finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

Feedback Rules:
- Write natural human feedback for the candidate's answer.
- 10 to 15 words only.
- Keep tone professional and honest.

Next Question Rules:
- You must generate the NEXT question to ask the candidate based on their previous answers, role, and resume.
- Make it conversational.
- CRITICAL: If the candidate's role involves Software Engineering, Developer, Programming, or the current conversation naturally leads to technical topics, you MUST heavily bias towards asking technical coding logic or Data Structures and Algorithms (DSA) algorithmic questions.
- Do not ask for full code snippets, instead ask them to explain their logic, approach, or time complexity for specific algorithms.
- The interview currently has exactly ${interview.questions.length} questions.
- You MUST set "isFinished" to true if the number of questions reaches 12.
- You MAY set "isFinished" to true if the number of questions is between 10 and 12 and you feel you have evaluated the candidate enough.
- You MUST set "isFinished" to false if the number of questions is less than 10.
- CRITICAL RULE: The final question of the interview MUST always be a Data Structures and Algorithms (DSA) coding question. If you decide the next question will be the last one (or if the count is 11, meaning the next is the 12th and final), it MUST be a coding question.
- If "isFinished" is true, the "nextQuestion" should be empty.

CRITICAL INSTRUCTION: 
Always prioritize the Candidate's USER-SELECTED Role and Experience when determining the topic and difficulty of the next question. The resume summary is strictly for supporting background context and should NOT override the user's selected Role and Experience level.

Return ONLY valid JSON in this format:

{
  "confidence": number,
  "communication": number,
  "correctness": number,
  "finalScore": number,
  "feedback": "short human feedback",
  "isFinished": boolean,
  "nextQuestion": "The next question to ask (if isFinished is false)"
}
`
      }
      ,
      {
        role: "user",
        content: `
Candidate Role: ${interview.role}
Experience: ${interview.experience}
Interview Mode: ${interview.mode}
Resume summary: ${interview.resumeText?.substring(0, 500)}

Past Conversation:
${pastConversation}

CURRENT Question to Evaluate: ${question.question}
Candidate's CURRENT Answer: ${finalAnswer}
`
      }
    ];


    const aiResponse = await askAi(messages)


    const parsed = JSON.parse(aiResponse);

    question.answer = isSkipped ? "" : finalAnswer;
    question.confidence = parsed.confidence;
    question.communication = parsed.communication;
    question.correctness = parsed.correctness;
    question.score = parsed.finalScore;
    question.feedback = parsed.feedback;
    
    if (!parsed.isFinished && parsed.nextQuestion) {
       interview.questions.push({
         question: parsed.nextQuestion,
         difficulty: "adaptive",
         timeLimit: 50
       });
    }

    await interview.save();


    return res.status(200).json({
      feedback: parsed.feedback,
      isFinished: parsed.isFinished,
      nextQuestion: parsed.nextQuestion ? interview.questions[interview.questions.length - 1] : null,
      interview
    })
  } catch (error) {
    return res.status(500).json({message:`failed to submit answer ${error}`})

  }
}


export const finishInterview = async (req,res) => {
  try {
    const {interviewId} = req.body
    const interview = await Interview.findById(interviewId)
    if(!interview){
      return res.status(400).json({message:"failed to find Interview"})
    }

    const totalQuestions = interview.questions.length;

    let totalScore = 0;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalScore += q.score || 0;
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    const finalScore = totalQuestions
      ? totalScore / totalQuestions
      : 0;

    const avgConfidence = totalQuestions
      ? totalConfidence / totalQuestions
      : 0;

    const avgCommunication = totalQuestions
      ? totalCommunication / totalQuestions
      : 0;

    const avgCorrectness = totalQuestions
      ? totalCorrectness / totalQuestions
      : 0;

    interview.finalScore = finalScore;
    interview.status = "completed";

    await interview.save();

    return res.status(200).json({
       finalScore: Number(finalScore.toFixed(1)),
      confidence: Number(avgConfidence.toFixed(1)),
      communication: Number(avgCommunication.toFixed(1)),
      correctness: Number(avgCorrectness.toFixed(1)),
      questionWiseScore: interview.questions.map((q) => ({
        question: q.question,
        score: q.score || 0,
        feedback: q.feedback || "",
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
      })),
    })
  } catch (error) {
    return res.status(500).json({message:`failed to finish Interview ${error}`})
  }
}


export const getMyInterviews = async (req,res) => {
  try {
    const interviews = await Interview.find({userId:req.userId})
    .sort({ createdAt: -1 })
    .select("role experience mode finalScore status createdAt");

    return res.status(200).json(interviews)

  } catch (error) {
     return res.status(500).json({message:`failed to find currentUser Interview ${error}`})
  }
}

export const getInterviewReport = async (req,res) => {
  try {
    const interview = await Interview.findById(req.params.id)

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }


    const totalQuestions = interview.questions.length;

    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });
    const avgConfidence = totalQuestions
      ? totalConfidence / totalQuestions
      : 0;

    const avgCommunication = totalQuestions
      ? totalCommunication / totalQuestions
      : 0;

    const avgCorrectness = totalQuestions
      ? totalCorrectness / totalQuestions
      : 0;

       return res.json({
      finalScore: interview.finalScore,
      confidence: Number(avgConfidence.toFixed(1)),
      communication: Number(avgCommunication.toFixed(1)),
      correctness: Number(avgCorrectness.toFixed(1)),
      questionWiseScore: interview.questions,
      videoUrl: interview.videoUrl
    });

  } catch (error) {
    return res.status(500).json({message:`failed to find currentUser Interview report ${error}`})
  }
}

export const uploadVideo = async (req, res) => {
  try {
     const { interviewId } = req.body;
     if (!req.file) return res.status(400).json({ message: "Video file missing" });
     const interview = await Interview.findById(interviewId);
     if (!interview) return res.status(404).json({ message: "Interview not found" });
     
     interview.videoUrl = req.file.path.replace(/\\/g, '/');
     await interview.save();
     
     res.status(200).json({ message: "Video uploaded successfully", videoUrl: interview.videoUrl });
  } catch(e) {
     res.status(500).json({ message: `failed to upload video ${e.message}` });
  }
}
