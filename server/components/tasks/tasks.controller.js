import TasksService from "./tasks.service";
import { Codes } from "../../shared/utils";

const TaskController = {};

TaskController.getAll = async (req, res) => {
  try {
    const tasks = await TasksService.getAll();
    return res.send(tasks);
  } catch (err) {
    return res.status(Codes.BAD_REQUEST).send({ err });
  }
};

TaskController.create = async (req, res) => {
  try {
    const taskToCreate = req.body;
    const newTask = await TasksService.create(taskToCreate);
    return res.send(newTask);
  } catch (err) {
    return res.status(Codes.BAD_REQUEST).send({ err });
  }
};

TaskController.patch = async (req, res) => {
  try {
    const id = req.params.id;
    const task = req.body;

    if (id && task) {
      const updatedTask = await TasksService.patch(id, task);
      return res.send(updatedTask);
    } else {
      //TODO: handle error properly
      return res.sendStatus(Codes.BAD_REQUEST);
    }
  } catch (err) {
    return res.status(Codes.BAD_REQUEST).send({ err });
  }
};

TaskController.delete = async (req, res) => {
  try {
    const deletedTask = await TasksService.deleteById(req.params.id);
    if (deletedTask) {
      return res.send(deletedTask);
    } else {
      //TODO: handle error properly
      return res.sendStatus(Codes.BAD_REQUEST);
    }
  } catch (err) {
    return res.status(Codes.BAD_REQUEST).send({ err });
  }
};

export default TaskController;
