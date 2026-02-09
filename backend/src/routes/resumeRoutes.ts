import { Router } from 'express';
import multer from 'multer';
import { analyzeResume, getResumes } from '../controllers/resumeController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/analyze', protect, upload.single('resume'), analyzeResume);
router.get('/', protect, getResumes);

export default router;
