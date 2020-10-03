import merge from "lodash.merge";
import { DateTime } from "luxon";
import { IResolvers } from "apollo-server-express";
import { NotFoundError } from "../../../../lib/errors";
import { GraphQLContext, Market } from "../../../../lib/types";
import { getMarketSortingFunction, getMarketMainStatus } from "../../../../lib/utils";
import { MarketVariables, MarketsVariables, MarketsData, MarketSessionsVariables, MarketSessionData } from "./types";

const rootResolvers: IResolvers<undefined, GraphQLContext> = {
  Query: {
    market: (_root, { id }: MarketVariables, { db }): Market => {
      const foundMarket = db.markets.find((market) => market.id === id);
      if (!foundMarket) {
        throw new NotFoundError(`Market with id ${id} has not been found`);
      }
      return foundMarket;
    },
    markets: (_root, { limit, page, sort }: MarketsVariables, { db }): MarketsData => {
      const total = db.markets.length;
      const startItem = limit * (page - 1);
      const endItem = startItem + limit;
      const returnedMarkets = [...db.markets].sort(getMarketSortingFunction(sort)).slice(startItem, endItem);
      return {
        total,
        result: returnedMarkets,
      };
    },
  },
};

const entityResolvers: IResolvers<Market, GraphQLContext> = {
  Market: {
    sessions: (market, { startDate, endDate }: MarketSessionsVariables, { db }): MarketSessionData[] => {
      const { defaultSessions } = market;
      const start = DateTime.fromISO(startDate).startOf("day");
      const end = DateTime.fromISO(endDate).endOf("day");

      let returnedSessions: MarketSessionData[] = [];

      let dateCursor = start;
      while (!dateCursor.hasSame(end.plus({ day: 1 }), "day")) {
        const weekday = dateCursor.weekday;
        const formattedDay = dateCursor.toISODate();

        const daySessions: MarketSessionData[] = defaultSessions
          .filter((session) => session.weekday === weekday)
          .map((session) => {
            return {
              date: formattedDay,
              startTime: session.start,
              endTime: session.end,
              status: session.status,
              mainStatus: getMarketMainStatus(session.status),
            };
          });

        returnedSessions = [...returnedSessions, ...daySessions];

        dateCursor = dateCursor.plus({ days: 1 });
      }

      return returnedSessions;
    },
  },
};

export const marketResolvers = merge(rootResolvers, entityResolvers);
