import { Request, Response } from "express";
import Task from "../models/task.model";

class TaskController {
  public async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const { date } = req.params;

      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        res.status(400).json({ message: "Invalid date format" });
        return;
      }

      const tasks = await Task.find({
        date: {
          $gte: new Date(parsedDate.setHours(0, 0, 0, 0)),
          $lt: new Date(parsedDate.setHours(23, 59, 59, 999)),
        },
      }).sort({ pinned: -1, createdAt: -1 });

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  public async addTask(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, date } = req.body;

      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        res.status(400).json({ message: "Invalid date format" });
        return;
      }

      const newTask = new Task({
        name,
        description,
        date: parsedDate,
      });

      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unable to create task" });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;

      const validStatuses = ["completed", "pending"];
      const updateTodoObj: Record<string, any> = {};

      if (updates.hasOwnProperty("pinned")) {
        updateTodoObj.pinned = updates.pinned;
      }

      if (updates.hasOwnProperty("memo")) {
        updateTodoObj.memo = updates.memo;
      }

      if (
        updates.hasOwnProperty("status") &&
        validStatuses.includes(updates.status)
      ) {
        updateTodoObj.status = updates.status;
      }

      if (Object.keys(updateTodoObj).length === 0) {
        res
          .status(400)
          .json({ message: "No valid fields provided for update" });
        return;
      }

      const updatedTask = await Task.findByIdAndUpdate(id, updateTodoObj, {
        new: true,
      });

      if (!updatedTask) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: "Unable to update task" });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await Task.findByIdAndDelete(id);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Unable to delete task" });
    }
  }
}

export default TaskController;
