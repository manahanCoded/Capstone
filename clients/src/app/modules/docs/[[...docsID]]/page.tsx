"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import checkModule from "@/Configure/checkModule";
import Modules from "./Modules";


export default function Docs() {
  const [selectedModule, setSelectedModule] = useState<checkModule | null>(null);
  
  const params = useParams();

  useEffect(()=>{
    async function checkUser() {
      const res = await fetch("http://localhost:5000/api/user/profile",{
        method: "GET",
        credentials: "include",
      })
          if (!res.ok) {
        const data = await res.json();
     
      }
    }
    checkUser()
  },[])

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/module/allModule");
        const moduleName: checkModule[] = res.data.listall;
        const docsID = Array.isArray(params.docsID) ? params.docsID[0] : params.docsID;

        if (docsID) {
          const selected = moduleName.find(
            (module) => module.id === parseInt(docsID, 10)
          );
          setSelectedModule(selected || null);
        } else {
          alert("Invalid module ID");
        }
      } catch (error) {
        console.error("Failed to fetch module data:", error);
      }
    };

    fetchModuleData();
  }, [params.docsID]);

  return (
    <>
      <Modules module={selectedModule} />
    </>
  );
}
