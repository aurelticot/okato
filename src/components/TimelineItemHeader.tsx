import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { MarketTitle } from "components/MarketTitle";
import { RealTimeClock } from "components/RealTimeClock";
import { MarketNextEvent } from "components/MarketNextEvent";
import { Market } from "interfaces/Market";
import MarketStatus from "enums/MarketStatus";
import { useMarketStatus } from "hooks/marketStatusHooks";
import { useNextEvent } from "hooks/nextEventHooks";
import { Clock } from "./Clock";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerComponent: {
    flexBasis: "33.3333%",
  },
  marketOpen: {
    color: theme.palette.success.main,
  },
  marketClosed: {
    color: theme.palette.error.main,
  },
  marketAfterBeforeHour: {
    color: theme.palette.warning.main,
  },
}));

function defineMarketStatusClass(status: MarketStatus, classes: any): string {
  switch (status) {
    case MarketStatus.Opened:
    case MarketStatus.Break:
      return classes.marketOpen;
    case MarketStatus.Closed:
    case MarketStatus.Closed_Special:
      return classes.marketClosed;
    case MarketStatus.BeforeMarket:
    case MarketStatus.AfterMarket:
      return classes.marketAfterBeforeHour;
    default:
      return ``;
  }
}

export interface TimelineItemHeaderProps {
  time: Date | null;
  market: Market;
}

export function TimelineItemHeader(props: TimelineItemHeaderProps) {
  const { time, market } = props;
  const classes = useStyles(props);
  const status = useMarketStatus(market, true, time);
  const nextEvent = useNextEvent(market, true);

  const marketStatusClass = defineMarketStatusClass(status, classes);

  return (
    <Box className={`${classes.root} ${marketStatusClass}`}>
      <Box className={`${classes.headerComponent}`} display="flex" justifyContent="flex-start">
        <MarketTitle market={market} time={time} />
      </Box>
      <Box className={`${classes.headerComponent}`} display="flex" justifyContent="center">
        {time && <Clock time={time} timezone={market.timezone} displayTimezone displayDayDiff />}
        {!time && <RealTimeClock timezone={market.timezone} displayTimezone displayDayDiff />}
      </Box>
      <Box className={classes.headerComponent} display="flex" justifyContent="flex-end">
        {nextEvent !== null && !time && <MarketNextEvent nextEvent={nextEvent} />}
      </Box>
    </Box>
  );
}
