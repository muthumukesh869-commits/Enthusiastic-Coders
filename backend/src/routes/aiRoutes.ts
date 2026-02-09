import { Router } from 'express';
import { recommendDomain, createRoadmap } from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/recommend', protect, recommendDomain);
router.post('/roadmap', protect, createRoadmap);

export default router;
