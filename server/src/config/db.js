import mongoose from 'mongoose';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Connects to MongoDB.
 * - Production / configured environments: uses MONGODB_URI.
 * - Local development without a MongoDB install: spins up mongodb-memory-server
 *   with a persistent dbPath so demo data survives restarts.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    await mongoose.connect(uri, { autoIndex: true });
    console.log('[db] connected via MONGODB_URI');
    return mongoose.connection;
  }

  if (process.env.VERCEL) {
    throw new Error('MONGODB_URI is required on Vercel (set it in Project → Settings → Environment Variables, e.g. a MongoDB Atlas connection string).');
  }

  console.warn('[db] MONGODB_URI not set — starting embedded MongoDB (dev mode, persistent dbPath)');
  // Indirect specifier keeps dev-only mongodb-memory-server out of production bundles (Vercel).
  const memPkg = 'mongodb-memory' + '-server';
  const { MongoMemoryServer } = await import(memPkg);
  const dbPath = path.resolve(__dirname, '../../.dbdata');
  fs.mkdirSync(dbPath, { recursive: true });
  const mongod = await MongoMemoryServer.create({
    instance: { dbPath, storageEngine: 'wiredTiger' },
    binary: { version: process.env.MONGOMS_VERSION || '7.0.14' }
  });
  await mongoose.connect(mongod.getUri('fitx'), { autoIndex: true });
  console.log('[db] embedded MongoDB ready at', dbPath);
  return mongoose.connection;
}
