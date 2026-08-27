import { Router } from 'express';
import { getPublic, update } from '../../controllers/settingsController.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';

const router = Router();
router.get('/', getPublic);
router.put('/', requireAuth, requireRole('admin'), update);

export default router;
