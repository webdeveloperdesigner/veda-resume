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

  const prompt = `Act as an expert ATS (Applicant Tracking System) resume writer and recruiter with 15+ years of hiring experience.

I am providing you with my current resume.
${roleContext}

Your tasks:
1. Analyze my current resume against the job description/role.
2. Calculate an estimated ATS score out of 100 and explain the scoring breakdown (Skills match, Keywords match, Experience relevance, Education/certifications, Formatting and readability) in the JSON fields.
3. Identify missing keywords, technical skills, weak bullet points, and gaps or optimization opportunities.
4. Rewrite and optimize the entire resume to maximize ATS compatibility while keeping information truthful. Integrate important keywords naturally.
5. Rewrite experience bullets using strong action verbs and measurable achievements where possible.
6. Ensure the fully rewritten resume uses ATS-friendly formatting (Simple headings, No tables or graphics, Clean structure, Standard section names).

You MUST output your response in the EXACT JSON format specified by the responseSchema. Do NOT wrap the JSON in markdown blocks. Do NOT output raw text. 
The 'fullyOptimizedResume' field should contain the fully rewritten resume text, formatted clearly.

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
            temperature: 0,
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                overallScore: { type: "INTEGER" },
                improvedScore: { type: "INTEGER" },
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
                strengths: { type: "ARRAY", items: { type: "STRING" } },
                weaknesses: { type: "ARRAY", items: { type: "STRING" } },
                missingKeywords: { type: "ARRAY", items: { type: "STRING" } },
                improvementSuggestions: { type: "ARRAY", items: { type: "STRING" } },
                summaryOfChanges: { type: "STRING" },
                fullyOptimizedResume: { type: "STRING" },
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
                missingSections: { type: "ARRAY", items: { type: "STRING" } },
                industryFit: { type: "STRING" },
                skillGap: { type: "ARRAY", items: { type: "STRING" } },
              },
              required: [
                "overallScore",
                "improvedScore",
                "categoryScores",
                "summary",
                "strengths",
                "weaknesses",
                "missingKeywords",
                "improvementSuggestions",
                "summaryOfChanges",
                "fullyOptimizedResume",
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
