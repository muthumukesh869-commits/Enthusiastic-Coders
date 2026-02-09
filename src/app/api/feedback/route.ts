import { NextRequest, NextResponse } from 'next/server';
import { AIInsight } from '@/types/api';

export async function GET(req: NextRequest) {
    try {
        // Simulate AI Processing Delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const feedbacks: AIInsight[] = [
            {
                id: 1,
                type: "Insight",
                title: "Project Optimization",
                content: "Your recent 'E-commerce API' project shows strong Node.js knowledge, but could benefit from a Redis caching layer to handle high traffic simulations.",
                icon: "Lightbulb",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
                action: "Add Redis Module"
            },
            {
                id: 2,
                type: "Adaptation",
                title: "Roadmap Acceleration",
                content: "Based on your 95% score in the 'Array Mastery' test, I've fast-tracked you to 'Heap & Priority Queue' modules. You've saved 4 days of study time!",
                icon: "RefreshCw",
                color: "text-purple-400",
                bg: "bg-purple-400/10",
                action: "View New Plan"
            },
            {
                id: 3,
                type: "Alert",
                title: "Market Shift Detected",
                content: "Major tech firms (Google, Meta) are increasing focus on 'System Design' for entry-level roles this year. I've added 3 new case studies to your roadmap.",
                icon: "AlertTriangle",
                color: "text-amber-400",
                bg: "bg-amber-400/10",
                action: "Review Market Trends"
            }
        ];

        return NextResponse.json({ feedbacks });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch AI insights' }, { status: 500 });
    }
}
