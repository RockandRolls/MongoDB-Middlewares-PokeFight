import express from "express";
import {
    allUsers,
    createUser,
    editBattles,
    singleUser,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.route("/").get(allUsers).post(createUser).patch(editBattles);
userRouter.route("/:username").get(singleUser);

export default userRouter;
