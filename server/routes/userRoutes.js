import express from "express";
import { registerUser, loginUser, logout } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);   
router.get('/logout',isAuthenticated, logout);   

export default router;
