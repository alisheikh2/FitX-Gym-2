import { Router } from 'express';
import { body } from 'express-validator';
import * as c from '../../controllers/paymentsController.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';

const router = Router();
router.use(requireAuth, requireRole('admin', 'staff'));

router.get('/', c.list);
router.get('/:id/receipt', c.receipt);
router.post('/', [
  body('member').isMongoId(),
  body('amount').isFloat({ min: 0 })
], validate, c.create);

export default router;
