"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Editpost from "./EditPost"; 
import { useRouter } from "next/router";

type Post = {
  title: string;
  description: string;
  information: string;
  // Add any other post-related fields as needed
};

const Edit = () => {
  const router = useRouter();
  const { postID } = router.query; // This will get the postID from the URL

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (postID) {
      viewPostId(postID as string); // Ensure postID is a string
    }
  }, [postID]);

  const viewPostId = async (id: string) => {
    try {
      const response = await axios.post("http://localhost:500/api/module/getModuleId", {
        ids: id,
      });
      if (response.data.success) {
        setPost(response.data.listId[0]); // Assuming listId contains the post data
        setIsLoading(false);
      } else {
        setError("Failed to load post data.");
        setIsLoading(false);
      }
    } catch {
      setError("An error occurred while fetching the post.");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-14 container mx-auto">
      {post ? (
        <Editpost postList={[post]} editPostID={parseInt(postID as string, 10)} />
      ) : (
        <div className="text-center">Post not found</div>
      )}
    </div>
  );
  
};

export default Edit;
