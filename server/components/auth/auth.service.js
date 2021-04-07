import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../users/user.model";
import debugLib from "debug";

const debug = debugLib("dev");

const AuthService = {};

AuthService.generateAccessToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: "30m" });
};

AuthService.registerUser = async (userToRegister) => {
  //TODO: validate fields

  try {
    let userFromDB = await UserModel.findOne({ email: userToRegister.email });

    if (userFromDB) {
      //TODO: handle errors better
      return "User already exists.";
    }

    //hash pass before saving
    const salt = await bcrypt.genSalt(10);
    userToRegister.password = await bcrypt.hash(userToRegister.password, salt);

    const newUser = await UserModel.create({
      name: userToRegister.name,
      username: userToRegister.username,
      email: userToRegister.email,
      password: userToRegister.password,
    });

    //add JWT to user object
    const payload = {
      username: newUser.username,
    };

    const token = await AuthService.generateAccessToken(payload);

    const userObject = newUser.toObject();
    delete userObject.password;
    userObject.token = token;

    return userObject;
  } catch (err) {
    return err;
  }
};

AuthService.signInUser = async (username, password) => {
  //TODO: validate username, password
  try {
    const user = await UserModel.findOne({ username });

    if (!user) return "User not found.";

    const isPassMatching = await bcrypt.compare(password, user.password);

    if (!isPassMatching) return "Incorrect password.";

    const payload = {
      username: user.username,
    };

    const token = await AuthService.generateAccessToken(payload);

    const userObject = user.toObject();
    delete userObject.password;
    userObject.token = token;

    return userObject;
  } catch (err) {
    return error;
  }
};

export default AuthService;
