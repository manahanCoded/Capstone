import { Router } from "express";
import { addModule, allModule, editModule, getModuleId } from "./Controllers/Module_Controller.mjs";

const router = Router() 

router.get('/allModule', allModule)

router.post('/addModule', addModule)

router.post('/getPostId', getModuleId)

router.post('/editModule', editModule)

export default router