import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function ModuleLayout ({children}: {children : ReactNode}){
    return(
        <div>
            <Navbar/>
            {children}
        </div>
    )
}
