import { Router } from "express";
import { allMails, sendMails } from "./Controllers/Mail_Controller.mjs";

const router = Router()

router.get("/allMail", allMails )

router.post("/sendMail", sendMails )


export default router