"use client"


import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogAction,
    AlertDialogCancel,
    
} from "@/components/ui/alert-dialog"

import { authClient } from "@/lib/auth-client"

interface UpgradeModalProps {
    open:boolean,
    onOpenChange:(open:boolean)=>void
}

export const UpgradeModal =({open,onOpenChange}:UpgradeModalProps)=>{
       return(
        <AlertDialog open={open} onOpenChange={onOpenChange}>

<AlertDialogContent>
    <AlertDialogHeader>
        <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
        <AlertDialogDescription>
            You need to activate subscription to perform this
            action. Upgrade to Pro to unlock all features.
            
             </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
        <AlertDialogCancel>
            Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={()=> authClient.checkout({slug:"Nodes-Pro"})}>
           Upgrade Now
        </AlertDialogAction>
    </AlertDialogFooter>
</AlertDialogContent>

        </AlertDialog>
       )
}