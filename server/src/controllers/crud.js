import { ok, created, fail } from '../utils/response.js';

/** Small factory producing standard controllers for content models. */
export function crudControllers(Model, { lookup = '_id', listSort = { sortOrder: 1, createdAt: -1 } } = {}) {
  return {
    async list(req, res, next) {
      try {
        const filter = {};
        if (req.query.active === 'true') filter.active = true;
        if (Model.schema.paths.status && req.query.status) filter.status = req.query.status;
        const items = await Model.find(filter).sort(listSort).lean();
        ok(res, items);
      } catch (e) { next(e); }
    },
    async get(req, res, next) {
      try {
        const item = await Model.findOne({ [lookup]: req.params.id }).lean();
        if (!item) return fail(res, 404, 'Not found');
        ok(res, item);
      } catch (e) { next(e); }
    },
    async create(req, res, next) {
      try {
        const item = await Model.create(req.body);
        created(res, item);
      } catch (e) { next(e); }
    },
    async update(req, res, next) {
      try {
        const item = await Model.findOneAndUpdate({ [lookup]: req.params.id }, req.body, { new: true, runValidators: true });
        if (!item) return fail(res, 404, 'Not found');
        ok(res, item);
      } catch (e) { next(e); }
    },
    async remove(req, res, next) {
      try {
        const item = await Model.findOneAndDelete({ [lookup]: req.params.id });
        if (!item) return fail(res, 404, 'Not found');
        ok(res, { deleted: true });
      } catch (e) { next(e); }
    }
  };
}
