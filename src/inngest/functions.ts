import prisma from "@/lib/db"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { inngest } from "./client"
import { generateText } from "ai"
import { log } from "console";
import * as Sentry from "@sentry/nextjs";

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  {
    event: "execute/ai"
  },

  async ({ event, step }) => {
    await step.sleep("pretend", 5000);
    Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })
  console.error("This is an error log from the AI execution function.");
  console.warn("This is a warning log from the AI execution function.");


    const { steps } = await step.ai.wrap("gemini-generate-text",
      generateText,
      {
        model: google('gemini-2.5-flash'),
        system: "You are a helpful assistant that helps to generate text based on user prompts.",
        prompt: "what is engineering?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }



    )

    return steps



  },
)