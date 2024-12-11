import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster"
import { ReactNode } from "react";

export default function ModuleLayout ({children}: {children : ReactNode}){
    return(
        <div>
            <Navbar/>
            {children}
            <Toaster />
        </div>
    )
}
