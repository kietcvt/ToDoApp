import express from 'express';
import taskRoute from './routes/taskRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';  
import cors from 'cors';
const PORT = process.env.PORT || 5001
const app = express();

dotenv.config();

app.use(express.json());    
app.use(cors());

app.use("/api/tasks",taskRoute);
connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`The server is listening on ${PORT} `);
    });
});


