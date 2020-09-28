import { Logger } from "./lib/utils";
const logger = new Logger("app");

import { config } from "./config";
import Server from "./server";

export default class Worker {
  constructor() {}

  run = (): void => {
    logger.silly("worker.ts - enter Worker#run()");
    logger.verbose(`Worker ${process.pid} started`);

    const server = new Server(config.port);
    logger.info(`Starting server...`);
    server.start();
    logger.info(`Server started`);
  };
}
