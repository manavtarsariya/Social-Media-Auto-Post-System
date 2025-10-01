import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());    


app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});


