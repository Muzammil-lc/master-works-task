import express from "express";
import TaskController from "../controllers/task.controller";

const router = express.Router();
const taskController = new TaskController();

router.get("/:date", taskController.getTasks);
router.post("/", taskController.addTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
