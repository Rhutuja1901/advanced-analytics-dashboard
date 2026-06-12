import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import prisma from "../prisma";

export const uploadCSV = async (
  req: Request,
  res: Response
) => {
  try {
    const results: any[] = [];

    fs.createReadStream(req.file!.path)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        for (const row of results) {
          await prisma.salesData.create({
            data: {
              product: row.product,
              sales: Number(row.sales),
              revenue: Number(row.revenue),
              date: new Date(row.date),
            },
          });
        }

        res.status(200).json({
          message:
            "CSV Uploaded Successfully",
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Upload Failed",
    });
  }
};