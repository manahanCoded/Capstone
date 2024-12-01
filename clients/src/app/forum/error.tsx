"use client"

import { useEffect } from "react"

export default function ForumError({error}: {error: Error}){
    useEffect(()=>{
        console.log(error)

    },[error])

    return(
        <div className="fixed h-screen w-screen inset-0 bg-gray-100">
            <div className="w-1/2 h-screen flex items-center justify-center mx-auto">
            <h1 className="text-2xl font-bold text-red-800">Error Fetching data!</h1>
            </div>
        </div>
    )
}