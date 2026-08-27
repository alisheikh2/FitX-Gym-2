import { validationResult } from 'express-validator';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Please check the highlighted fields',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg }))
    });
  }
  next();
}
