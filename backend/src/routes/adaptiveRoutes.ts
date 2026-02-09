import { Router } from 'express';
import { updateRoadmapProgress, getMarketTrends, submitInterviewFeedback } from '../controllers/adaptiveController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/progress', protect, updateRoadmapProgress);
router.get('/trends', getMarketTrends);
router.post('/interview-feedback', protect, submitInterviewFeedback);

export default router;
