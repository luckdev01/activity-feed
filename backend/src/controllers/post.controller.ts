import { Request, Response, NextFunction } from 'express';
const { User, Post } = require('../models');

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const { offset, limit } = req.query;
    const offsetNumber =
      offset && typeof offset === 'string' ? parseInt(offset) : 0;
    const limitNumber =
      limit && typeof limit === 'string' ? parseInt(limit) : 10;

    const data = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
      order: [['timeStamp', 'DESC']],
      offset: offsetNumber,
      limit: limitNumber,
    });

    res.json(data);
  } catch (err: any) {
    console.error('Error while getting posts', err.message);
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await Post.create({ ...req.body, userId: (req.user as any).id }));
  } catch (err: any) {
    console.error('Error while creating post', err.message);
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    res.json(
      await Post.update(req.body, {
        where: { id: parseInt(id) },
      }),
    );
  } catch (err: any) {
    console.error('Error while updating post', err.message);
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    res.json(
      await Post.destroy({
        where: { id: parseInt(id) },
      }),
    );
  } catch (err: any) {
    console.error('Error while deleting post', err.message);
    next(err);
  }
}

export default { get, create, update, remove };
