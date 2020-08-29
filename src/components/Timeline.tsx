import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import * as TimelineHelper from "helpers/TimelineHelper";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, Divider } from "@material-ui/core";
import { Session } from "interfaces/Market";
import MarketStatus from "enums/MarketStatus";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  segment: {
    height: "3em",
  },
  timeMarkerContainer: {
    position: "absolute",
    width: "100%",
    bottom: "-0.2em",
    display: "flex",
    justifyContent: "center",
  },
  timeMarker: {
    height: "3.4em",
    zIndex: 10,
    width: "3px",
    opacity: "100%",
  },
}));

const useMarketStatusStyles = makeStyles((theme) => ({
  open: {
    background: theme.palette.success.main,
    opacity: "100%",
  },
  break: {
    background: theme.palette.warning.light,
    opacity: "70%",
    backgroundImage:
      "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  close: {
    background: theme.palette.error.light,
    opacity: "15%",
    backgroundImage:
      "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  closeSpecial: {
    background: theme.palette.error.light,
    opacity: "40%",
  },
  beforeMarket: {
    background: theme.palette.warning.light,
    opacity: "60%",
    backgroundImage:
      "repeating-linear-gradient(-75deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
  afterMarket: {
    background: theme.palette.warning.light,
    opacity: "60%",
    backgroundImage:
      "repeating-linear-gradient(-75deg, transparent, transparent 3px, rgba(255,255,255,.5) 3px, rgba(255,255,255,.5) 6px)",
  },
}));

function useSegments(sessions: Session[], timezone: string): TimelineHelper.Segment[] {
  const now = DateTime.local().setZone(timezone);
  const initialSegments: TimelineHelper.Segment[] = TimelineHelper.resolveTimelineSegments(now, timezone, sessions);
  const [segments, setSegments] = useState(initialSegments);
  const updateSegments = () => {
    const newNow = DateTime.local().setZone(timezone);
    const newSegments: TimelineHelper.Segment[] = TimelineHelper.resolveTimelineSegments(newNow, timezone, sessions);
    setSegments(newSegments);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      updateSegments();
    }, 60000);
    return function () {
      clearInterval(timer);
    };
  });
  return segments;
}

export interface TimelineProps {
  sessions: Session[];
  timezone: string;
  displayTimeMarker?: boolean;
}

function defineSegmentClass(status: MarketStatus, classes: any): string {
  switch (status) {
    case MarketStatus.Opened:
      return classes.open;
    case MarketStatus.Break:
      return classes.break;
    case MarketStatus.Closed:
      return classes.close;
    case MarketStatus.Closed_Special:
      return classes.closeSpecial;
    case MarketStatus.BeforeMarket:
      return classes.beforeMarket;
    case MarketStatus.AfterMarket:
      return classes.afterMarket;
    default:
      return classes.close;
  }
}

export function Timeline(props: TimelineProps) {
  const { sessions, timezone, displayTimeMarker } = props;

  const segments = useSegments(sessions, timezone);

  const classes = useStyles();
  const marketStatusClasses = useMarketStatusStyles();

  const timelineSegments = segments.map((segment) => {
    const { status, duration } = segment;
    const segmentClass = defineSegmentClass(status, marketStatusClasses);
    return (
      <Paper
        square
        className={`${classes.segment} ${segmentClass}`}
        style={{ flexGrow: duration }}
        key={segment.start}
      />
    );
  });

  return (
    <Box className={classes.root}>
      <Box display="flex">{timelineSegments}</Box>
      {displayTimeMarker && (
        <Box className={classes.timeMarkerContainer}>
          <Divider orientation="vertical" className={classes.timeMarker} />
        </Box>
      )}
    </Box>
  );
}
