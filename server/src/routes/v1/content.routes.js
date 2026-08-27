import { Router } from 'express';
import Trainer from '../../models/Trainer.js';
import Program from '../../models/Program.js';
import BlogPost from '../../models/BlogPost.js';
import FAQ from '../../models/FAQ.js';
import Testimonial from '../../models/Testimonial.js';
import { crudControllers } from '../../controllers/crud.js';
import { requireAuth, requireRole } from '../../middlewares/auth.js';

const router = Router();

function mount(base, Model, { lookup = '_id', publicListSort } = {}) {
  const c = crudControllers(Model, { lookup, listSort: publicListSort });
  router.get(base, (req, res, next) => { req.query.active = 'true'; c.list(req, res, next); });
  router.get(`${base}/:id`, c.get);
  const guard = [requireAuth, requireRole('admin')];
  router.post(base, ...guard, c.create);
  router.put(`${base}/:id`, ...guard, c.update);
  router.delete(`${base}/:id`, ...guard, c.remove);
}

mount('/trainers', Trainer, { lookup: 'slug' });
mount('/programs', Program, { lookup: 'slug' });
mount('/faqs', FAQ);
mount('/testimonials', Testimonial);

// Blog: public list returns published only
const blog = crudControllers(BlogPost, { lookup: 'slug' });
router.get('/blog', (req, res, next) => {
  if (req.user && req.user.role === 'admin') return blog.list(req, res, next);
  BlogPost.find({ status: 'published' }).select('title slug excerpt cover tags authorName publishedAt').sort({ publishedAt: -1 }).lean().then((items) => res.json({ success: true, data: items })).catch(next);
});
router.get('/blog/:id', blog.get);
router.post('/blog', requireAuth, requireRole('admin'), blog.create);
router.put('/blog/:id', requireAuth, requireRole('admin'), blog.update);
router.delete('/blog/:id', requireAuth, requireRole('admin'), blog.remove);

export default router;
