import { Request, Response } from "express";
import prisma from "../prisma";

export const getDashboardData = async (
  req: Request,
  res: Response
) => {
  try {
    const allData =
      await prisma.analytics.findMany({
        orderBy: {
          date: "desc",
        },
      });

    const revenue =
      await prisma.analytics.aggregate({
        _sum: {
          revenue: true,
        },
      });

    const sales =
      await prisma.analytics.aggregate({
        _sum: {
          sales: true,
        },
      });

    return res.status(200).json({
      totalRevenue:
        revenue._sum.revenue || 0,
      totalSales:
        sales._sum.sales || 0,
      data: allData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};