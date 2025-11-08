import { prefetechWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { WorkflowContainer, Workflowslist } from "@/features/workflows/components/workflows";

const Page =async()=>{
    await requireAuth();

    prefetechWorkflows()
    return(
       <WorkflowContainer>
         <HydrateClient>
            <ErrorBoundary fallback={<p>Something went wrong loading workflows.</p>} >
                <Suspense fallback={<p>Loading workflows...</p>}>
                  <Workflowslist />
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
       </WorkflowContainer>
       
    )
}

export default Page