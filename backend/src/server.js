import express from 'express';
import taskRoute from './routes/taskRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';  

const PORT = process.env.PORT || 5001
const app = express();
connectDB();
dotenv.config();

app.use(express.json());    

app.use("/api/tasks",taskRoute);
app.listen(PORT,()=>{
    console.log(`The server is listening on ${PORT} `);
}
);

