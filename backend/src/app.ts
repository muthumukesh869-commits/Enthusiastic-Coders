import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import aiRoutes from './routes/aiRoutes';
import resumeRoutes from './routes/resumeRoutes';
import companyRoutes from './routes/companyRoutes';
import benchmarkingRoutes from './routes/benchmarkingRoutes';
import adaptiveRoutes from './routes/adaptiveRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/benchmarking', benchmarkingRoutes);
app.use('/api/adaptive', adaptiveRoutes);
// app.use('/api/resume', resumeRoutes);

// Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

export default app;
