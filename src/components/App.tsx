import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { TimelineView } from "./TimelineView";
import { ApplicationBar } from "./ApplicationBar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    fontSize: "1.1em",
  },
}));

export function App() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TimelineView />
      <ApplicationBar />
    </Box>
  );
}
