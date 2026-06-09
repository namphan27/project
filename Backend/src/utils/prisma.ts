import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaMariaDb(process.env.DATABASE_URL as string),
    log: [{ emit: "stdout", level: "query" }],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//     log: [
//       {
//         emit: "stdout",
//         level: "query",
//       },
//     ],
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// import "dotenv/config";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";
// import { PrismaClient } from "../generated/prisma/client";
// const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
// const prisma = new PrismaClient({
//   adapter,
//   log: [
//     {
//       emit: "stdout",
//       level: "query",
//     },
//   ],
// });
// export { prisma };
