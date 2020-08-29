import { DateTime } from "luxon";
import { getRotationOffset, getMarketStatusFromString } from "helpers/marketDataHelper";
import { Market, Session } from "interfaces/Market";
import marketsData from "data/markets.json";
import { Features } from "interfaces/Features";
import Feature from "helpers/Feature";

export function getMarketData(): Promise<Market[]> {
  const reworkedData: Market[] = marketsData
    .sort((marketA, marketB) => marketB.longitude - marketA.longitude)
    .map((market, index) => {
      // structure market
      return {
        code: market.code,
        order: index + 1,
        name: market.name,
        city: market.city,
        timezone: market.timezone,
        hasReminder: false,
        isBookmarked: false,
        sessions: market.sessions,
      };
    })
    .map((market) => {
      // structure sessions
      const { timezone, sessions } = market;
      const now = DateTime.local().setZone(timezone);

      function getEndTimeBeforeNextStatus(session: Session, index: number, array: Session[]): Date {
        const nextIndex = index + 1;
        if (nextIndex >= array.length) {
          return session.endTime;
        }
        const nextSession = array[nextIndex];
        if (session.status !== nextSession.status) {
          return session.endTime;
        }
        return getEndTimeBeforeNextStatus(nextSession, nextIndex, array);
      }

      const reworkedSessions = sessions
        .map((session) => {
          // change from weekday and generic time to actual date
          const offset = getRotationOffset(now.weekday, session.weekday);
          const startTime = DateTime.fromISO(session.start, { zone: timezone }).plus({ days: offset });
          const endTime = DateTime.fromISO(session.end, { zone: timezone }).plus({ days: offset });
          return {
            status: getMarketStatusFromString(session.status),
            startTime: startTime.toJSDate(),
            endTime: endTime.toJSDate(),
          };
        })
        .sort((sessionA, sessionB) => sessionA.startTime.getTime() - sessionB.startTime.getTime())
        .map((session, index, array) => {
          // Update the end time if 2 consecutive session have the same status
          const newEndTime = getEndTimeBeforeNextStatus(session, index, array);
          return { ...session, endTime: newEndTime };
        })
        .filter((session, index, array) => {
          // remove merged sessions
          const previousIndex = index - 1;
          if (previousIndex >= 0) {
            const previousSession = array[previousIndex];
            if (session.status === previousSession.status) {
              return false;
            }
          }
          return true;
        });
      return { ...market, sessions: reworkedSessions };
    });
  return new Promise((resolve) => {
    resolve(reworkedData);
  });
}

export function getFeatureData(): Features {
  return {
    bookmark: new Feature("hidden"),
    reminder: new Feature("hidden"),
    timelineScroll: new Feature("disabled"),
  };
}
