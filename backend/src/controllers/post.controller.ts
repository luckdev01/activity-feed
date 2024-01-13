import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import * as socketModule from '../modules/socket.module';
const { User, Post } = require('../models');

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const { offset, limit, query } = req.query;
    const offsetNumber =
      offset && typeof offset === 'string' ? parseInt(offset) : 0;
    const limitNumber =
      limit && typeof limit === 'string' ? parseInt(limit) : 10;

    const data = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username', 'firstName', 'lastName', 'profileImage'],
          where: query
            ? {
                username: {
                  [Op.iLike]: `%${query}%`,
                },
              }
            : {},
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
    const userId = (req.user as any).id;
    const resp = await Post.create({
      ...req.body,
      userId,
    });
    socketModule.emitEvent('postEvent', resp);
    res.json(resp);
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
