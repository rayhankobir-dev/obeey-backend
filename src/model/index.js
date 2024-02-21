import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient(process.env.DATABASE_URL);
export default prismaClient;
