import { z } from 'zod';
import prisma from '@/lib/prisma';
import { baseProcedure, createTRPCRouter,protectedProcedure } from '../init';
 
export const appRouter = createTRPCRouter({
  hello: protectedProcedure.query(() => {
      return prisma.user.findMany();
    }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;