import express from "express";
import {
  getDashboardAnalytics,
} from "../controllers/analyticsController";

const router = express.Router();

router.get(
  "/dashboard",
  getDashboardAnalytics
);

export default router;