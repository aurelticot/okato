import { Market } from "interfaces/Market";

enum MarketSortingMethod {
  Alphabetically = "alphabetically",
  AlphabeticallyReverse = "alphabetically-reverse",
  Chronologically = "chronologically",
  ChronologicallyReverse = "chronologically-reverse",
  Popularity = "popularity",
  PopularityReverse = "popularity-reverse",
}

export function sortAlphabetically(marketA: Market, marketB: Market) {
  return marketA.name.localeCompare(marketB.name);
}

export function sortAlphabeticallyReverse(marketA: Market, marketB: Market) {
  return sortAlphabetically(marketB, marketA);
}

export function sortChronologically(marketA: Market, marketB: Market) {
  return marketB.longitude - marketA.longitude;
}

export function sortChronologicallyReverse(marketA: Market, marketB: Market) {
  return sortChronologically(marketB, marketA);
}

export function sortPopularity(marketA: Market, marketB: Market) {
  return marketB.capitalisation - marketA.capitalisation;
}

export function sortPopularityReverse(marketA: Market, marketB: Market) {
  return sortPopularity(marketB, marketA);
}

export function getSortingFunction(sortingMethod: MarketSortingMethod): (marketA: Market, marketB: Market) => number {
  switch (sortingMethod) {
    case MarketSortingMethod.Alphabetically:
      return sortAlphabetically;
    case MarketSortingMethod.AlphabeticallyReverse:
      return sortAlphabeticallyReverse;
    case MarketSortingMethod.Chronologically:
      return sortChronologically;
    case MarketSortingMethod.ChronologicallyReverse:
      return sortChronologicallyReverse;
    case MarketSortingMethod.Popularity:
      return sortPopularity;
    case MarketSortingMethod.PopularityReverse:
      return sortPopularityReverse;
    default:
      return sortPopularity;
  }
}

export default MarketSortingMethod;
