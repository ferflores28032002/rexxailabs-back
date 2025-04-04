import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import multer from "multer";
import { Op } from "sequelize";

import { CLIENT_MESSAGES } from "../constants/messages";
import { CreateClientDto } from "../dto/client/CreateClientDto";
import { UpdateClientDto } from "../dto/client/UpdateClientDto";
import CustomError from "../error/customError";
import Client from "../models/client";
import User from "../models/user";
import { uploadImage } from "../services/ImageService";
import Project from "../models/project";

const upload = multer({ storage: multer.memoryStorage() });
export const uploadClientImage = upload.single("image");

export const createClient = async (req: Request, res: Response) => {
  try {
    const dto = new CreateClientDto();
    Object.assign(dto, req.body);
    await validateOrReject(dto);

    const userId = (req as any).userId;
    if (!userId) {
      res.status(401).json({ message: CLIENT_MESSAGES.UNAUTHORIZED });
      return;
    }

    const existing = await Client.findOne({ where: { email: dto.email } });
    if (existing) {
      res.status(400).json({ message: CLIENT_MESSAGES.CLIENT_EXISTS });
      return;
    }

    const imageUrl = req.file ? await uploadImage(req.file) : null;

    const client = await Client.create({
      ...dto,
      image: imageUrl,
      userId,
    });

    res.json({ message: CLIENT_MESSAGES.CLIENT_CREATED, client });
  } catch (error) {
    throw CustomError.InternalServerError();
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.findAll({
      include: [User, { model: Project }],
    });
    res.status(200).json(clients);
  } catch (error) {
    throw CustomError.InternalServerError();
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      res.status(404).json({ message: CLIENT_MESSAGES.CLIENT_NOT_FOUND });
      return;
    }
    res.status(200).json(client);
  } catch (error) {
    throw CustomError.InternalServerError();
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      res.status(404).json({ message: CLIENT_MESSAGES.CLIENT_NOT_FOUND });
      return;
    }

    const dto = new UpdateClientDto();
    Object.assign(dto, req.body);
    await validateOrReject(dto);

    const existing = await Client.findOne({
      where: {
        email: dto.email,
        id: { [Op.ne]: req.params.id },
      },
    });

    if (existing) {
      res.status(400).json({ message: CLIENT_MESSAGES.CLIENT_EXISTS });
      return;
    }

    const imageUrl = req.file ? await uploadImage(req.file) : client.image;

    await client.update({ ...dto, image: imageUrl });

    res.status(200).json({ message: CLIENT_MESSAGES.CLIENT_UPDATED, client });
  } catch (error) {
    throw CustomError.InternalServerError();
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      res.status(404).json({ message: CLIENT_MESSAGES.CLIENT_NOT_FOUND });
      return;
    }

    await client.destroy();
    res.status(200).json({ message: CLIENT_MESSAGES.CLIENT_DELETED });
  } catch (error) {
    throw CustomError.InternalServerError();
  }
};
