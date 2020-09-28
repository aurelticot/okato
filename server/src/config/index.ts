import os from "os";

const numCPUs = os.cpus().length;
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
const concurrency: number = process.env.WEB_CONCURRENCY ? parseInt(process.env.WEB_CONCURRENCY) : numCPUs;
const nodeEnv: string = process.env.NODE_ENV || "development";
const environmentId: string = process.env.ENVIRONMENT_ID || "unknown";
const logLevel: string | undefined = process.env.LOG_LEVEL;

export const config = {
  concurrency,
  port,
  nodeEnv,
  environmentId,
  logLevel,
};
