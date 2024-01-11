import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

async function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'local',
    (
      err: any,
      user?: Express.User | false | null,
      info?: object | string | Array<string | undefined>,
    ) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: 'Authentication failed' });
      }
      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        return res
          .status(200)
          .json({ success: true, message: 'Successfully authenticated' });
      });
    },
  )(req, res, next);
}

export default { login };
