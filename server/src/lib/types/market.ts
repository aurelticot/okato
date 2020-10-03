export interface Market {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  timezoneOffset: number;
  longitude: number;
  capitalisation: number;
  defaultSessions: DefaultTradingSession[];
}

export interface DefaultTradingSession {
  weekday: number;
  start: string;
  end: string;
  status: MarketStatus;
}

export enum MarketStatus {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
  CLOSE_SPECIAL = "CLOSE_SPECIAL",
  BREAK = "BREAK",
  BEFORE_MARKET = "BEFORE_MARKET",
  AFTER_MARKET = "AFTER_MARKET",
}

export enum MarketSort {
  ALPHABETICALLY = "ALPHABETICALLY",
  ALPHABETICALLY_REVERSE = "ALPHABETICALLY_REVERSE",
  CAPITALISATION = "CAPITALISATION",
  CAPITALISATION_REVERSE = "CAPITALISATION_REVERSE",
  CHRONOLOGICALLY = "CHRONOLOGICALLY",
  CHRONOLOGICALLY_REVERSE = "CHRONOLOGICALLY_REVERSE",
}
