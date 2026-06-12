import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import csvRoutes from "./routes/csvRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/csv", csvRoutes);
app.use(
  "/api/analytics",
  analyticsRoutes
);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});