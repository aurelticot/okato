import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { TimelineItemHeader } from "components/TimelineItemHeader";
import { Timeline } from "components/Timeline";
import { Market } from "interfaces/Market";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "5px",
    paddingBottom: "5px",
    position: "relative",
  },
}));

interface TimelineItemProps {
  market: Market;
  time: Date | null;
  registerScrollSync: (ref: React.MutableRefObject<HTMLDivElement | undefined>) => void;
  unregisterScrollSync: (ref: React.MutableRefObject<HTMLDivElement | undefined>) => void;
}

export function TimelineItem(props: TimelineItemProps) {
  const classes = useStyles();

  const { market, time, registerScrollSync, unregisterScrollSync } = props;

  return (
    <Box className={classes.root}>
      <TimelineItemHeader time={time} market={market}></TimelineItemHeader>
      <Timeline
        time={time}
        sessions={market.sessions}
        timezone={market.timezone}
        registerScrollSync={registerScrollSync}
        unregisterScrollSync={unregisterScrollSync}
        displayTimeMarker
      />
    </Box>
  );
}
