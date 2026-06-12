import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardAnalytics =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      // Search
      const search =
        (req.query.search as string) || "";

      // Pagination
      const page =
        Number(req.query.page) || 1;

      const limit = 5;

      const skip =
        (page - 1) * limit;

      // Sorting
      const sortBy =
        (req.query.sortBy as string) ||
        "date";

      // Total count
      const totalItems =
        await prisma.salesData.count({
          where: {
            product: {
              contains: search,
              mode: "insensitive",
            },
          },
        });

      // Fetch data
      const data =
        await prisma.salesData.findMany({
          where: {
            product: {
              contains: search,
              mode: "insensitive",
            },
          },

          skip,
          take: limit,

          orderBy: {
            [sortBy]: "desc",
          },
        });

      // Analytics
      const totalRevenue =
        await prisma.salesData.aggregate({
          _sum: {
            revenue: true,
          },
        });

      const totalSales =
        await prisma.salesData.aggregate({
          _sum: {
            sales: true,
          },
        });

      res.json({
        totalRevenue:
          totalRevenue._sum.revenue || 0,

        totalSales:
          totalSales._sum.sales || 0,

        currentPage: page,

        totalPages: Math.ceil(
          totalItems / limit
        ),

        data,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };