import { Market, MarketSort, MarketStatus } from "../types";

export const sortMarketAlphabetically = (marketA: Market, marketB: Market) => {
  return marketA.name.localeCompare(marketB.name);
};

export const sortMarketAlphabeticallyReverse = (marketA: Market, marketB: Market) => {
  return sortMarketAlphabetically(marketB, marketA);
};

export const sortMarketChronologically = (marketA: Market, marketB: Market) => {
  return marketB.longitude - marketA.longitude;
};

export const sortMarketChronologicallyReverse = (marketA: Market, marketB: Market) => {
  return sortMarketChronologically(marketB, marketA);
};

export const sortMarketCapitalisation = (marketA: Market, marketB: Market) => {
  return marketB.capitalisation - marketA.capitalisation;
};

export const sortMarketCapitalisationReverse = (marketA: Market, marketB: Market) => {
  return sortMarketCapitalisation(marketB, marketA);
};

export const getMarketSortingFunction = (sort: MarketSort): ((marketA: Market, marketB: Market) => number) => {
  switch (sort) {
    case MarketSort.ALPHABETICALLY:
      return sortMarketAlphabetically;
    case MarketSort.ALPHABETICALLY_REVERSE:
      return sortMarketAlphabeticallyReverse;
    case MarketSort.CHRONOLOGICALLY:
      return sortMarketChronologically;
    case MarketSort.CHRONOLOGICALLY_REVERSE:
      return sortMarketChronologicallyReverse;
    case MarketSort.CAPITALISATION:
      return sortMarketCapitalisation;
    case MarketSort.CAPITALISATION_REVERSE:
      return sortMarketCapitalisationReverse;
    default:
      return sortMarketCapitalisation;
  }
};

export function getMarketMainStatus(status: MarketStatus): MarketStatus {
  switch (status) {
    case MarketStatus.OPEN:
    case MarketStatus.BREAK:
      return MarketStatus.OPEN;
    case MarketStatus.CLOSE_SPECIAL:
    case MarketStatus.CLOSE:
    case MarketStatus.BEFORE_MARKET:
    case MarketStatus.AFTER_MARKET:
    default:
      return MarketStatus.CLOSE;
  }
}
