import { inngest } from '@/inngest/client';
import {  createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { email } from 'zod';

import {google} from "@ai-sdk/google"
import {generateText} from "ai"
export const appRouter = createTRPCRouter({

  testAi:protectedProcedure.mutation(async()=>{
    const {text}=await generateText({
      model:google('gemini-2.5-flash'),
      prompt:'Write a recipe for butter chicken'


    })

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