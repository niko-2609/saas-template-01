import { PrismaClient } from '@prisma/client'

// declare a global object to hold a prisma client instance
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

// Checks if globalThis.prisma already has a PrismaClient inialized,
// If yes, it takes that value and puts it in the db
// If no, only then it initializes a new PrismaClient.
export const db = globalThis.prisma || new PrismaClient();


/** 
 * In dev mode, a hot reload will initialize a new Prisma client everytime.
 * To avoid this, we use globalThis to store/cache the prisma client so that 
 * on every hot reload we dont initialize a new PrismaClient.
 * 
 * In production, its fine to initialize a new PrismaClient everytime
 */
if (process.env.NODE_ENV != "production") globalThis.prisma = db;