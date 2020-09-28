import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";

export const requestId = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = nanoid(10);
    req.requestId = id;
    res.requestId = id;
    next();
  };
};
