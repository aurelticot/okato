import { useState, useEffect } from "react";
import { Market } from "../interfaces/Market";
import MarketStatus, { getMainStatus } from "../enums/MarketStatus";
import { getMarketStatus } from "../helpers/marketDataHelper";

export function useMarketStatus(market: Market, useMain: boolean = false, baseTime?: Date): MarketStatus | null {
  const [status, setStatus] = useState<MarketStatus | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentStatus = getMarketStatus(baseTime || new Date(), market);
      setStatus(useMain ? getMainStatus(currentStatus) : currentStatus);
    }, 1000);
    return function () {
      clearInterval(timer);
    };
  });
  return status;
}
