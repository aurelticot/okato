import { Request, Response } from "express";
import { Database } from "./database";

export interface GraphQLContext {
  req: Request;
  res: Response;
  db: Database;
}
