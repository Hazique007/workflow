import { inngest } from '@/inngest/client';
import {  baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { email } from 'zod';

import {google} from "@ai-sdk/google"
import {generateText} from "ai"
import { TRPCError } from '@trpc/server';
export const appRouter = createTRPCRouter({

  testAi:baseProcedure.mutation(async()=>{
    


   await inngest.send({
    name:"execute/ai"});

      return {success :true, message:"AI executed"}

   

  }),



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