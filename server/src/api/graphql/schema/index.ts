import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type TradingSession {
    date: String!
    startTime: String!
    endTime: String!
    mainStatus: MarketMainStatus!
    status: MarketStatus!
  }

  type Market {
    id: ID!
    code: String!
    name: String!
    city: String!
    country: String!
    longitude: Float!
    timezone: String!
    capitalisation: Float
    sessions(startDate: String!, endDate: String!): [TradingSession!]!
  }

  type Markets {
    total: Int!
    result: [Market!]!
  }

  enum MarketMainStatus {
    OPEN
    CLOSE
  }

  enum MarketStatus {
    OPEN
    CLOSE
    CLOSE_SPECIAL
    BREAK
    BEFORE_MARKET
    AFTER_MARKET
  }

  enum MarketSort {
    ALPHABETICALLY
    ALPHABETICALLY_REVERSE
    CAPITALISATION
    CAPITALISATION_REVERSE
    CHRONOLOGICALLY
    CHRONOLOGICALLY_REVERSE
  }

  type Query {
    market(id: ID!): Market!
    markets(sort: MarketSort, limit: Int!, page: Int!): Markets
  }
`;
