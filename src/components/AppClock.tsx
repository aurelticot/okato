import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";
import { Box } from "@material-ui/core";
import { useRealTime } from "../hooks/timeHooks";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  time: {
    width: "3em",
    display: "flex",
    justifyContent: "center",
  },
  timezone: {
    fontSize: "0.6em",
    position: "absolute",
    bottom: "3px",
    left: "5em",
    width: "4em",
  },
  dayDiff: {
    fontSize: "0.6em",
    position: "absolute",
    bottom: "3px",
    right: "4.7em",
    width: "1em",
  },
}));

export interface AppClockProps {
  timezone?: string;
  displayTimezone?: boolean;
  displayDayDiff?: boolean;
  displaySeconds?: boolean;
}

export function AppClock(props: AppClockProps) {
  const { timezone, displayTimezone, displayDayDiff, displaySeconds } = props;

  const time = useRealTime(timezone);
  const localTime = useRealTime();

  const normalizedTime = DateTime.local(time.year, time.month, time.day);
  let displayedDayDiff = null;
  if (normalizedTime < localTime.startOf("day")) {
    displayedDayDiff = "-1";
  } else if (normalizedTime > localTime.startOf("day")) {
    displayedDayDiff = "+1";
  }

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {displayDayDiff && displayedDayDiff && <Box className={classes.dayDiff}>{displayedDayDiff}</Box>}
      <Box className={classes.time}>
        <Box>{time.toFormat("HH")}</Box>
        <Box>:</Box>
        <Box>{time.toFormat("mm")}</Box>
        {displaySeconds && <Box>:</Box>}
        {displaySeconds && <Box>{time.toFormat("ss")}</Box>}
      </Box>
      {displayTimezone && <Box className={classes.timezone}>{`GMT${time.toFormat("Z")}`}</Box>}
    </Box>
  );
}
