import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const JWT_EXPIRES_IN = '7d';

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                profile: {
                    create: {} // Create an empty profile for the new user
                }
            },
            include: { profile: true }
        });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true }
        });

        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: (req as any).user.id },
            include: { profile: { include: { skills: true } } }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};
