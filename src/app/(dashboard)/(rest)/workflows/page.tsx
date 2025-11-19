import { prefetechWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { WorkflowContainer, Workflowslist } from "@/features/workflows/components/workflows";
import  type { SearchParams } from "nuqs";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";

type Props ={
  searchParams  : Promise<SearchParams>
}


const Page =async({searchParams}:Props)=>{
    await requireAuth();

    const params = await workflowsParamsLoader(searchParams);

    prefetechWorkflows(params)
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