import { Logger } from "./lib/utils";
const logger = new Logger("server");

import express, { Express } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { requestId, requestLogger, startAt } from "./lib/middlewares";

export default class Server {
  private readonly port: number;
  private readonly server: Express;

  constructor(port: number) {
    this.port = port;
    this.server = express();

    //declare middleware
    this.server.use(startAt());
    this.server.use(requestId());
    this.server.use(helmet());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json({ limit: "2mb" }));
    this.server.use(requestLogger());
  }

  start = (): void => {
    this.server.listen(this.port, () => {
      logger.info(`Server listenning on port: ${this.port}`);
    });
  };
}
