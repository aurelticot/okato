import { DateTime } from "luxon";
import { useState, useEffect } from "react";

export function useRealTime(timezone: string = "local"): DateTime {
  const [time, setTime] = useState(DateTime.fromJSDate(new Date(), { zone: timezone }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(DateTime.fromJSDate(new Date(), { zone: timezone }));
    }, 500);
    return function () {
      clearInterval(timer);
    };
  });

  return time;
}
