import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { polarClient } from "./polar";
import prisma from "./db";
import { Provider } from "@radix-ui/react-tooltip";

export const auth = betterAuth({

    database:prismaAdapter(prisma,{
        provider:"postgresql"
    
    }),
    emailAndPassword :{
        enabled:true,
        autoSignIn:true,
    },

    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "3a54e113-68c1-496c-8cfb-733a0e38b68a",
                            slug: "Nodes-Pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/Nodes-Pro
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }),
                portal()
            ],
        })
    ]
 
});