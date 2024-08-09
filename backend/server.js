import express from 'express';
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv'
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000

console.log(process.env.MONGO_URI)

app.use(express.urlencoded({extended:true})) //to parse form data(urlencoded)
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use(cookieParser());


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB();
})