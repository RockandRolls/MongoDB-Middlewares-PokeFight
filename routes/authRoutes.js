import express from "express";
import {
    oneUser,
    loginUser,
    registerUser,
} from "../controllers/authControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = express.Router();

authRouter.use(express.json());

authRouter.route("/login").post(loginUser);
authRouter.route("/register").post(registerUser);
authRouter.route("/me").get(verifyToken, oneUser);

export default authRouter;
