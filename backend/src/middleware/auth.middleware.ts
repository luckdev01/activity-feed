import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { Express, Request, Response, NextFunction } from 'express';
const { User } = require('../models');

export function initPassport(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'username' },
      async (username, password, done) => {
        try {
          if (!username) {
            done(null, false);
          }
          const user = await User.findOne({
            where: {
              username,
            },
          });
          if (await bcrypt.compare(password, user.hash.toString())) {
            done(null, user);
          } else {
            done(null, false, { message: 'User or password incorrect' });
          }
        } catch (e) {
          done(e);
        }
      },
    ),
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user: any) => {
        if (user) {
          delete user.dataValues.hash;
          delete user.dataValues.salt;
          done(null, user.dataValues);
        } else {
          done(new Error('User not found'));
        }
      })
      .catch((err: any) => {
        console.error('Error:', err);
        done(err);
      });
  });

  console.log('passport and sessions loaded');
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  if (req.user) return next();
  else res.status(401).json({ error: 'Unauthorized' });
}
