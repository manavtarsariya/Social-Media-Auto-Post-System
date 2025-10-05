import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import sheduler from './schedulers/postScheduler.js';
import mockApiRoutes from './routes/mockApiRoutes.js';
import logApiRoutes from "./routes/logApiRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());    


app.use('/api/user',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/mock/api/',mockApiRoutes);
app.use('/api/log',logApiRoutes)



app.listen(PORT, () => {
    connectDB();
    // sheduler.start()
    // sheduler.stop()
    console.log(`Server is running on port ${PORT}`);
});


