import pdf from 'pdf-parse';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock_key'
});

export const parseResume = async (buffer: Buffer) => {
    try {
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('Failed to parse PDF resume');
    }
};

export const analyzeResumeContent = async (text: string) => {
    if (process.env.OPENAI_API_KEY === 'mock_key' || !process.env.OPENAI_API_KEY) {
        return {
            atsScore: 75,
            summary: 'Good professional background, but missing specific keywords for AI/ML roles.',
            keywords: ['Python', 'SQL', 'Git'],
            suggestions: ['Add more context on React projects', 'Highlight data cleaning experience']
        };
    }

    const prompt = `Analyze this resume text and provide an ATS score (0-100), a summary, top keywords detected, and specific improvement suggestions. 
  Text: ${text.substring(0, 4000)}...
  Provide output in valid JSON format: { "atsScore": number, "summary": string, "keywords": string[], "suggestions": string[] }`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return content ? JSON.parse(content) : null;
};
