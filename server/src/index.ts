import { Logger } from "./lib/utils";
const logger = new Logger("app");

import cluster from "cluster";
import Main from "./main";
import Worker from "./worker";

const run = (): void => {
  if (cluster.isWorker) {
    const worker = new Worker();
    worker.run();
  } else {
    const main = new Main();
    main.run();
  }
};

try {
  run();
} catch (error) {
  logger.error(`Something went wrong`, error);
}
