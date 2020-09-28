import { Logger } from "../utils";
const logger = new Logger("request");

import { Request, Response, NextFunction } from "express";
import onHeaders from "on-headers";

export const requestLogger = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const method = req.method;
    const url = `${req.baseUrl}${req.path}`;
    const params = req.params;
    const query = req.query;
    const requestID = req.requestId;

    logger.info(`Receiving request ${requestID} ${method}: ${url}`, { requestID, method, url, query, params });

    onHeaders(res, () => {
      const responseRequestID = res.requestId;
      const startAt = res.startAt;
      let responseTime = undefined;

      if (startAt) {
        const diff = process.hrtime(startAt);
        responseTime = {
          duration: (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3),
          unit: "ms",
        };
      }

      const formattedResponseTime = responseTime ? ` in ${responseTime.duration}${responseTime.unit}` : "";
      const status = res.statusCode;

      logger.info(
        `Responding request ${responseRequestID} ${method}: ${url} with status ${status}${formattedResponseTime}`,
        { requestID: responseRequestID, method, url, query, params, status, responseTime }
      );
    });

    next();
  };
};
