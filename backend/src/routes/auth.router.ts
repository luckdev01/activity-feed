import express from 'express';
import passport from 'passport';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
    failureMessage: true,
  }),
);

router.get('/success', (req, res) => {
  res.json({ success: true, message: 'Login successful' });
});

router.get('/failure', (req: any, res) => {
  res.status(401).json({ success: false, message: req.session.messages[0] });
});

router.get('/user', isAuthenticated, (req, res) => {
  res.send({ success: true, user: req.user });
});

export default router;
