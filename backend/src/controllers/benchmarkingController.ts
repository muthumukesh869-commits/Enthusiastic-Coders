import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getReadinessScore = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const profile = await prisma.profile.findUnique({
            where: { userId },
            include: { skills: true }
        });

        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        // Mock benchmarking logic: Average proficiency of top 5 skills
        const topSkills = profile.skills
            .sort((a, b) => b.proficiency - a.proficiency)
            .slice(0, 5);

        const readinessScore = topSkills.reduce((acc: number, s: { proficiency: number }) => acc + s.proficiency, 0) / (topSkills.length || 1);

        // Mock peer comparison (hardcoded for now as comparison data)
        const peerAverage = 65;
        const historicalPlacementAverage = 72;

        const label = readinessScore >= 80 ? 'Interview Ready' :
            readinessScore >= 50 ? 'Intermediate' : 'Beginner';

        res.status(200).json({
            readinessScore,
            peerComparison: readinessScore - peerAverage,
            historicalComparison: readinessScore - historicalPlacementAverage,
            label,
            topSkills: topSkills.map((s: any) => ({ name: s.name, level: s.proficiency }))
        });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating readiness score' });
    }
};

export const getPlacementProbability = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { targetDomain } = req.query;

        // Simplified logic: Domain match + skill proficiency
        const profile = await prisma.profile.findUnique({
            where: { userId },
            include: { skills: true }
        });

        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        const probability = Math.min(Math.floor(Math.random() * 30) + 50, 95); // Random 50-95% for demo

        res.status(200).json({
            domain: targetDomain || 'General',
            probability,
            tips: [
                'Improve your proficiency in System Design',
                'Solve 50 more LeetCode medium problems',
                'Update your resume with a Full-stack project'
            ]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching placement probability' });
    }
};
