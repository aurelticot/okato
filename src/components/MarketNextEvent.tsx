import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { DateTime, Interval } from "luxon";
import { Session } from "../interfaces/Market";
import MarketStatus from "../enums/MarketStatus";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "0.8em",
    color: theme.palette.text.secondary,
  },
}));

function useRelativeTime(time: Date): string | null {
  const [relativeTime, setRelativeTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = DateTime.local();
      const later = DateTime.fromJSDate(time);
      if (now > later) {
        setRelativeTime(null);
      } else {
        const interval = Interval.fromDateTimes(now, later);
        const hourCount = interval.length("hour");
        if (hourCount > 1) {
          setRelativeTime(`${Math.floor(hourCount)}h`);
        } else {
          const minuteCount = interval.length("minute");
          setRelativeTime(`${Math.floor(minuteCount + 1)}m`);
        }
      }
    }, 1000);
    return function () {
      clearInterval(timer);
    };
  });

  return relativeTime;
}

export interface MarketNextEventProps {
  nextEvent: Session;
}

function getRenderedStatus(status: MarketStatus): string {
  switch (status) {
    case MarketStatus.Opened:
    case MarketStatus.Break:
      return `Open`;
    case MarketStatus.Closed_Special:
    case MarketStatus.Closed:
    case MarketStatus.BeforeMarket:
    case MarketStatus.AfterMarket:
    default:
      return `Close`;
  }
}

function defineNextEventAnnouncement(status: MarketStatus, relativeTime: string): string {
  const renderedStatus = getRenderedStatus(status);
  return `${renderedStatus} in ${relativeTime}`;
}

export function MarketNextEvent({ nextEvent }: MarketNextEventProps) {
  const { status, startTime } = nextEvent;
  const classes = useStyles();

  const relativeTime = useRelativeTime(startTime);

  if ((!startTime && !status) || relativeTime === null) {
    return null;
  }

  return <Box className={classes.root}>{defineNextEventAnnouncement(status, relativeTime)}</Box>;
}
