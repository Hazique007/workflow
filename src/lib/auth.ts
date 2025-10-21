import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "./db";
import { Provider } from "@radix-ui/react-tooltip";

export const auth = betterAuth({

    database:prismaAdapter(prisma,{
        provider:"postgresql"
    
    }),
    emailAndPassword :{
        enabled:true,
        autoSignIn:true,
    }
 
});