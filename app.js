import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import validateEnv from "./utils/validateEnv.js";
dotenv.config();
validateEnv();

const app = express();

//middleware
app.use(cookieParser());

export default app;