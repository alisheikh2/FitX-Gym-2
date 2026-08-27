import { Router } from 'express';
import { body } from 'express-validator';
import MembershipPlan from '../../models/MembershipPlan.js';
import { crudControllers } from '../../controllers/crud.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';

const router = Router();
const c = crudControllers(MembershipPlan);

router.get('/', c.list); // public: pricing page consumes this
router.get('/:id', c.get);
router.post('/', requireAuth, requireRole('admin'), [
  body('name').trim().isLength({ min: 2 }),
  body('durationMonths').isInt({ min: 1 }),
  body('price').isFloat({ min: 0 })
], validate, c.create);
router.put('/:id', requireAuth, requireRole('admin'), c.update);
router.delete('/:id', requireAuth, requireRole('admin'), c.remove);

export default router;
