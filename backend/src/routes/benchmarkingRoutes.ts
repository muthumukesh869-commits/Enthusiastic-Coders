import { Router } from 'express';
import { getReadinessScore, getPlacementProbability } from '../controllers/benchmarkingController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/readiness', protect, getReadinessScore);
router.get('/probability', protect, getPlacementProbability);

export default router;
