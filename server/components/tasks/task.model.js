import mongoose from "mongoose";

export const taskSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("Task", taskSchema);

export default TaskModel;
