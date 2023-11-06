import ErrorStatus from '../utils/errorStatus.js';
import chalkLog from '../lib/chalkColors.js';
import UserModel from '../models/userModel.js';

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
    const { last_name, first_name, email } = req.body;
    if (!last_name || !first_name || !email)
      throw new ErrorStatus('Missing required fields', 400);

    // const createUser = new UserModel({ last_name, first_name, email });
    // const newUser = await createUser.save();

    const newUser = await UserModel.create({
      last_name,
      first_name,
      email,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const editUsers = async (req, res, next) => {
  try {
    // const updateUser = await UserModel.findOneAndUpdate(
    //   { first_name: 'John' },
    //   { $set: { first_name: 'Bob' } },
    //   { runValidators: true, new: true }
    // );

    // return res.json(updateUser);

    const { last_name, first_name, email } = req.body;
    if (!email || !last_name || !first_name)
      throw new ErrorStatus('Please send all required fields', 400);

    const updateUser = await UserModel.findOneAndUpdate(
      { email },
      { last_name, first_name },
      { runValidators: true, new: true }
    );

    return res.json(updateUser);
  } catch (error) {
    next(error);
  }
};

export { allUsers, createUser, editUsers };