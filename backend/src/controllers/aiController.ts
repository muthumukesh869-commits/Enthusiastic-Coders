import { Request, Response } from 'express';
import * as aiService from '../services/aiService';
import prisma from '../config/prisma';

export const recommendDomain = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const profile = await prisma.profile.findUnique({
            where: { userId },
            include: { skills: true }
        });

        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        const recommendations = await aiService.generateDomainRecommendation(
            profile.interests,
            profile.skills
        );

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('AI Recommendation error:', error);
        res.status(500).json({ message: 'Error generating recommendations' });
    }
};

export const createRoadmap = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { domain } = req.body;

        const profile = await prisma.profile.findUnique({
            where: { userId },
            include: { skills: true }
        });

        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        const modulesData = await aiService.generateRoadmapModules(domain, profile.skills);

        const roadmap = await prisma.roadmap.upsert({
            where: { profileId: profile.id },
            update: {
                domain,
                modules: {
                    deleteMany: {},
                    create: modulesData.map((m: any) => ({
                        title: m.title,
                        description: m.description,
                        order: m.order,
                        skills: m.skills,
                        resources: {
                            create: m.resources
                        }
                    }))
                }
            },
            create: {
                domain,
                profileId: profile.id,
                modules: {
                    create: modulesData.map((m: any) => ({
                        title: m.title,
                        description: m.description,
                        order: m.order,
                        skills: m.skills,
                        resources: {
                            create: m.resources
                        }
                    }))
                }
            },
            include: { modules: { include: { resources: true } } }
        });

        res.status(201).json(roadmap);
    } catch (error) {
        console.error('AI Roadmap error:', error);
        res.status(500).json({ message: 'Error creating roadmap' });
    }
};
