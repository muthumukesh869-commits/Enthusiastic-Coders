import { Request, Response } from 'express';
import * as resumeService from '../services/resumeService';
import prisma from '../config/prisma';

export const analyzeResume = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        if (!req.file) {
            return res.status(400).json({ message: 'No resume file uploaded' });
        }

        // 1. Parse PDF
        const text = await resumeService.parseResume(req.file.buffer);

        // 2. AI Analysis
        const analysis = await resumeService.analyzeResumeContent(text);

        // 3. Save to DB
        const resume = await prisma.resume.create({
            data: {
                userId,
                filename: req.file.originalname,
                url: 'internal_storage', // In a real app, this would be an S3 URL
                atsScore: analysis.atsScore,
                analysis: analysis
            }
        });

        res.status(201).json(resume);
    } catch (error) {
        console.error('Resume Analyze Error:', error);
        res.status(500).json({ message: 'Error analyzing resume' });
    }
};

export const getResumes = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const resumes = await prisma.resume.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resumes' });
    }
};
