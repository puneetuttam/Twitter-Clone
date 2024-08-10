import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log(process.env.MONGO_URI);

app.use(express.urlencoded({ extended: true })); //to parse form data(urlencoded)
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
