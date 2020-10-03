import { Request, Response, NextFunction } from "express";

export const startAt = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const startAtValue = process.hrtime();
    req.startAt = startAtValue;
    res.startAt = startAtValue;
    next();
  };
};
