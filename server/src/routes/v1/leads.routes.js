import { Router } from 'express';
import { body } from 'express-validator';
import * as c from '../../controllers/leadsController.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { leadLimiter } from '../../middlewares/rateLimits.js';
import { validate } from '../../middlewares/validate.js';

const router = Router();

router.post('/', leadLimiter, [
  body('name').trim().isLength({ min: 2, max: 80 }),
  body('phone').trim().isLength({ min: 7, max: 20 })
], validate, c.createPublic);

router.get('/', requireAuth, requireRole('admin', 'staff'), c.list);
router.put('/:id', requireAuth, requireRole('admin', 'staff'), c.update);

export default router;
