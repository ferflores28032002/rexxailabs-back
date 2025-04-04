import express, { Application } from "express";

import cors from "cors";

import { clientRouter, projectRouter, userRouter } from "./routes";

class Server {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes() {
    this.app.use("/api/v1/users", userRouter);
    this.app.use("/api/v1/projects", projectRouter);
    this.app.use("/api/v1/clients", clientRouter);
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
