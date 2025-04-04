"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClientById = exports.getClients = exports.createClient = exports.uploadClientImage = void 0;
const class_validator_1 = require("class-validator");
const multer_1 = __importDefault(require("multer"));
const sequelize_1 = require("sequelize");
const messages_1 = require("../constants/messages");
const CreateClientDto_1 = require("../dto/client/CreateClientDto");
const UpdateClientDto_1 = require("../dto/client/UpdateClientDto");
const customError_1 = __importDefault(require("../error/customError"));
const client_1 = __importDefault(require("../models/client"));
const user_1 = __importDefault(require("../models/user"));
const ImageService_1 = require("../services/ImageService");
const project_1 = __importDefault(require("../models/project"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.uploadClientImage = upload.single("image");
const createClient = async (req, res) => {
    try {
        const dto = new CreateClientDto_1.CreateClientDto();
        Object.assign(dto, req.body);
        await (0, class_validator_1.validateOrReject)(dto);
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: messages_1.CLIENT_MESSAGES.UNAUTHORIZED });
            return;
        }
        const existing = await client_1.default.findOne({ where: { email: dto.email } });
        if (existing) {
            res.status(400).json({ message: messages_1.CLIENT_MESSAGES.CLIENT_EXISTS });
            return;
        }
        const imageUrl = req.file ? await (0, ImageService_1.uploadImage)(req.file) : null;
        const client = await client_1.default.create({
            ...dto,
            image: imageUrl,
            userId,
        });
        res.json({ message: messages_1.CLIENT_MESSAGES.CLIENT_CREATED, client });
    }
    catch (error) {
        throw customError_1.default.InternalServerError();
    }
};
exports.createClient = createClient;
const getClients = async (req, res) => {
    try {
        const userId = req.userId;
        const clients = await client_1.default.findAll({
            where: { userId },
            include: [user_1.default, { model: project_1.default }],
        });
        res.status(200).json(clients);
    }
    catch (error) {
        throw customError_1.default.InternalServerError();
    }
};
exports.getClients = getClients;
const getClientById = async (req, res) => {
    try {
        const client = await client_1.default.findByPk(req.params.id);
        if (!client) {
            res.status(404).json({ message: messages_1.CLIENT_MESSAGES.CLIENT_NOT_FOUND });
            return;
        }
        res.status(200).json(client);
    }
    catch (error) {
        throw customError_1.default.InternalServerError();
    }
};
exports.getClientById = getClientById;
const updateClient = async (req, res) => {
    try {
        const client = await client_1.default.findByPk(req.params.id);
        if (!client) {
            res.status(404).json({ message: messages_1.CLIENT_MESSAGES.CLIENT_NOT_FOUND });
            return;
        }
        const dto = new UpdateClientDto_1.UpdateClientDto();
        Object.assign(dto, req.body);
        await (0, class_validator_1.validateOrReject)(dto);
        const existing = await client_1.default.findOne({
            where: {
                email: dto.email,
                id: { [sequelize_1.Op.ne]: req.params.id },
            },
        });
        if (existing) {
            res.status(400).json({ message: messages_1.CLIENT_MESSAGES.CLIENT_EXISTS });
            return;
        }
        const imageUrl = req.file ? await (0, ImageService_1.uploadImage)(req.file) : client.image;
        await client.update({ ...dto, image: imageUrl });
        res.status(200).json({ message: messages_1.CLIENT_MESSAGES.CLIENT_UPDATED, client });
    }
    catch (error) {
        throw customError_1.default.InternalServerError();
    }
};
exports.updateClient = updateClient;
const deleteClient = async (req, res) => {
    try {
        const client = await client_1.default.findByPk(req.params.id);
        if (!client) {
            res.status(404).json({ message: messages_1.CLIENT_MESSAGES.CLIENT_NOT_FOUND });
            return;
        }
        await client.destroy();
        res.status(200).json({ message: messages_1.CLIENT_MESSAGES.CLIENT_DELETED });
    }
    catch (error) {
        throw customError_1.default.InternalServerError();
    }
};
exports.deleteClient = deleteClient;
