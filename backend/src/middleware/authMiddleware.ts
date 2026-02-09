import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) {
            return res.status(401).json({ message: 'No user found with this id' });
        }

        (req as any).user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }
};
