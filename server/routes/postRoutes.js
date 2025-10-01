import express from 'express';
import { createPost, getallPosts } from '../controllers/postController.js';

const router = express.Router();


router.post('/createpost',createPost)
router.get('/getallposts',getallPosts)


export default router;

