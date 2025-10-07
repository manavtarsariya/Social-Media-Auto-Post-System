import express from 'express';
import { facebookHandler, linkedinHandler, twitterHandler } from '../controllers/mockApicontroller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post("/twitter",isAuthenticated,twitterHandler)
router.post("/linkedin",isAuthenticated, linkedinHandler)
router.post("/facebook",isAuthenticated, facebookHandler)


export default router;