import { NextRequest, NextResponse } from 'next/server';
import { Recommendation } from '@/types/api';

export async function POST(req: NextRequest) {
    try {
        const profile = await req.json();

        // Simulate AI Processing Delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock AI Recommendation Logic based on profile
        const recommendations: Recommendation[] = [
            {
                role: "Full Stack Developer",
                matchPercentage: profile.technicalSkills.some((s: any) => s.name === 'React' && s.level > 5) ? 95 : 82,
                growth: "+14%",
                skills: ["React", "Node.js", "PostgreSQL"],
                color: "text-blue-400"
            },
            {
                role: "Machine Learning Engineer",
                matchPercentage: profile.interests.includes('AI/ML') ? 88 : 65,
                growth: "+24%",
                skills: ["Python", "PyTorch", "Stats"],
                color: "text-purple-400"
            },
            {
                role: "Cloud Architect",
                matchPercentage: profile.interests.includes('Cloud') ? 91 : 72,
                growth: "+18%",
                skills: ["AWS", "Docker", "Kubernetes"],
                color: "text-cyan-400"
            }
        ];

        return NextResponse.json({ recommendations });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
    }
}
