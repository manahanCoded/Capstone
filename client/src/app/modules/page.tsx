import ModulesPage from "@/app/modules/ModulePage";
import checkModule from "@/Configure/checkModule";
import axios from "axios";

export default async function Modules() {
  const res = await axios.get("http://localhost:5000/api/module/allModule");
  const moduleName: checkModule[] = res.data.listall;

  return (
    <>
      <ModulesPage modules={moduleName} />
    </>
  );
}
