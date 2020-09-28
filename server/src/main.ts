import { Logger } from "./lib/utils";
const logger = new Logger("app");

import { config } from "./config";
import cluster from "cluster";

export default class Main {
  constructor() {}

  createWorker(): cluster.Worker {
    logger.silly("main.ts - enter createWorker()");
    logger.verbose(`Forking process`);
    return cluster.fork();
  }

  run = async (): Promise<void> => {
    logger.silly("main.ts - enter Main#run()");
    logger.verbose(`Main ${process.pid} is started`);

    const concurrency = config.concurrency;

    logger.info(`Starting application...`);
    logger.debug(`NODE_ENV: ${config.nodeEnv}`);
    logger.debug(`PORT: ${config.port}`);
    logger.debug(`concurrency: ${concurrency}`);

    logger.verbose(`Creating ${concurrency} workers`);
    for (let i = 0; i < concurrency; i++) {
      this.createWorker();
    }

    cluster.on("exit", (worker, code, signal) => {
      logger.warn(`Worker ${worker.process.pid} died with code/signal ${code || signal}`);
      logger.warn(`Restarting worker ...`);
      this.createWorker();
    });

    logger.info(`Application started`);
  };
}
