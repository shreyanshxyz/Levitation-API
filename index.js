import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import authRoutes from "./routes/authRoute.js";
import postRoutes from "./routes/postRoute.js";
import { validateRequest } from "./utils/middleware.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(validateRequest);
app.use(mongoSanitize());

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI).catch((err) => {
  console.log(err);
});
mongoose.connection.on("error", (e) => {
  console.log("MongoDB Connection Error!");
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Database");
});

// Rate limiting setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

app.use("/auth", authRoutes);
app.use("/blog", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("It's Working");
});
