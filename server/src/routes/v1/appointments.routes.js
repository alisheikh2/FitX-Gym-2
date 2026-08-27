import { Router } from 'express';
import { body } from 'express-validator';
import * as c from '../../controllers/appointmentsController.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';

const router = Router();

router.get('/', requireAuth, requireRole('admin', 'staff', 'trainer'), c.list);
router.post('/', requireAuth, requireRole('admin', 'staff'), [
  body('personName').trim().isLength({ min: 2 }),
  body('date').isLength({ min: 8 }),
  body('time').isLength({ min: 3 })
], validate, c.create);
router.put('/:id', requireAuth, requireRole('admin', 'staff', 'trainer'), c.update);
router.delete('/:id', requireAuth, requireRole('admin', 'staff'), c.remove);

export default router;
