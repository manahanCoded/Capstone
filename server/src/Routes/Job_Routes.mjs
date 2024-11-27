import { Router } from "express";

import { create_job, display_job } from "./Controllers/Job_Controller.mjs";

const router = Router()

router.post("/create", create_job)
router.get("/display", display_job)

export default router