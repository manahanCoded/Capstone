import { Router } from "express";
import { addArticle, allPost, editArticle, getPostId } from "./Controllers/Module_Controller.mjs";

const router = Router() 

router.get('/allPost', allPost)

router.post('/addArticle', addArticle)

router.post('/getPostId', getPostId)

router.post('/editArticle', editArticle)

export default router