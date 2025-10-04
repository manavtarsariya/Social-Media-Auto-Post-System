import express from 'express';
import { captiongenerator, createPost, deletePost, getallPosts, hashtagsgenerator, statusHandler } from '../controllers/postController.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();


router.post('/createpost',singleUpload,createPost)
router.get('/getallposts',getallPosts)
router.delete('/deletepost/:postId',deletePost)
router.put('/updatestatus/:postId',statusHandler)
router.post('/generate-caption',captiongenerator)
router.post('/generate-hashtags',hashtagsgenerator)


export default router;

