import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch,trpc } from "@/trpc/server";

type Input = inferInput <typeof trpc.workflows.getMany>;

/**
 * 
 * Prefetch workflows for a given user ID.
 */

export const prefetechWorkflows =(params:Input)=>{
    return prefetch(
        trpc.workflows.getMany.queryOptions(params)
    )

}