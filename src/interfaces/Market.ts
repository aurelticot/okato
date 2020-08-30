import MarketStatus from "enums/MarketStatus";

export interface Market {
  code: string;
  name: string;
  city: string;
  longitude: number;
  capitalisation: number;
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
