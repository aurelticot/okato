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
  },
}));

interface TimelineItemProps {
  market: Market;
  time: Date | null;
}

export function TimelineItem(props: TimelineItemProps) {
  const classes = useStyles();

  const { market, time } = props;

  return (
    <Box className={classes.root}>
      <TimelineItemHeader time={time} market={market} />
      <Timeline sessions={market.sessions} timezone={market.timezone} displayTimeMarker />
    </Box>
  );
}
