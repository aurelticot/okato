import { Market, MarketSort, MarketStatus } from "../../../../lib/types";

export interface MarketVariables {
  id: string;
}

export interface MarketsVariables {
  sort: MarketSort;
  limit: number;
  page: number;
}

export interface MarketsData {
  total: number;
  result: Market[];
}

export interface MarketSessionsVariables {
  startDate: string;
  endDate: string;
}

export interface MarketSessionData {
  date: string;
  startTime: string;
  endTime: string;
  mainStatus: MarketStatus;
  status: MarketStatus;
}
