import MarketStatus, { getMainStatus } from "enums/MarketStatus";
import { DateTime } from "luxon";
import { Market, Session } from "interfaces/Market";

export const dayRotationOffset: { [key: number]: { [key: number]: number } } = {
  1: {
    5: -3,
    6: -2,
    7: -1,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
  },
  2: {
    6: -3,
    7: -2,
    1: -1,
    2: 0,
    3: 1,
    4: 2,
    5: 3,
  },
  3: {
    7: -3,
    1: -2,
    2: -1,
    3: 0,
    4: 1,
    5: 2,
    6: 3,
  },
  4: {
    1: -3,
    2: -2,
    3: -1,
    4: 0,
    5: 1,
    6: 2,
    7: 3,
  },
  5: {
    2: -3,
    3: -2,
    4: -1,
    5: 0,
    6: 1,
    7: 2,
    1: 3,
  },
  6: {
    3: -3,
    4: -2,
    5: -1,
    6: 0,
    7: 1,
    1: 2,
    2: 3,
  },
  7: {
    4: -3,
    5: -2,
    6: -1,
    7: 0,
    1: 1,
    2: 2,
    3: 3,
  },
};

export function getRotationOffset(baseWeekday: number, sessionWeekday: number): number {
  return dayRotationOffset[baseWeekday][sessionWeekday];
}

export function getMarketStatusFromString(status: string): MarketStatus {
  switch (status) {
    case "open":
      return MarketStatus.Opened;
    case "break":
      return MarketStatus.Break;
    case "before_market":
      return MarketStatus.BeforeMarket;
    case "after_market":
      return MarketStatus.AfterMarket;
    case "close":
      return MarketStatus.Closed;
    case "close_special":
      return MarketStatus.Closed_Special;
    default:
      return MarketStatus.Closed;
  }
}

export function getMarketStatus(baseDate: Date, market: Market): MarketStatus {
  const { timezone, sessions } = market;
  const baseTime = DateTime.fromJSDate(baseDate, { zone: timezone });
  return sessions.reduce<MarketStatus>((value, session) => {
    const sessionStart = DateTime.fromJSDate(session.startTime, { zone: timezone });
    const sessionEnd = DateTime.fromJSDate(session.endTime, { zone: timezone }).endOf("minute");
    if (sessionStart <= baseTime && sessionEnd >= baseTime) {
      return session.status;
    }
    return value;
  }, MarketStatus.Closed);
}

export function getNextEvent(baseDate: Date, market: Market, useMain: boolean = false): Session | null {
  const { timezone, sessions } = market;
  const currentStatus = getMarketStatus(baseDate, market);
  const baseTime = DateTime.fromJSDate(baseDate, { zone: timezone });
  const nextSessions = sessions
    .filter((session) => {
      const sessionStartTime = DateTime.fromJSDate(session.startTime, { zone: timezone });
      const differentSubStatus = currentStatus !== session.status;
      const differentMainStatus = getMainStatus(currentStatus) !== getMainStatus(session.status);
      const differentStatus = useMain ? differentMainStatus : differentSubStatus;
      const sessionAfterBase = sessionStartTime > baseTime;
      return sessionAfterBase && differentStatus;
    })
    .sort((sessionA, sessionB) => {
      return sessionA.startTime.getTime() - sessionB.startTime.getTime();
    });
  return nextSessions[0];
}
