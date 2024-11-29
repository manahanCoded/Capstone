"use client";

import React, { useState, useEffect } from "react";
import "quill/dist/quill.snow.css";
import checkModule from "@/Configure/checkModule";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

type ModuleProps = {
  module: checkModule[];
};

function Modules({ module }: ModuleProps) {
  const [posts, setPosts] = useState<checkModule[]>([]);

  useEffect(() => {
    setPosts(module);
  }, [module]);

  return (
    <div className="mt-14">
      <MaxWidthWrapper className="py-14">
        <div className="lg:w-3/5 md:w-4/5 m-auto">
          {posts.map((post) => (
            <div key={post.id}>
              <h1 className="flex flex-col font-extrabold text-5xl    ">
                <span className="font-bold text-red-900 text-lg">
                  Introducing
                </span>{" "}
                {post.title}
              </h1>
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: post.information }}
              />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Modules;
