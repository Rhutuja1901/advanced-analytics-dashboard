import { Request, Response } from "express";
import prisma from "../prisma";

// Dashboard Analytics
export const getDashboardData = async (
  req: Request,
  res: Response
) => {
  try {
    // Total Sales Count
    const totalSales =
      await prisma.analytics.count();

    // All Data
    const allData =
      await prisma.analytics.findMany({
        orderBy: {
          date: "desc",
        },
      });

    // Total Revenue
    const revenueResult =
      await prisma.analytics.aggregate({
        _sum: {
          revenue: true,
        },
      });

    // Total Sales (sum)
    const salesResult =
      await prisma.analytics.aggregate({
        _sum: {
          sales: true,
        },
      });

    res.status(200).json({
      totalSales:
        salesResult._sum.sales || 0,

      totalRevenue:
        revenueResult._sum.revenue ||
        0,

      data: allData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};