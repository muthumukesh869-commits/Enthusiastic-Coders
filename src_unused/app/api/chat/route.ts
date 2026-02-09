import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1].content.toLowerCase();

        // Simulate AI Processing Delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let response = "I'm MindMaple. How can I help you today?";

        if (lastMessage.includes('resume')) {
            response = "I can definitely help with your resume! You can use our 'Smart Resume Analyzer' to get a detailed ATS score and improvement tips. Would you like me to guide you there?";
        } else if (lastMessage.includes('career') || lastMessage.includes('job') || lastMessage.includes('role')) {
            response = "Choosing the right career path depends on your skills and interests. Based on current trends, Full Stack Development and Data Science have high growth. Check your personalized recommendations on the Dashboard!";
        } else if (lastMessage.includes('skills') || lastMessage.includes('learn')) {
            response = "To stay competitive, I recommend focusing on foundational concepts like Data Structures, and then picking a specialized track like React for Frontend or Node.js for Backend.";
        } else if (lastMessage.includes('hello') || lastMessage.includes('hi')) {
            response = "Hello! I'm MindMaple. I can help you with resume analysis, career guidance, and navigating your roadmap. What's on your mind?";
        }

        return NextResponse.json({
            role: 'assistant',
            content: response
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
    }
}
