
"use client"


import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";



const Page =()=>{


const trpc = useTRPC()
const queryClient = useQueryClient();
const {data} = useQuery(trpc.getWorkflows.queryOptions());

const create = useMutation(trpc.createWorkflow.mutationOptions(
  {
    onSuccess :()=>{
     toast.success("Job queued")
      
    }
  }
))

const testai = useMutation(trpc.testAi.mutationOptions({
   onSuccess :()=>{
     toast.success("AI agent queued")
      
    }

}))

 




  return (
    <div className="min-h-screen min-w-screen flex 
    gap-y-6
    items-center justify-center flex-col">
    protected server components
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
    <Button 
    disabled={testai.isPending}
    onClick={()=>testai.mutate()}
    >
      Test Ai
    </Button>
    <Button
    disabled={create.isPending}
    onClick={()=>create.mutate()}

    >
      create workflow
    </Button>
    <LogoutButton />
    </div>
  )

}

export default Page