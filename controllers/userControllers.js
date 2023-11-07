import ErrorStatus from "../utils/errorStatus.js";
import chalkLog from "../lib/chalkColors.js";
import UserModel from "../models/userModel.js";

const allUsers = async (req, res, next) => {
    try {
        const getUsers = await UserModel.find();
        return res.json(getUsers);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        if (!firstName || !lastName || !email || !username || !password)
            throw new ErrorStatus("Missing required fields", 400);

        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            username,
            password,
        });

        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const editBattles = async (req, res, next) => {
    try {
        const { username, wonBattle } = req.body;
        if (!username || wonBattle === undefined)
            throw new ErrorStatus("Please send all required fields", 400);

        if (!wonBattle) {
            const battleLost = await UserModel.findOneAndUpdate(
                { username },
                { $inc: { battlesLost: 1 } },
                { runValidators: true, new: true }
            );

            return res.json(battleLost);
        } else if (wonBattle) {
            const battleWon = await UserModel.findOneAndUpdate(
                { username },
                { $inc: { battlesWon: 1 } },
                { runValidators: true, new: true }
            );

            return res.json(battleWon);
        }
    } catch (error) {
        next(error);
    }
};

export { allUsers, createUser, editBattles };
