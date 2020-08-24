import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { AppDate } from "./AppDate";
import { RealTimeClock } from "./RealTimeClock";
import { useFeature } from "../hooks/featuresHooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export function TimelineTime() {
  const classes = useStyles();
  const timelineScroll = useFeature("timelineScroll");

  return (
    <Box className={classes.root}>
      {timelineScroll.isEnabled() && <AppDate />}
      <RealTimeClock displaySeconds />
    </Box>
  );
}
