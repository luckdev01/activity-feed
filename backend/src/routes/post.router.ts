import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';
import postController from '../controllers/post.controller';

const router = express.Router();

router.get('/', isAuthenticated, postController.get);
router.post('/', isAuthenticated, postController.create);
router.put('/:id', isAuthenticated, postController.update);
router.delete('/:id', isAuthenticated, postController.remove);

export default router;
