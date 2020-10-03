import { Database } from "../lib/types/database";
import { markets } from "./markets";

export const connectDatabase = (): Database => {
  const db: Database = {
    markets,
  };

  return db;
};
