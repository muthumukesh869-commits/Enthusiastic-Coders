import { Router } from 'express';
import { getProfile, updateOnboarding, getSkillGraph } from '../controllers/profileController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', protect, getProfile);
router.post('/onboarding', protect, updateOnboarding);
router.get('/skill-graph', protect, getSkillGraph);

export default router;
