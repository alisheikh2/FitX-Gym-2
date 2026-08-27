/**
 * Vercel serverless entry — routes /api/* to the Express app.
 * The frontend (client/dist) is served by Vercel as static output;
 * see vercel.json for rewrites.
 */
import app from '../server/src/app.js';
import { connectDB } from '../server/src/config/db.js';

let ready;
function init() {
  if (!ready) {
    ready = (async () => {
      await connectDB();
      const { default: Trainer } = await import('../server/src/models/Trainer.js');
      if ((await Trainer.countDocuments()) === 0) {
        const { runSeed } = await import('../server/src/seeds/seedData.js');
        await runSeed();
        console.log('[vercel] database seeded with verified FITX content');
      }
    })();
  }
  return ready;
}

export default async function handler(req, res) {
  try {
    await init();
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, message: 'Database not configured: ' + e.message }));
    return;
  }
  return app(req, res);
}

export const config = { runtime: 'nodejs' };
