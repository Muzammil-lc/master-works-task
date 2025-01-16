import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import taskRoutes from "./routes/tasks.routes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
