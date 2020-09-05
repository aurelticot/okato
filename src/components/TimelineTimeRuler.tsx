import React from "react";
import config from "config";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";

const rulerTotalDays = config.daysInFuture + config.daysInPast + 1;
const rulerTotalSizeInSeconds = rulerTotalDays * 24 * 60 * 60;

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    overflow: "auto",
  },
  ruler: () => ({
    display: "flex",
    justifyContent: "space-between",
    width: `${rulerTotalDays * 100}%`,
  }),
  segment: {
    height: "2em",
    width: "3px",
  },
}));

interface TimelineTimeRulerProps {
  time: Date | null;
  onTimeNavigation: (time: Date) => void;
  registerScrollSync: (ref: React.MutableRefObject<HTMLDivElement | undefined>) => void;
  unregisterScrollSync: (ref: React.MutableRefObject<HTMLDivElement | undefined>) => void;
}

export function TimelineTimeRuler(props: TimelineTimeRulerProps) {
  const { time, onTimeNavigation, registerScrollSync, unregisterScrollSync } = props;
  const rulerContainerRef = React.useRef<HTMLDivElement>();

  const handleScroll = React.useCallback(() => {
    const rulerContainerElement = rulerContainerRef.current;
    if (!rulerContainerElement) {
      return;
    }
    const rulerSize = rulerContainerElement.scrollWidth;
    const middleRulerViewport = rulerContainerElement.clientWidth / 2;
    const middleRuler = rulerSize / 2;
    const timeDiff = rulerContainerElement.scrollLeft - middleRuler + middleRulerViewport;
    const timeDiffInSec = (timeDiff * rulerTotalSizeInSeconds) / rulerSize;
    if (Math.abs(timeDiffInSec) < 60) {
      return;
    }
    const now = DateTime.local();
    const targetTime = now.plus({ seconds: timeDiffInSec });

    onTimeNavigation(targetTime.toJSDate());
  }, [onTimeNavigation]);

  const initialScroll = React.useRef(true);

  React.useLayoutEffect(() => {
    if (!initialScroll.current && time) {
      return;
    }
    initialScroll.current = false;
    const rulerContainerElement = rulerContainerRef.current;
    if (!rulerContainerElement) {
      return;
    }

    const rulerSize = rulerContainerElement.scrollWidth;
    const middleRulerViewport = rulerContainerElement.clientWidth / 2;
    const middleRuler = rulerSize / 2;
    let timeDiff = 0;
    if (time) {
      const now = DateTime.fromJSDate(new Date());
      const targetTime = DateTime.fromJSDate(time);
      const timeDiffInSec = targetTime.diff(now).as("seconds");
      timeDiff = (timeDiffInSec * rulerSize) / rulerTotalSizeInSeconds;
    }
    rulerContainerElement.scrollLeft = middleRuler + timeDiff - middleRulerViewport;
  }, [time]);

  React.useLayoutEffect(() => {
    registerScrollSync(rulerContainerRef);
    return () => {
      unregisterScrollSync(rulerContainerRef);
    };
  }, [registerScrollSync, unregisterScrollSync]);

  const classes = useStyles();
  return (
    <Box className={classes.root} onScroll={handleScroll} {...{ ref: rulerContainerRef }}>
      <Box className={classes.ruler}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
          return <Divider orientation="vertical" className={classes.segment} key={value} />;
        })}
      </Box>
    </Box>
  );
}
