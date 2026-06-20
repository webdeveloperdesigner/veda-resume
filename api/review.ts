import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { resumeText, targetRole } = request.body;

  if (!resumeText || resumeText.length < 100) {
    return response.status(400).json({ error: 'Invalid resume text length. Must be at least 100 characters.' });
  }

  const truncatedText = resumeText.slice(0, 30000); // Truncate to 30k

  if (!GEMINI_API_KEY) {
    return response.status(500).json({ error: 'Gemini API key is not configured.' });
  }

  const roleContext = targetRole ? `The candidate is specifically targeting the role of: "${targetRole}". Evaluate their fit for this specific role.` : 'Evaluate their general employability.';

  const prompt = `You are VEDA, a senior technical recruiter and resume coach.
Your job is to analyze the following resume and provide brutally honest, highly structured feedback. Focus your feedback on constructive, actionable critiques rather than generic platitudes.
${roleContext}
You must return your response in the exact JSON format specified by the responseSchema.

Focus on:
1. Employability Metrics: Rate Clarity, Impact, ATS Compatibility, and Structure out of 100.
2. Smart Rewrites: Find the 3 weakest bullet points and rewrite them using action verbs and quantified metrics. 
   Example of a GOOD rewrite:
   Original: "Helped with database"
   Suggested: "Optimized SQL queries, reducing database load times by 40% and improving overall application performance."
   Reason: "The original lacks impact and metrics. The suggested version uses strong action verbs and quantifies the achievement."
3. Knowledge-Driven Insights: Identify the industry the candidate is targeting, provide an industry fit summary, and highlight any potential skill gaps.

Resume Text:
${truncatedText}`;

  try {
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

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error('Gemini API Error:', errorText);
      throw new Error('Failed to generate content from Gemini API.');
    }

    const data = await geminiRes.json();
    
    // Extract the JSON string from the response
    const jsonString = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!jsonString) {
      throw new Error('Invalid response structure from Gemini API.');
    }

    // Since responseMimeType is set to application/json, the result should be a valid JSON string
    let resultJson;
    try {
      resultJson = JSON.parse(jsonString);
    } catch {
      console.error("Failed to parse JSON:", jsonString);
      throw new Error("Failed to parse the structured response from Gemini.");
    }

    return response.status(200).json(resultJson);
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Server error:', err);
    return response.status(500).json({ error: err.message || 'Internal server error' });
  }
}
