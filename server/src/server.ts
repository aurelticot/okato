import { Logger } from "./lib/utils";
const logger = new Logger("server");

import express, { Express } from "express";

export default class Server {
  private readonly port: number;
  private readonly server: Express;

  constructor(port: number) {
    this.port = port;
    this.server = express();
  }

  start = async (): Promise<void> => {
    this.server.listen(this.port, () => {
      logger.info(`server listenning on port: ${this.port}`);
    });
  };
}
