import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
    const data = await
prisma.salesData.findMany();
    console.log(data);
}

test();