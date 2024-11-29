"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill-new/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import axios from "axios";

// Dynamically import ReactQuill to ensure proper SSR handling in Next.js
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface EditPostProps {
  postList: {
    title: string;
    description: string;
    information: string;
  }[];
  editPostID: number;
}

const EditPost: React.FC<EditPostProps> = ({ postList, editPostID }) => {
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
      const response = await axios.post("http://localhost:5000/editModule", {
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

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit} className="update__forms">
            <h3 className="myaccount-content">Edit</h3>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label className="font-weight-bold">
                  Title <span className="required"> * </span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={userInfo.title}
                  onChange={onChangeValue}
                  className="form-control"
                  placeholder="Title"
                  required
                />
              </div>

              <div className="form-group col-md-12 editor">
                <label className="font-weight-bold">
                  Description <span className="required"> * </span>
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

              <br />

              <div className="form-group col-md-12 editor">
                <label className="font-weight-bold">Additional Information</label>
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

              <br />

              {isError && <div className="errors">{isError}</div>}

              <div className="form-group col-sm-12 text-right">
                <button type="submit" className="btn btn__theme">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
