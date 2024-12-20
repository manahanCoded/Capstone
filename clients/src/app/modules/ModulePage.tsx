"use client"

import Link from "next/link";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import checkModule from "@/Configure/checkModule";
import { useEffect, useState } from "react";
import checkAdmin from "@/Configure/checkAdmin";


type ModuleProps = {
  modules: checkModule[]
}

export default function ModulesPage({ modules }: ModuleProps) {

  const [checkAdmin, setCheckAdmin] = useState<checkAdmin | null>(null)
  useEffect(() => {
    async function checkUser() {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      setCheckAdmin(data);

    }
    checkUser();
  }, []);

  return (
    <div className="mt-14">
      <MaxWidthWrapper className="pt-14 ">
        <section>
          <h2 className="md:text-3xl text-2xl font-semibold tracking-wide text-green-700">
            Beginner Topics
          </h2>
          <div className="lg:w-[90%] w-fit mt-2 border-t-2 border-green-600">
            <div className="py-8 px-4 flex md:flex-wrap flex-row gap-5  lg:overflow-x-hidden overflow-auto-scroll ">
              {modules.map((module, index) => (
                <section key={index} className="p-3 lg:w-72 md:w-64 w-56 rounded-md  border-2 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <h3 className="lg:text-lg md:text-base line-clamp-2 text-sm p-2 pb-1 text-white text-center rounded-t-md font-semibold bg-green-400 ">
                    {module.title}
                  </h3>
                  <div className="flex flex-row flex-wrap gap-2 mt-4 md:mb-10 mb-4">
                    <p className="border-2 px-2 py-1 rounded-lg lg:text-[0.7rem] md:text-[0.6rem] text-[0.5rem] tracking-wide">
                      Blockchain
                    </p>
                    <p className="border-2 px-2 py-1 rounded-lg lg:text-[0.7rem] md:text-[0.6rem] text-[0.5rem] tracking-wide">
                      How does blockchain work?
                    </p>
                    <p className="border-2 px-2 py-1 rounded-lg lg:text-[0.7rem] md:text-[0.6rem] text-[0.5rem] tracking-wide">
                      Bitcoin Mining
                    </p>
                  </div>
                  <p className="md:text-sm text-xs line-clamp-3 font-sans"
                    dangerouslySetInnerHTML={{ __html: module.description }}
                  >
                  </p>
                  <section className="flex justify-end items-center flex-row pt-8 pb-2 gap-2 w-full">
                    {checkAdmin?.role === "admin"? (
                      <Link
                        href={`http://localhost:3000/modules/create-module/posts/${module.id}`}
                        className="lg:text-sm text-xs border-green-600 hover:bg-green-600 hover:text-white w-20 border-2 p-1.5 rounded-lg text-black text-center gap-2 md:font-bold font-semibold"
                      >
                        Edit
                      </Link>
                    ) : (
                      null
                    )}
                    <div className="group ">
                    <Link
                      href={`/modules/docs/${module.id}`}
                      className=" lg:text-sm text-xs bg-green-600 border-green-600 w-32 border-2 p-2 rounded-lg text-white gap-2 text-center group-hover:animate-bounce active:animate-ping md:font-bold font-semibold"
                    >
                      Dive Into Topic
                    </Link>
                    </div>
                  </section>
                </section>
              ))}
            </div>
          </div>
        </section>

      </MaxWidthWrapper>
    </div>
  );
};


