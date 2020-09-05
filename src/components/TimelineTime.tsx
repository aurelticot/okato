import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton } from "@material-ui/core";
import { Refresh as RefreshIcon } from "@material-ui/icons";
import { AppDate } from "components/AppDate";
import { RealTimeClock } from "components/RealTimeClock";
import { Clock } from "components/Clock";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timeContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  refreshButton: {
    position: "absolute",
    right: "-48px",
  },
}));

interface TimelineTimeProps {
  time: Date | null;
  onClickBackToRealTime: () => void;
}

export function TimelineTime(props: TimelineTimeProps) {
  const { time, onClickBackToRealTime } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.timeContainer}>
        <AppDate time={time} />
        {!time && <RealTimeClock />}
        {time && (
          <>
            <Clock time={time} />
            <Box className={classes.refreshButton}>
              <IconButton onClick={onClickBackToRealTime}>
                <RefreshIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
