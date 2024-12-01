"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function User() {
  const router = useRouter();

  useEffect(() => {
    router.push("/user/login");
  }, [router]); 

  return null; 
}

export default User;