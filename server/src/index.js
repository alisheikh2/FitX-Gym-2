import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    // Auto-seed first run (idempotent): staff accounts + verified site content
    const { default: Trainer } = await import('./models/Trainer.js');
    if ((await Trainer.countDocuments()) === 0) {
      const { runSeed } = await import('./seeds/seedData.js');
      await runSeed();
      console.log('[boot] database seeded with verified FITX content');
    }
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[fitx-api] listening on :${PORT} (${process.env.NODE_ENV || 'development'})`);
    });
  })
  .catch((err) => {
    console.error('[fitx-api] fatal startup error:', err);
    process.exit(1);
  });
