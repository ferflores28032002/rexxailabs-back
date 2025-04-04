import { Router } from "express";
import {
    createClient,
    deleteClient,
    getClientById,
    getClients,
    updateClient,
    uploadClientImage,
} from "../controllers/clientController";
import { authenticateToken } from "../middleware/auth.middleware";

const clientRouter = Router();

clientRouter.post("/", authenticateToken, uploadClientImage, createClient);
clientRouter.get("/", authenticateToken, getClients);
clientRouter.get("/:id", authenticateToken, getClientById);
clientRouter.put("/:id", authenticateToken, uploadClientImage, updateClient);
clientRouter.delete("/:id", authenticateToken, deleteClient);

export default clientRouter;
