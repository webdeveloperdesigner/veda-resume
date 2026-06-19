import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const prompt = `You are VEDA, a senior technical recruiter and resume coach.
Your job is to analyze the following resume and provide brutally honest, highly structured feedback.
You must return your response in the exact JSON format specified by the responseSchema.

Focus on:
1. Employability Metrics: Rate Clarity, Impact, ATS Compatibility, and Structure.
2. Smart Rewrites: Find the 3 weakest bullet points and rewrite them using action verbs and quantified metrics.
3. Knowledge-Driven Insights: Identify the industry the candidate is targeting, provide an industry fit summary, and highlight any potential skill gaps.

Resume Text:
John Doe
Software Engineer
- Wrote code in Java
- Did some frontend with React
- Fixed bugs`;

async function test() {
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              overallScore: { type: "INTEGER" },
              categoryScores: {
                type: "OBJECT",
                properties: {
                  clarity: { type: "INTEGER" },
                  impact: { type: "INTEGER" },
                  atsCompatibility: { type: "INTEGER" },
                  structure: { type: "INTEGER" },
                },
                required: ["clarity", "impact", "atsCompatibility", "structure"],
              },
              summary: { type: "STRING" },
              strengths: {
                type: "ARRAY",
                items: { type: "STRING" },
              },
              weaknesses: {
                type: "ARRAY",
                items: { type: "STRING" },
              },
              rewrites: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    original: { type: "STRING" },
                    suggested: { type: "STRING" },
                    reason: { type: "STRING" },
                  },
                  required: ["original", "suggested", "reason"],
                },
              },
              missingSections: {
                type: "ARRAY",
                items: { type: "STRING" },
              },
              industryFit: { type: "STRING" },
              skillGap: {
                type: "ARRAY",
                items: { type: "STRING" },
              },
            },
            required: [
              "overallScore",
              "categoryScores",
              "summary",
              "strengths",
              "weaknesses",
              "rewrites",
              "industryFit",
              "skillGap"
            ],
          },
        },
      }),
    }
  );

  const text = await geminiRes.text();
  console.log("Status:", geminiRes.status);
  console.log("Response:", text);
}

test();
