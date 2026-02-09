import { Router } from 'express';
import { getAllCompanies, getCompanyById, createCompany } from '../controllers/companyController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.post('/', protect, createCompany); // Admin only in real app

export default router;
