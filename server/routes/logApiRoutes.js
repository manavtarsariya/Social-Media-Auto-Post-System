import express from 'express';
import {logpostdetails} from "../controllers/logcontroller.js"

const router = express.Router();

router.post("/create",logpostdetails)


export default router;