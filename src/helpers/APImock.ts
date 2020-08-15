import { DateTime } from "luxon";
import { getRotationOffset, getMarketStatusFromString } from "../helpers/marketDataHelper";
import { Market } from "../interfaces/Market";
import marketsData from "../data/markets.json";
import { Features } from "../interfaces/Features";
//import featuresData from "../data/features.json";
import { getFeatureStatusFromString } from "../helpers/featureHelper";

export function getMarketData(): Promise<Market[]> {
  const reworkedData: Market[] = marketsData
    .sort((marketA, marketB) => marketB.longitude - marketA.longitude)
    .map((market, index) => {
      // structure market
      return {
        id: market.id,
        order: index + 1,
        name: market.name,
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
        .sort((sessionA, sessionB) => sessionB.startTime.getTime() - sessionA.startTime.getTime())
        .map((session, index, array) => {
          // Update the end time if 2 consecutive session have the same status
          let newEndTime = session.endTime;
          const previousIndex = index - 1;
          if (previousIndex >= 0) {
            const previousSession = array[previousIndex];
            if (session.status === previousSession.status) {
              newEndTime = previousSession.endTime;
            }
          }
          return { ...session, endTime: newEndTime };
        })
        .sort((sessionA, sessionB) => sessionA.startTime.getTime() - sessionB.startTime.getTime())
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
    bookmark: {
      status: getFeatureStatusFromString("hidden"),
    },
    reminder: {
      status: getFeatureStatusFromString("hidden"),
    },
    timelineScroll: {
      status: getFeatureStatusFromString("disabled"),
    },
  };
}
