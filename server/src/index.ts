import { Logger } from "./lib/utils";
const logger = new Logger("app");

import cluster from "cluster";
import Main from "./main";
import Worker from "./worker";

if (cluster.isWorker) {
  const worker = new Worker();
  worker.run().catch((error) => {
    logger.error(`Something went wrong`, error);
    process.exit();
  });
} else {
  const main = new Main();
  main.run().catch((error) => {
    logger.error(`Something went wrong`, error);
    process.exit();
  });
}
