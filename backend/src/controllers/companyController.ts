import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllCompanies = async (req: Request, res: Response) => {
    try {
        const { type } = req.query;
        const filter = type ? { type: type as string } : {};

        const companies = await prisma.company.findMany({
            where: filter,
            include: { roles: true }
        });
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching companies' });
    }
};

export const getCompanyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const company = await prisma.company.findUnique({
            where: { id },
            include: { roles: true }
        });
        if (!company) return res.status(404).json({ message: 'Company not found' });
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching company' });
    }
};

export const createCompany = async (req: Request, res: Response) => {
    try {
        const { name, type, location, roles } = req.body;
        const company = await prisma.company.create({
            data: {
                name,
                type,
                location,
                roles: {
                    create: roles.map((r: any) => ({
                        title: r.title,
                        requirements: r.requirements
                    }))
                }
            },
            include: { roles: true }
        });
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error creating company' });
    }
};
