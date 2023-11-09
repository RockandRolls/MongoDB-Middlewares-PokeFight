import ErrorStatus from "../utils/errorStatus.js";
import chalkLog from "../lib/chalkColors.js";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const oneUser = async (req, res, next) => {
    try {
        const findUser = await UserModel.findById(req.userId);

        return res.json(findUser);
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            throw new ErrorStatus("Please provide all required field", 400);

        const findUser = await UserModel.findOne({ username }).select(
            "+password"
        );
        if (!findUser) throw new ErrorStatus("User does not exist", 404);

        const pwdMatch = await bcrypt.compare(password, findUser.password);
        if (!pwdMatch) throw new ErrorStatus("Password mismatch", 400);

        const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.set("authorization", token);
        return res.end();
    } catch (error) {
        next(error);
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        if (!firstName || !lastName || !email || !username || !password)
            throw new ErrorStatus("Missing required fields", 400);

        const hashedPwd = await bcrypt.hash(password, 10);

        const { _id } = await UserModel.create({
            firstName,
            lastName,
            email,
            username,
            password: hashedPwd,
        });

        const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Set the token in the headers of the response
        res.set("authorization", token);
        return res.sendStatus(201);

        // Or send the token in the body of the response
        // return res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

export { oneUser, loginUser, registerUser };
