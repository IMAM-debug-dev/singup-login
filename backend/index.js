
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors"


dotenv.config();
connectDB()


const app = express();
const port = process.env.PORT || 4000;


app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on port number ${port}`);
});
