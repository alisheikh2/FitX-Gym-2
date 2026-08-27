import { Router } from 'express';
import { body } from 'express-validator';
import { login, me, logout } from '../../controllers/authController.js';
import { requireAuth } from '../../middlewares/auth.js';
import { authLimiter } from '../../middlewares/rateLimits.js';
import { validate } from '../../middlewares/validate.js';

const router = Router();

router.post(
  '/login',
  authLimiter,
  [body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 })],
  validate,
  login
);
router.get('/me', requireAuth, me);
router.post('/logout', requireAuth, logout);

export default router;
