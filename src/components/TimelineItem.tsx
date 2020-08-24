import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";
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

export function TimelineItem(props: { market: Market }) {
  const classes = useStyles();

  const { market } = props;

  return (
    <Box className={classes.root}>
      <Divider />
      <TimelineItemHeader market={market}></TimelineItemHeader>
      <Timeline sessions={market.sessions} timezone={market.timezone} displayTimeMarker />
    </Box>
  );
}
