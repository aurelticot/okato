import { Market, Session } from "interfaces/Market";
import { useState, useEffect } from "react";
import { getNextEvent } from "helpers/marketDataHelper";

export function useNextEvent(market: Market, useMain: boolean = false, baseTime?: Date): Session | null {
  const [nextEvent, setNextEvent] = useState<Session | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNextEvent(getNextEvent(baseTime || new Date(), market, useMain));
    }, 1000);
    return function () {
      clearInterval(timer);
    };
  });
  return nextEvent;
}
