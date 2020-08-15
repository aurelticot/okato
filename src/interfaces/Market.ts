import MarketStatus from "../enums/MarketStatus";

export interface Market {
  id: number;
  order: number;
  name: string;
  timezone: string;
  hasReminder: boolean;
  isBookmarked: boolean;
  sessions: Session[];
}

export interface Session {
  startTime: Date;
  endTime: Date;
  status: MarketStatus;
}
