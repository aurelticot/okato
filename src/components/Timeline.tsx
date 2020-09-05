import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { DateTime } from "luxon";
import * as TimelineHelper from "helpers/TimelineHelper";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, Divider } from "@material-ui/core";
import { Session } from "interfaces/Market";
import MarketStatus from "enums/MarketStatus";
import config from "config";

const timelineTotalDays = config.daysInFuture + config.daysInPast + 1;
const timelineTotalSizeInSeconds = timelineTotalDays * 24 * 60 * 60;

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
  timelineContainer: {
    width: "100%",
    overflow: "auto",
  },
  timeline: () => ({
    display: "flex",
    width: `${timelineTotalDays * 100}%`,
  }),
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
  time: Date | null;
  registerScrollSync: (ref: React.MutableRefObject<HTMLDivElement | undefined>) => void;
  unregisterScrollSync: (ref: React.MutableRefObject<HTMLDivElement | undefined>) => void;
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
  const { time, sessions, timezone, registerScrollSync, unregisterScrollSync, displayTimeMarker } = props;
  const timelineRef = useRef<HTMLDivElement>();

  const segments = useSegments(sessions, timezone);

  const classes = useStyles();
  const marketStatusClasses = useMarketStatusStyles();

  const timelineSegments = segments.map((segment, index) => {
    const { status, duration } = segment;
    const segmentClass = defineSegmentClass(status, marketStatusClasses);
    return <Paper square className={`${classes.segment} ${segmentClass}`} style={{ flexGrow: duration }} key={index} />;
  });

  const initialScroll = React.useRef(true);

  useLayoutEffect(() => {
    if (!initialScroll.current) {
      return;
    }
    initialScroll.current = false;

    const timelineContainerElement = timelineRef.current;
    if (!timelineContainerElement) {
      return;
    }
    const timelineSize = timelineContainerElement.scrollWidth;
    const middleTimelineViewport = timelineContainerElement.clientWidth / 2;
    const middleTimeline = timelineSize / 2;
    let timeDiff = 0;
    if (time) {
      const now = DateTime.fromJSDate(new Date(), { zone: timezone });
      const targetTime = DateTime.fromJSDate(time);
      const timeDiffInSec = targetTime.diff(now).as("seconds");
      timeDiff = (timeDiffInSec * timelineSize) / timelineTotalSizeInSeconds;
    }
    timelineContainerElement.scrollLeft = middleTimeline + timeDiff - middleTimelineViewport;
  }, [timelineRef, time, timezone]);

  useLayoutEffect(() => {
    registerScrollSync(timelineRef);
    return () => {
      unregisterScrollSync(timelineRef);
    };
  }, [registerScrollSync, unregisterScrollSync]);

  return (
    <Box className={classes.root}>
      {displayTimeMarker && (
        <Box className={classes.timeMarkerContainer}>
          <Divider orientation="vertical" className={classes.timeMarker} />
        </Box>
      )}
      <Box className={classes.timelineContainer} {...{ ref: timelineRef }}>
        <Box className={classes.timeline}>{timelineSegments}</Box>
      </Box>
    </Box>
  );
}
