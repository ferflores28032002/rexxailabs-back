"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const class_validator_1 = require("class-validator");
const messages_1 = require("../constants/messages");
const CreateProjectDto_1 = require("../dto/project/CreateProjectDto");
const UpdateProjectDto_1 = require("../dto/project/UpdateProjectDto");
const customError_1 = __importDefault(require("../error/customError"));
const client_1 = __importDefault(require("../models/client"));
const project_1 = __importDefault(require("../models/project"));
const createProject = async (req, res) => {
    try {
        const dto = new CreateProjectDto_1.CreateProjectDto();
        Object.assign(dto, req.body);
        await (0, class_validator_1.validateOrReject)(dto);
        const client = await client_1.default.findByPk(dto.clientId);
        if (!client) {
            res.status(404).json({ message: messages_1.PROJECT_MESSAGES.CLIENT_NOT_FOUND });
            return;
        }
        const project = await project_1.default.create({
            ...dto,
            clientId: dto.clientId,
        });
        res
            .status(201)
            .json({ message: messages_1.PROJECT_MESSAGES.PROJECT_CREATED, project });
    }
    catch (error) {
        console.error(error);
        throw customError_1.default.InternalServerError();
    }
};
exports.createProject = createProject;
const getProjects = async (_req, res) => {
    try {
        const projects = await project_1.default.findAll({ include: [client_1.default] });
        res.status(200).json(projects);
    }
    catch (error) {
        throw customError_1.default.InternalServerError();
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    try {
        const project = await project_1.default.findByPk(req.params.id);
        if (!project) {
            res.status(404).json({ message: messages_1.PROJECT_MESSAGES.PROJECT_NOT_FOUND });
            return;
        }
        res.status(200).json(project);
    }
    catch (error) {
        throw customError_1.default.InternalServerError();
    }
};
exports.getProjectById = getProjectById;
const updateProject = async (req, res) => {
    try {
        const project = await project_1.default.findByPk(req.params.id);
        if (!project) {
            res.status(404).json({ message: messages_1.PROJECT_MESSAGES.PROJECT_NOT_FOUND });
            return;
        }
        const dto = new UpdateProjectDto_1.UpdateProjectDto();
        Object.assign(dto, req.body);
        await (0, class_validator_1.validateOrReject)(dto);
        await project.update(dto);
        res
            .status(200)
            .json({ message: messages_1.PROJECT_MESSAGES.PROJECT_UPDATED, project });
    }
    catch (error) {
        throw customError_1.default.InternalServerError();
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const project = await project_1.default.findByPk(req.params.id);
        if (!project) {
            res.status(404).json({ message: messages_1.PROJECT_MESSAGES.PROJECT_NOT_FOUND });
            return;
        }
        await project.destroy();
        res.status(200).json({ message: messages_1.PROJECT_MESSAGES.PROJECT_DELETED });
    }
    catch (error) {
        throw customError_1.default.InternalServerError();
    }
};
exports.deleteProject = deleteProject;
