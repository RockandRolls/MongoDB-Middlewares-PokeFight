import express from "express";
import {
    allUsers,
    createUser,
    editBattles,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.route("/").get(allUsers).post(createUser).patch(editBattles);

export default userRouter;
