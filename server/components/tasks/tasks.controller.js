import TasksService from "./tasks.service";

const TaskController = {};

TaskController.getAll = async (req, res, next) => {
  try {
    const tasks = await TasksService.getAll();
    return res.send(tasks);
  } catch (err) {
    return res.status(400).send({ err });
  }
};

TaskController.create = async (req, res, next) => {
  try {
    const newTask = await TasksService.create(req.body);
    return res.send(newTask);
  } catch (err) {
    return res.status(400).send({ err });
  }
};

TaskController.patch = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = req.body;

    if (id && task) {
      const updatedTask = await TasksService.patch(id, task);
      return res.send(updatedTask);
    } else {
      //TODO: handle error properly
      return res.sendStatus(400);
    }
  } catch (err) {
    return res.status(400).send({ err });
  }
};

TaskController.delete = async (req, res, next) => {
  try {
    const deletedTask = await TasksService.deleteById(req.params.id);
    if (deletedTask) {
      return res.send(deletedTask);
    } else {
      //TODO: handle error properly
      return res.sendStatus(400);
    }
  } catch (err) {
    return res.status(400).send({ err });
  }
};

export default TaskController;
