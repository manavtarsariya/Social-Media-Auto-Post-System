import express from 'express';
import {logpostdetails} from "../controllers/logcontroller.js"
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post("/create",isAuthenticated, logpostdetails)


export default router;