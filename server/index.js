import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
import cookieParser from 'cookie-parser';

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import sheduler from './schedulers/postScheduler.js';
import mockApiRoutes from './routes/mockApiRoutes.js';
import logApiRoutes from "./routes/logApiRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin:"http://localhost:5173",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/mock/api/',mockApiRoutes);
app.use('/api/log',logApiRoutes)



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});


