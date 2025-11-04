import prisma from "@/lib/db"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import {inngest} from "./client"
import { generateText } from "ai"

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  {id:"execute-ai"},
  {
    event:"execute/ai"
  }, 
  
  async({event,step})=>{
    await step.sleep("pretend",5000);
    const {steps} = await step.ai.wrap("gemini-generate-text",
      generateText,
      {
        model:google('gemini-2.5-flash'),
        system:"You are a helpful assistant that helps to generate text based on user prompts.",
        prompt:"what is engineering?"
      }
     


    )

    return steps



  },
)