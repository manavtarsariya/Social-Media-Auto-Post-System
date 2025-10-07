import express from 'express';
import { facebookHandler, linkedinHandler, twitterHandler } from '../controllers/mockApicontroller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get("/twitter",twitterHandler)
router.get("/linkedin", linkedinHandler)
router.get("/facebook", facebookHandler)


export default router;