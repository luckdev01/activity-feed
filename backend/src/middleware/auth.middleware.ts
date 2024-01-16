import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { Express } from 'express';
import { generateSecretKey } from '../utils/helper';
const { User } = require('../models');

export const jwtSecretKey = generateSecretKey(32);

/**
 * Passport middleware configuration using JWT strategy
 */
export function initPassport(app: Express) {
  app.use(passport.initialize());

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecretKey,
  };

  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        if (!payload.username) {
          done(null, false);
        }
        const user = await User.findOne({
          where: {
            username: payload.username,
          },
        });
        if (user) {
          delete user.dataValues.hash;
          done(null, user.dataValues);
        } else {
          done(null, false, { message: 'Unauthorized' });
        }
      } catch (e) {
        done(e);
      }
    }),
  );
}

/**
 * Middleware function for checking user authentication using Passport with JWT strategy
 */
export const isAuthenticated = passport.authenticate('jwt', { session: false });
