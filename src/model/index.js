import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient("postgres://avnadmin:AVNS_O9pthBaMZmxzgmhUo89@obeey-pg-server-rayhankobir793-2757.a.aivencloud.com:16554/defaultdb?sslmode=require");
export default prismaClient;
