import TaskModel from "./task.model";

const TasksService = {};

TasksService.getAll = async function () {
  try {
    return await TaskModel.find();
  } catch (err) {
    return err;
  }
};

TasksService.create = async function (task) {
  try {
    return TaskModel.create(task);
  } catch (err) {
    return err;
  }
};

TasksService.patch = async function (id, task) {
  try {
    return await TaskModel.findByIdAndUpdate(id, task, { new: true });
  } catch (err) {
    return err;
  }
};

TasksService.deleteById = async function (id) {
  try {
    return TaskModel.findByIdAndDelete(id);
  } catch (err) {
    return err;
  }
};

export default TasksService;
