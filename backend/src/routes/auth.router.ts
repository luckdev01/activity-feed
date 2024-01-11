import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', authController.login);

router.get('/user', isAuthenticated, (req, res) => {
  res.send({ success: true, user: req.user });
});

export default router;
