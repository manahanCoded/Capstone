"use client";

import React, { useState, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReactQuill from "react-quill-new";
import EditorToolbar, { modules, formats } from "@/components/EditorToolbar";
import checkAdmin from "@/Configure/checkAdmin";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface EditPostProps {
  postList: {
    title: string;
    description: string;
    information: string;
  }[];
  editPostID: number;
}

const EditPost: React.FC<EditPostProps> = ({ postList, editPostID }) => {
  const [, setCheckAdmin] = useState<checkAdmin | null>(null)
  useEffect(() => {
    async function checkUser() {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        router.push("/user/login");
        return;
      }
      const data = await res.json();
      setCheckAdmin(data);

      if (data.role === "client") {
        alert("Unauthorized access!");
        router.push("/modules");
      }
    }
    checkUser();
  }, []);

  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    title: postList[0]?.title || "",
    description: postList[0]?.description || "",
    information: postList[0]?.information || "",
  });

  const [isError, setError] = useState<string | null>(null);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onDescriptionChange = (value: string) => {
    setUserInfo({
      ...userInfo,
      description: value,
    });
  };

  const onInformationChange = (value: string) => {
    setUserInfo({
      ...userInfo,
      information: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userInfo.description.length < 50) {
      setError("Required: Add description with a minimum length of 50 characters.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/module/editModule", {
        title: userInfo.title,
        description: userInfo.description,
        information: userInfo.information,
        ids: editPostID,
      });

      if (response.data.success === true) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error editing article:", error);
    }
  };

  const deleteModule = async()=>{

    await axios.delete(`http://localhost:5000/api/module/deleteModules/${editPostID}`)
      router.push("/modules")

  }

  return (
    <div className="mt-14 container mx-auto ">
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <MaxWidthWrapper>
              <div className="w-full flex items-center justify-between gap-2">
              <h3 className="text-xl font-semibold mb-4">Edit</h3>
              <button onClick={deleteModule} className="bg-red-800 py-2 px-4 rounded-md text-white hover:bg-red-900">Delete</button>
              </div>
              <div className="form-row">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={userInfo.title}
                    onChange={onChangeValue}
                    className="form-control w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Title"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <EditorToolbar toolbarId="t1" />
                  <ReactQuill
                    theme="snow"
                    value={userInfo.description}
                    onChange={onDescriptionChange}
                    placeholder="Write something awesome..."
                    modules={modules("t1")}
                    formats={formats}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Additional Information
                  </label>
                  <EditorToolbar toolbarId="t2" />
                  <ReactQuill
                    theme="snow"
                    value={userInfo.information}
                    onChange={onInformationChange}
                    placeholder="Write something awesome..."
                    modules={modules("t2")}
                    formats={formats}
                  />
                </div>

                {isError && <div className="errors">{isError}</div>}

                <div className="form-group col-sm-12 text-right">
                  <button type="submit" className="bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                  </button>
                </div>
              </div>
            </MaxWidthWrapper>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
