import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  getProjectById,
  updateProject,
} from "../controllers/projectController";
import { authenticateToken } from "../middleware/auth.middleware";

const projectRouter = Router();

projectRouter.post("/", authenticateToken, createProject);
projectRouter.get("/", authenticateToken, getProjects);
projectRouter.get("/:id", authenticateToken, getProjectById);
projectRouter.put("/:id", authenticateToken, updateProject);
projectRouter.delete("/:id", authenticateToken, deleteProject);

export default projectRouter;
