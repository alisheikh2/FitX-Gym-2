import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { notFound, errorHandler } from './middlewares/errors.js';
import { apiLimiter } from './middlewares/rateLimits.js';
import v1Routes from './routes/v1/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = express();
app.set('trust proxy', 1);

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL?.split(',') ?? true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));
app.use('/api', apiLimiter);

app.use('/api/v1', v1Routes);
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'fitx-api', time: new Date().toISOString() }));

// Serve the built client when running as a standalone server (local / VPS).
// On Vercel the static build is served by the platform instead.
const clientDist = path.resolve(__dirname, '../../client/dist');
if (!process.env.VERCEL && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist, { maxAge: '30d', index: false }));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
