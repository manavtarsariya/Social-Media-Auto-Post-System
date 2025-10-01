import express from 'express';
import { createPost, deletePost, getallPosts } from '../controllers/postController.js';

const router = express.Router();


router.post('/createpost',createPost)
router.get('/getallposts',getallPosts)
router.delete('/deletepost/:postId',deletePost)


export default router;

