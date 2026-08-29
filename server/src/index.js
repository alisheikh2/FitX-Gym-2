import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    // Idempotent sync on boot: upserts trainers (so bio/text corrections like
    // em-dash → comma always apply) and only full-seeds fresh databases.
    const { runSeed } = await import('./seeds/seedData.js');
    await runSeed();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[fitx-api] listening on :${PORT} (${process.env.NODE_ENV || 'development'})`);
    });
  })
  .catch((err) => {
    console.error('[fitx-api] fatal startup error:', err);
    process.exit(1);
  });
