import { validateOrReject } from "class-validator";
import { Request, Response } from "express";

import { PROJECT_MESSAGES } from "../constants/messages";
import { CreateProjectDto } from "../dto/project/CreateProjectDto";
import { UpdateProjectDto } from "../dto/project/UpdateProjectDto";
import CustomError from "../error/customError";
import Client from "../models/client";
import Project from "../models/project";

export const createProject = async (req: Request, res: Response) => {
  try {
    const dto = new CreateProjectDto();
    Object.assign(dto, req.body);
    await validateOrReject(dto);

    const client = await Client.findByPk(dto.clientId);
    if (!client) {
      res.status(404).json({ message: PROJECT_MESSAGES.CLIENT_NOT_FOUND });
      return;
    }

    const project = await Project.create({
      ...dto,
      clientId: dto.clientId,
    });

    res
      .status(201)
      .json({ message: PROJECT_MESSAGES.PROJECT_CREATED, project });
  } catch (error) {
    console.error(error);
    throw CustomError.InternalServerError();
  }
};

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.findAll({ include: [Client] });
    res.status(200).json(projects);
  } catch (error) {
    throw CustomError.InternalServerError();
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      res.status(404).json({ message: PROJECT_MESSAGES.PROJECT_NOT_FOUND });
      return;
    }
    res.status(200).json(project);
  } catch (error) {
    throw CustomError.InternalServerError();
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      res.status(404).json({ message: PROJECT_MESSAGES.PROJECT_NOT_FOUND });
      return;
    }

    const dto = new UpdateProjectDto();
    Object.assign(dto, req.body);
    await validateOrReject(dto);

    await project.update(dto);

    res
      .status(200)
      .json({ message: PROJECT_MESSAGES.PROJECT_UPDATED, project });
  } catch (error) {
    throw CustomError.InternalServerError();
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      res.status(404).json({ message: PROJECT_MESSAGES.PROJECT_NOT_FOUND });
      return;
    }

    await project.destroy();
    res.status(200).json({ message: PROJECT_MESSAGES.PROJECT_DELETED });
  } catch (error) {
    throw CustomError.InternalServerError();
  }
};
