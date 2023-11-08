import ErrorStatus from "../utils/errorStatus.js";
import chalkLog from "../lib/chalkColors.js";
import UserModel from "../models/userModel.js";

//keep for leaderboard
const allUsers = async (req, res, next) => {
    try {
        const getUsers = await UserModel.find().sort("-battlesWon");
        return res.json(getUsers);
    } catch (error) {
        next(error);
    }
};

//everything below this line will be deprecated with auth routes
const singleUser = async (req, res, next) => {
    const { username } = req.params;
    const { password } = req.body;
    try {
        const getUser = await UserModel.findOne({ username });
        console.log(getUser);
        //for now doesn't use password, when I refactor for auth it will
        // if (password !== getUser.password) {
        //     throw new ErrorStatus("Invalid username or password", 400);
        // }
        return res.json(getUser);
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

export { allUsers, singleUser, createUser, editBattles };
