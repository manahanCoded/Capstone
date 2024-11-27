import { Router } from "express";
import { login, google_login, google_login_callback, register, logout, userInfo} from "./Controllers/User_Controller.mjs";
import { Validate_Login, Validate_Register } from "../Middleware/Validaitors/User_Validator.mjs";

const router = Router()

router.post("/login", Validate_Login, login)
router.get('/auth/google', google_login)
router.get('/auth/google/callback', google_login_callback)
router.post("/register", Validate_Register, register)
router.post("/logout", logout)
router.get("/profile", userInfo)

export default router