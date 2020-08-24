import React from "react";
import { useRealTime } from "hooks/timeHooks";
import { Clock } from "components/Clock";

interface RealTimeClockProps {
  timezone?: string;
  displayTimezone?: boolean;
  displayDayDiff?: boolean;
  displaySeconds?: boolean;
}

export function RealTimeClock(props: RealTimeClockProps) {
  const { timezone, displayTimezone, displayDayDiff, displaySeconds } = props;

  const time = useRealTime(timezone);

  return (
    <Clock
      time={time}
      timezone={timezone}
      displayTimezone={displayTimezone}
      displayDayDiff={displayDayDiff}
      displaySeconds={displaySeconds}
    />
  );
}
