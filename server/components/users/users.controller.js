import UsersService from "./users.service";

const UsersController = {};

UsersController.getAll = async (req, res, next) => {
  return res.send("Get users");
};

UsersController.create = async (req, res, next) => {
  return res.send("Create user");
};

UsersController.delete = async (req, res, next) => {
  return res.send("Delete user");
};

export default UsersController;
