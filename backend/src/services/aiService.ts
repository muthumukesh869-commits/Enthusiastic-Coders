import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock_key'
});

export const generateDomainRecommendation = async (interests: string[], skills: any[]) => {
    if (process.env.OPENAI_API_KEY === 'mock_key' || !process.env.OPENAI_API_KEY) {
        return [
            { domain: 'Full Stack Development', confidence: 0.92, reason: 'Based on your interest in Web Dev and proficiency in JavaScript.' },
            { domain: 'Data Science', confidence: 0.78, reason: 'Your math skills and interest in AI make this a strong fit.' }
        ];
    }

    const prompt = `Based on these interests: ${interests.join(', ')} and these skill levels: ${JSON.stringify(skills)}, 
  recommend the top 3 career domains for a college student. 
  Provide the output in valid JSON format: [{ "domain": string, "confidence": number, "reason": string }]`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return content ? JSON.parse(content).recommendations : [];
};

export const generateRoadmapModules = async (domain: string, skills: any[]) => {
    const prompt = `Generate a 4-month preparation roadmap for a student aiming for a ${domain} role. 
  The user already knows: ${JSON.stringify(skills)}. 
  Provide the output in valid JSON format: { "modules": [{ "title": string, "description": string, "order": number, "skills": string[], "resources": [{ "title": string, "type": string, "url": string }] }] }`;

    if (process.env.OPENAI_API_KEY === 'mock_key' || !process.env.OPENAI_API_KEY) {
        return [
            {
                title: 'Advanced React & High-Performance UI',
                description: 'Master server components, performance optimization, and complex state management.',
                order: 1,
                skills: ['React Server Components', 'Zustand', 'Performance Tuning'],
                resources: [{ title: 'Next.js Advanced Guide', type: 'Article', url: 'https://nextjs.org/docs' }]
            }
        ];
    }

    const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    return content ? JSON.parse(content).modules : [];
};
