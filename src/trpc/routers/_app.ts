import { inngest } from '@/inngest/client';
import {  createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { email } from 'zod';
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure
    
    .query(({ctx}) => {
      console.log({userId: ctx.auth.user.id})

      return prisma.workflow.findMany()
    }
  ),
  createWorkflow : protectedProcedure
  .mutation(async()=>{
    await inngest.send({
      name:"test/hello.world",  //name of event
      data:{
        email:"khanhazique04@gmail.com"
      }
    })
   
  }
),

});
// export type definition of API
export type AppRouter = typeof appRouter;