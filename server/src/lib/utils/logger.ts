import { config } from "../../config";
import cluster from "cluster";
import winston, { createLogger, format, transports } from "winston";

const isProduction = config.nodeEnv === "production";
const logLevel = config.logLevel ? config.logLevel : isProduction ? "info" : "debug";

const levelPads: { [key: string]: string } = {
  error: "  ",
  warn: "   ",
  info: "   ",
  verbose: "",
  debug: "  ",
  silly: "  ",
};

const formatProcessID = format((info) => {
  info.processID = cluster.isMaster ? `master-${process.pid}` : `worker-${process.pid}`;
  return info;
});

const formatLevelPads = format((info) => {
  info.pads = levelPads[info.level];
  return info;
});

const formatConsoleOutput = () => {
  return format.printf(({ timestamp, level, label, message, processID, pads, metadata }) => {
    let metadataString = "";
    if (Object.keys(metadata).length !== 0 && metadata.constructor === Object) {
      metadataString = ` - metadata: ${JSON.stringify(metadata)}`;
    }
    return `${timestamp} ${level}${pads} [${label}@${processID}]: ${message}${metadataString}`;
  });
};

const getProdLogger = (name?: string): winston.Logger => {
  return createLogger({
    level: logLevel,
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          formatProcessID(),
          format.label({ label: name }),
          format.metadata({ fillExcept: ["timestamp", "label", "level", "message", "processID"] }),
          format.errors({ stack: true }),
          format.json()
        ),
      }),
    ],
  });
};

const getDevLogger = (name?: string): winston.Logger => {
  return createLogger({
    level: logLevel,
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          formatProcessID(),
          formatLevelPads(),
          format.label({ label: name }),
          format.metadata({ fillExcept: ["timestamp", "label", "level", "message", "processID", "pads"] }),
          format.errors({ stack: true }),
          format.colorize(),
          formatConsoleOutput()
        ),
      }),
    ],
  });
};

export class Logger {
  private readonly logger: winston.Logger;

  constructor(name?: string) {
    this.logger = isProduction ? getProdLogger(name) : getDevLogger(name);
  }

  debug(message: string, ...metadata: any[]) {
    this.logger.debug(message, metadata);
  }

  info(message: string, ...metadata: any[]) {
    this.logger.info(message, metadata);
  }

  warn(message: string, ...metadata: any[]) {
    this.logger.warn(message, metadata);
  }

  error(message: string, ...metadata: any[]) {
    this.logger.error(message, metadata);
  }

  verbose(message: string, ...metadata: any[]) {
    this.logger.log("verbose", message, metadata);
  }

  silly(message: string, ...metadata: any[]) {
    this.logger.log("silly", message, metadata);
  }

  log(level: string, message: string, ...metadata: any[]) {
    this.logger.log(level, message, metadata);
  }
}
