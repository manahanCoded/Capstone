"use client";
import { useState } from "react";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import checkJob from "@/Configure/checkJob";

type CheckJobPageProps = {
  information: checkJob;
};

export default function CheckJobPage({ information }: CheckJobPageProps) {
  const [typeForm, setTypeForm] = useState<string>("details");

  return (
    <div className="mt-14 text-sm">
      <section className=" border-b-2">
        <MaxWidthWrapper className=" w-2/4 h-16  flex justify-between items-center">
          <div className="h-16  flex flex-row">
            <div
              className={
                typeForm === "details"
                  ? "px-4 flex items-center cursor-pointer text-white bg-red-900"
                  : "px-4 flex items-center cursor-pointer"
              }
              onClick={() => setTypeForm("details")}
            >
              <p>Details</p>
            </div>
            <div
              className={
                typeForm === "questions"
                  ? "px-4 flex items-center cursor-pointer text-white bg-red-900 "
                  : "px-4 flex items-center cursor-pointer"
              }
              onClick={() => setTypeForm("questions")}
            >
              <p>Questions</p>
            </div>
          </div>
          <Link
            href="/forum"
            className=" flex gap-1 items-center p-2  rounded-lg border-2 border-red-900 text-red-900 hover:bg-red-900 hover:border-red-900 hover:text-white"
          >
            <ExitToAppIcon />
            Back
          </Link>
        </MaxWidthWrapper>
      </section>

      <section className={typeForm === "details" ? "block py-14 " : "hidden"}>
        <MaxWidthWrapper>
          <section className="flex flex-col gap-4 md:w-2/4 p-4 md:px-8  m-auto rounded-lg  ">
            <h1 className="text-3xl">{information.title}</h1>
            <div className="flex flex-row gap-3">
              <p className="border-[1px] rounded-xl p-1">{information.state}</p>
              <p className="border-[1px] rounded-xl p-1">{information.city}</p>
              <p className="border-[1px] rounded-xl p-1">
                {new Date(information.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p
                className=""
                dangerouslySetInnerHTML={{ __html: information.description }}
              ></p>
            </div>
          </section>
        </MaxWidthWrapper>
      </section>

      <section className={typeForm === "questions" ? "block py-14 " : "hidden"}>
        <MaxWidthWrapper>
          <section className="flex flex-col gap-4 md:w-2/4 p-4 md:px-8  m-auto rounded-lg bg-gray-100 ">
            <h1>{information.title}</h1>
          </section>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
