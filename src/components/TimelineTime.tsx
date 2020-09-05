import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton } from "@material-ui/core";
import { Refresh as RefreshIcon } from "@material-ui/icons";
import { AppDate } from "components/AppDate";
import { RealTimeClock } from "components/RealTimeClock";
import { useFeature } from "hooks/featuresHooks";
import { Clock } from "components/Clock";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  timeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  refreshButton: {
    position: "absolute",
  },
}));

interface TimelineTimeProps {
  time: Date | null;
  onClickBackToRealTime: () => void;
}

export function TimelineTime(props: TimelineTimeProps) {
  const { time, onClickBackToRealTime } = props;
  const classes = useStyles();
  const timelineScroll = useFeature("timelineScroll");

  return (
    <Box className={classes.root}>
      {time && (
        <Box className={classes.refreshButton}>
          <IconButton onClick={onClickBackToRealTime}>
            <RefreshIcon />
          </IconButton>
        </Box>
      )}
      <Box className={classes.timeContainer}>
        {timelineScroll.isEnabled() && <AppDate time={time} />}
        {time && <Clock time={time} />}
        {!time && <RealTimeClock />}
      </Box>
    </Box>
  );
}
