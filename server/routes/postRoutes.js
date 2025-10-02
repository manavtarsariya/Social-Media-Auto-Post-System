import express from 'express';
import { createPost, deletePost, getallPosts } from '../controllers/postController.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();


router.post('/createpost',singleUpload,createPost)
router.get('/getallposts',getallPosts)
router.delete('/deletepost/:postId',deletePost)


export default router;

