import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken, COOKIE } from '../middlewares/auth.js';
import { ok, fail } from '../utils/response.js';

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() });
  if (!user || user.active === false) return fail(res, 401, 'Invalid credentials');
  const match = await bcrypt.compare(password || '', user.passwordHash);
  if (!match) return fail(res, 401, 'Invalid credentials');
  const token = signToken(user);
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 12 * 60 * 60 * 1000
  });
  ok(res, { user: user.toSafe(), token });
}

export async function me(req, res) {
  ok(res, { user: req.user.toSafe() });
}

export function logout(req, res) {
  res.clearCookie(COOKIE);
  ok(res, { loggedOut: true });
}
