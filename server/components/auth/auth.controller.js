import AuthService from "./auth.service";
import { Codes } from "../../shared/utils";
import debugLib from "debug";

const debug = debugLib("dev");

const AuthController = {};

AuthController.registerUser = async (req, res) => {
  try {
    const user = req.body;
    const registeredUser = await AuthService.registerUser(user);
    debug(`User: ${registeredUser}`);
    res.set({ "X-AuthToken": registeredUser.token });
    return res.send(registeredUser);
  } catch (err) {
    debug(err);
    return res.status(Codes.BAD_REQUEST).send(err);
  }
};

AuthController.signInUser = async (req, res) => {
  try {
    // parse username and password from headers
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const [username, password] = Buffer.from(b64auth, "base64")
      .toString()
      .split(":");

    // const { username, password } = req.body;
    const user = await AuthService.signInUser(username, password);
    res.set({ "X-AuthToken": user.token });
    return res.send(user);
  } catch (err) {
    return res.status(Codes.BAD_REQUEST).send({ err });
  }
};

export default AuthController;
