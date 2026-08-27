import { Router } from 'express';
import { body } from 'express-validator';
import * as c from '../../controllers/membersController.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';

const router = Router();
router.use(requireAuth, requireRole('admin', 'staff'));

const memberBody = [
  body('name').trim().isLength({ min: 2 }),
  body('phone').trim().isLength({ min: 7 })
];

router.get('/', c.list);
router.get('/:id', c.get);
router.post('/', memberBody, validate, c.create);
router.put('/:id', c.update);
router.delete('/:id', requireRole('admin'), c.remove);

export default router;
