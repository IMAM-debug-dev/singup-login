import express from "express";
import { login, logout, registerUser } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login" ,  login )
router.post("/logout" , logout )

export default router;