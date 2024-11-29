import Modules from "./Modules";
import axios from "axios";
import checkModule from "@/Configure/checkModule";

export default async function Docs({ params }: { params: { docsID: string } }) {
  try {
    const res = await axios.get("http://localhost:5000/api/module/allModule");
    const moduleName: checkModule[] = res.data.listall;
    const moduleID = await params
    const selectedModule  = moduleName.find(
      (module) => module.id === parseInt(moduleID.docsID)
    );

    if (!selectedModule) {
      return (
        <>
          <div className="container mx-auto text-center mt-8">
            <h1 className="text-2xl font-bold text-red-500">Module Not Found</h1>
          </div>
        </>
      );
    }

    return (
      <>
        <Modules module={[selectedModule]} />
      </>
    );
  } catch (error) {
    console.error("Error fetching module:", error);
    return (
      <>
        <div className="container mx-auto text-center mt-8">
          <h1 className="text-2xl font-bold text-red-500">Failed to load data</h1>
        </div>
      </>
    );
  }
}
