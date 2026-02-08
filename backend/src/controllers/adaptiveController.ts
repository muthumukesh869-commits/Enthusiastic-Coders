import { Request, Response } from 'express';
import prisma from '../config/prisma';
import * as aiService from '../services/aiService';

export const updateRoadmapProgress = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { moduleId, status, score } = req.body;

        const module = await prisma.module.update({
            where: { id: moduleId },
            data: { status: status || 'COMPLETED' },
            include: { roadmap: true }
        });

        // If score is low, trigger adaptive adjustment
        if (score && score < 60) {
            // In a real app, logic would go here to add remedial resources or modules via AI
            console.log(`Adapting roadmap for user ${userId} due to low score ${score}`);
        }

        res.status(200).json(module);
    } catch (error) {
        res.status(500).json({ message: 'Error updating progress' });
    }
};

export const getMarketTrends = async (req: Request, res: Response) => {
    try {
        // Mock trending skills based on recent "hiring patterns"
        const trends = [
            { skill: 'Next.js 15', growth: '+25%', demand: 'High' },
            { skill: 'FastAPI', growth: '+18%', demand: 'Medium' },
            { skill: 'PyTorch', growth: '+40%', demand: 'Critical' }
        ];
        res.status(200).json(trends);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching market trends' });
    }
};

export const submitInterviewFeedback = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { feedbackText, result } = req.body;

        // Use AI to analyze feedback and update skill graph
        // For now, mock update proficiency
        await prisma.skill.updateMany({
            where: { profile: { userId }, name: 'Interviews' },
            data: { proficiency: { increment: 5 } }
        });

        res.status(200).json({ message: 'Feedback ingested and strategy updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback' });
    }
};
