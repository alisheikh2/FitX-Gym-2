import { Router } from 'express';
import authRoutes from './auth.routes.js';
import memberRoutes from './members.routes.js';
import planRoutes from './plans.routes.js';
import paymentRoutes from './payments.routes.js';
import attendanceRoutes from './attendance.routes.js';
import leadRoutes from './leads.routes.js';
import appointmentRoutes from './appointments.routes.js';
import contentRoutes from './content.routes.js';
import settingsRoutes from './settings.routes.js';
import { overview } from '../../controllers/dashboardController.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/members', memberRoutes);
router.use('/plans', planRoutes);
router.use('/payments', paymentRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/leads', leadRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/', contentRoutes); // trainers, programs, blog, faqs, testimonials
router.use('/settings', settingsRoutes);

router.get('/dashboard', requireAuth, requireRole('admin', 'staff'), overview);

export default router;
