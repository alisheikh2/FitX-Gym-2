import { Router } from 'express';
import { body } from 'express-validator';
import * as c from '../../controllers/attendanceController.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';

const router = Router();
router.use(requireAuth, requireRole('admin', 'staff', 'trainer'));

router.post('/', [body('member').isMongoId()], validate, c.mark);
router.get('/', c.todayList);
router.get('/member/:memberId', c.history);

export default router;
