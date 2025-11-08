import express from 'express'
import {getAllTask, createTask, delTask, putTask } from '../controllers/taskController.js'   
const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTask);

router.put("/:id",putTask);
router.delete("/:id",delTask);

export default router;