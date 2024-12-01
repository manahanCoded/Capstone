"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import EditorToolbar, { modules, formats } from "@/components/EditorToolbar";

type UserInfo = {
  title: string;
  description: string;
  information: string;
};

function CreateModulePage() {
  const router = useRouter();

  useEffect(()=>{
    async function checkUser() {
      const res = await fetch("http://localhost:5000/api/user/profile",{
        method: "GET",
        credentials: "include",
      })
          if (!res.ok) {
        const data = await res.json();
        router.push("/user/login")
      }
    }
    checkUser()
  },[])

  const [userInfo, setUserInfo] = useState<UserInfo>({
    title: "",
    description: "",
    information: "",
  });
  const [isError, setError] = useState<string | null>(null);

  // Handle changes for input fields
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes for description and information (Quill editors)
  const onDescription = (value: string) => {
    setUserInfo({ ...userInfo, description: value });
  };

  const onInformation = (value: string) => {
    setUserInfo({ ...userInfo, information: value });
  };

  // Handle form submission
  const addDetails = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation for title and description
    if (!userInfo.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (userInfo.description.length < 50) {
      setError("Description must be at least 50 characters long.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/module/addModule", {
        title: userInfo.title,
        description: userInfo.description,
        information: userInfo.information,
      });

      if (res.data.success) {
        router.push("/");
      } else {
        setError("An error occurred while submitting the form.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="mt-14 container mx-auto ">
      <form onSubmit={addDetails} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-semibold mb-4">Create Module</h3>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={userInfo.title}
            onChange={onChangeValue}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the title"
            required
          />
        </div>

        {/* Description (Quill Editor) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <EditorToolbar toolbarId="t1" />
          <ReactQuill
            theme="snow"
            value={userInfo.description}
            onChange={onDescription}
            placeholder="Write something awesome..."
            modules={modules("t1")}
            formats={formats}
            className="bg-white border rounded"
          />
        </div>

        {/* Additional Information (Quill Editor) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Additional Information
          </label>
          <EditorToolbar toolbarId="t2" />
          <ReactQuill
            theme="snow"
            value={userInfo.information}
            onChange={onInformation}
            placeholder="Write something more..."
            modules={modules("t2")}
            formats={formats}
            className="bg-white border rounded"
          />
        </div>

        {/* Error Message */}
        {isError && <div className="text-red-500 text-sm mb-4">{isError}</div>}

        {/* Submit Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateModulePage
