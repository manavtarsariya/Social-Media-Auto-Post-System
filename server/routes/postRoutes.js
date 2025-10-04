import express from 'express';
import { createPost, deletePost, getallPosts, statusHandler } from '../controllers/postController.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();


router.post('/createpost',singleUpload,createPost)
router.get('/getallposts',getallPosts)
router.delete('/deletepost/:postId',deletePost)
router.put('/updatestatus/:postId',statusHandler)


export default router;

