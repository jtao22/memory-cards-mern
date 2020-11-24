import  express from 'express';
import {getPost,createPost, changePost, deletePost, likePost} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPost);
router.post('/', createPost);
router.patch('/:id', changePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost', likePost);

export default router;
