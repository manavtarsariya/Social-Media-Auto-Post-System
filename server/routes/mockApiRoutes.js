import express from 'express';
import { facebookHandler, linkedinHandler, twitterHandler } from '../controllers/mockApicontroller.js';

const router = express.Router();

router.post("/twitter",twitterHandler)
router.post("/linkedin", linkedinHandler)
router.post("/facebook", facebookHandler)


export default router;