import { Router } from "express";
import { addModule, allModule, editModule, getModuleId, addQuestion, allQuestion , deleteModule} from "./Controllers/Module_Controller.mjs";

const router = Router() 

router.get('/allModule', allModule)

router.post('/addModule', addModule)

router.post('/getPostId', getModuleId)

router.post('/editModule', editModule)

router.get('/allQuestions', allQuestion)

router.post('/addQuestions', addQuestion)

router.delete('/deleteModules/:id', deleteModule)

export default router