import express from 'express';
import { captiongenerator, createPost, deletePost, getallPosts, hashtagsgenerator, sentimentanalyzer, statusHandler } from '../controllers/postController.js';
import { singleUpload } from '../middleware/multer.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();


router.post('/createpost', isAuthenticated, singleUpload,createPost)
router.get('/getallposts', isAuthenticated, getallPosts)
router.delete('/deletepost/:postId', isAuthenticated, deletePost)
router.put('/updatestatus/:postId', isAuthenticated, statusHandler)
router.post('/generate-caption', isAuthenticated, captiongenerator)
router.post('/generate-hashtags', isAuthenticated, hashtagsgenerator)
router.post('/analyze-sentiment', isAuthenticated, sentimentanalyzer)



export default router;

