import express from "express";

import { signup, login } from "../controllers/signUpController.js";

const router = express.Router();

router.post("/signupUser", signup);
router.post("/loginUser", login);

export default router;
