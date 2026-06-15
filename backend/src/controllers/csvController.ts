import { Request, Response } from "express";
import prisma from "../prisma";
import fs from "fs";
import csv from "csv-parser";

export const uploadCSV = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const results: any[] = [];

    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        try {
          for (let row of results) {
            await prisma.analytics.create({
              data: {
                product:
                  row.product ||
                  "Unknown",
                sales: Number(
                  row.sales || 0
                ),
                revenue: Number(
                  row.revenue || 0
                ),
                date: new Date(
                  row.date || Date.now()
                ),
              },
            });
          }

          return res.status(200).json({
            message:
              "CSV uploaded successfully",
            count: results.length,
          });
        } catch (error) {
          console.log(error);

          return res.status(500).json({
            message:
              "Error inserting data",
          });
        }
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};