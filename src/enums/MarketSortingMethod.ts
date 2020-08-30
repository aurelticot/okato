import { Market } from "interfaces/Market";

enum MarketSortingMethod {
  Capitalisation = "capitalisation",
  CapitalisationReverse = "capitalisation-reverse",
  Alphabetically = "alphabetically",
  AlphabeticallyReverse = "alphabetically-reverse",
  Chronologically = "chronologically",
  ChronologicallyReverse = "chronologically-reverse",
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

export function sortCapitalisation(marketA: Market, marketB: Market) {
  return marketB.capitalisation - marketA.capitalisation;
}

export function sortCapitalisationReverse(marketA: Market, marketB: Market) {
  return sortCapitalisation(marketB, marketA);
}

export function getMarketSortingMethodByString(sortingMethodString: string | string[]) {
  const methodToCheck = Array.isArray(sortingMethodString) ? sortingMethodString[0] : sortingMethodString;
  switch (methodToCheck) {
    case MarketSortingMethod.Alphabetically:
      return MarketSortingMethod.Alphabetically;
    case MarketSortingMethod.AlphabeticallyReverse:
      return MarketSortingMethod.AlphabeticallyReverse;
    case MarketSortingMethod.Chronologically:
      return MarketSortingMethod.Chronologically;
    case MarketSortingMethod.ChronologicallyReverse:
      return MarketSortingMethod.ChronologicallyReverse;
    case MarketSortingMethod.Capitalisation:
      return MarketSortingMethod.Capitalisation;
    case MarketSortingMethod.CapitalisationReverse:
      return MarketSortingMethod.CapitalisationReverse;
    default:
      return MarketSortingMethod.Capitalisation;
  }
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
    case MarketSortingMethod.Capitalisation:
      return sortCapitalisation;
    case MarketSortingMethod.CapitalisationReverse:
      return sortCapitalisationReverse;
    default:
      return sortCapitalisation;
  }
}

export default MarketSortingMethod;
