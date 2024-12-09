"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AccountsDashboard() {
    const pathname = usePathname()
    return(
            <div className="mt-14 text-sm">
            <form>
                <MaxWidthWrapper className="h-12 flex flex-row justify-between items-center border-b-2 ">
                    <section className=" flex flex-row justify-between gap-2 overflow-hidden ">
                        <Link href={"/email/accounts-dashboard"} className={`${pathname === "/email/accounts-dashboard" ? "px-3 py-2 rounded-2xl bg-gray-200 border-[1px]" : ""}w-20  flex justify-center items-center hover:text-gray-500 font-semibold cursor-pointer `}>
                        Accounts
                        </Link>
                        <Link href={"/modules/modules-dashboard"} className={`${pathname === "/modules/modules-dashboard" ? "px-3 py-2 rounded-2xl bg-gray-200 border-[1px]" : ""}w-20  flex justify-center items-center hover:text-gray-500 font-semibold cursor-pointer `}>
                            Module
                        </Link>
                        <Link href={"/forum/forum-dashboard"} className={`${pathname === "/forum/forum-dashboard" ? "px-3 py-2 rounded-2xl bg-gray-200 border-[1px]" : ""}w-20  flex justify-center items-center hover:text-gray-500 font-semibold cursor-pointer `}>
                            Forum
                        </Link>
                        <Link href={"/email"} className={`${pathname === "/email" ? "px-3 py-2 rounded-2xl bg-gray-200 border-[1px]" : ""}w-20  flex justify-center items-center hover:text-gray-500 font-semibold px-3 py-2  cursor-pointer`}>
                            Email
                        </Link>
                    </section>
                </MaxWidthWrapper>
            </form>
        </div>
    )
}  