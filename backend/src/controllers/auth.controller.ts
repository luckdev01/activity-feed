import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../middleware/auth.middleware';
const { User } = require('../models');

const expirationTimeInMs = process.env.JWT_EXPIRATION_TIME || '3600000';

async function login(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ success: false, message: 'Invalid username or password' });
  }
  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (user && (await bcrypt.compare(password, user.hash.toString()))) {
    const payload = {
      username: user.dataValues.username,
      expiration: Date.now() + parseInt(expirationTimeInMs),
    };
    const token = jwt.sign(payload, jwtSecretKey, {
      expiresIn: parseInt(expirationTimeInMs),
    });

    return res.status(200).json({ success: true, token });
  } else {
    res
      .status(401)
      .json({ success: false, message: 'User or password incorrect' });
  }
}

export default { login };
