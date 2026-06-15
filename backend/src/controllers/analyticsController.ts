import express from "express";
import { getDashboardData } from "../controllers/analyticsController";

const router = express.Router();

/**
 * @route   GET /api/analytics/dashboard
 * @desc    Get dashboard analytics data
 */
router.get("/dashboard", getDashboardData);

export default router;