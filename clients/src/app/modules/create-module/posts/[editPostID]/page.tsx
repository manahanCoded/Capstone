"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Editpost from "./EditorPost";

type Post = {
  title: string;
  description: string;
  information: string;
};

const Edit = () => {
  const params = useParams(); // Get dynamic route parameters

  const editPostID = typeof params.editPostID === "string" ? params.editPostID : ""; // Ensure it's a string

  const [post, setPost] = useState<Post | null>(null); // State to store the fetched post

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (editPostID) {
          const response = await axios.post(`http://localhost:5000/api/module/getPostId`, {
            id: params.editPostID,
          });

          if (response.data.success) {
            setPost(response.data.listId[0]);
          } else {
            console.error("Post not found");
          }
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost(); // Fetch the post if `editPostID` is valid
  }, [editPostID]);

  return (
    <div className="mt-14 container mx-auto">
      {post ? (
        <Editpost postList={[post]} editPostID={parseInt(editPostID)} />
      ) : (
        <div className="text-center">Post not found</div>
      )}
    </div>
  );
};

export default Edit;
