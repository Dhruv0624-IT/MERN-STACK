import { Router } from "express";
import { changepassword, profile, signin, signup, verifyUser } from "../controllers/user.controller.js";
import { checkUser } from "../middlewares/verify.js";
import upload from "../middlewares/upload.js";

const router = Router()
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/verify', verifyUser)
router.post('/profile', checkUser,upload.single('user_profile') ,profile)
router.post('/changepassword', checkUser, changepassword)
export default router