import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { AppDate } from "./AppDate";
import { AppClock } from "./AppClock";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export function TimelineTime() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppDate></AppDate>
      <AppClock displaySeconds></AppClock>
    </Box>
  );
}
