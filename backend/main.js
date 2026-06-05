import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { redirectUrl } from "./controllers/urlController.js";
import forgetpassRoute from "./routes/forgetpassRoutes.js"

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// API Routes
app.use("/", authRoutes);
app.use("/", urlRoutes);
app.use("/api", dashboardRoutes);
app.get("/:shortCode", redirectUrl);
app.use('/',forgetpassRoute)


app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});