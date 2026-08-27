import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { fail } from '../utils/response.js';

export const COOKIE = 'fitx_token';

export function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role, name: user.name }, process.env.JWT_SECRET || 'fitx-dev-secret', {
    expiresIn: process.env.JWT_EXPIRES || '12h'
  });
}

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE] || (req.headers.authorization || '').replace(/^Bearer /, '');
    if (!token) return fail(res, 401, 'Authentication required');
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'fitx-dev-secret');
    const user = await User.findById(payload.sub).select('-passwordHash');
    if (!user || user.active === false) return fail(res, 401, 'Session invalid');
    req.user = user;
    next();
  } catch {
    fail(res, 401, 'Session expired — sign in again');
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return fail(res, 403, 'Not authorized for this action');
    next();
  };
}
