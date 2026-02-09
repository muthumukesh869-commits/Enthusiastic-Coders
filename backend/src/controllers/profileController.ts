import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const profile = await prisma.profile.findUnique({
            where: { userId },
            include: { skills: true, currentRoadmap: true }
        });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

export const updateOnboarding = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { interests, skills, status } = req.body;

        const profile = await prisma.profile.update({
            where: { userId },
            data: {
                interests,
                onboardingStatus: status || 'COMPLETED',
                skills: {
                    deleteMany: {}, // Reset skills and recreate them
                    create: skills.map((s: any) => ({
                        name: s.name,
                        category: s.category || 'Technical',
                        proficiency: s.proficiency || 0
                    }))
                }
            },
            include: { skills: true }
        });

        res.status(200).json(profile);
    } catch (error) {
        console.error('Update onboarding error:', error);
        res.status(500).json({ message: 'Error updating onboarding profile' });
    }
};

export const getSkillGraph = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const profile = await prisma.profile.findUnique({
            where: { userId },
            include: { skills: true }
        });

        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        // Format for a graph visualization (nodes and links)
        const nodes = [
            { id: 'User', label: 'You', type: 'user' },
            ...profile.skills.map((s: any) => ({ id: s.id, label: s.name, type: 'skill', value: s.proficiency }))
        ];

        const links = profile.skills.map((s: any) => ({ source: 'User', target: s.id, weight: s.proficiency }));

        res.status(200).json({ nodes, links });
    } catch (error) {
        res.status(500).json({ message: 'Error generating skill graph' });
    }
};
