import express from "express";
import { getDashboardData } from "../controllers/analyticsController";

const router = express.Router();

router.get("/dashboard", getDashboardData);

export default router;