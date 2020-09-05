import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { TimelineTime } from "components/TimelineTime";
import { TimelineItem } from "components/TimelineItem";
import { getMarketData } from "helpers/APImock";
import { Market } from "interfaces/Market";
import { usePreference } from "hooks/preferencesHooks";
import SettingKey from "enums/SettingKey";
import { getSortingFunction, getMarketSortingMethodByString } from "enums/MarketSortingMethod";
import { useSynchronizedScroll } from "hooks/SynchronizedTimelineHooks";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "56px",
  },
}));

export function TimelineView() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedMarkets] = usePreference(SettingKey.MarketSelection);
  const [marketSort] = usePreference(SettingKey.MarketSort);

  const sortMethod = getSortingFunction(getMarketSortingMethodByString(marketSort));

  useEffect(() => {
    getMarketData().then((marketsData) => {
      setMarkets(
        marketsData.filter((market) => {
          return selectedMarkets.indexOf(market.code) >= 0 ? true : false;
        })
      );
    });
  }, [selectedMarkets]);

  const [time, setTime] = useState<Date | null>(null);

  const handleTimeNavigation = useCallback((newTime: Date) => {
    setTime(newTime);
  }, []);

  const handleBackToRealTime = useCallback(() => {
    setTime(null);
  }, []);

  const [registerScrollSync, unregisterScrollSync] = useSynchronizedScroll();

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <TimelineTime
        time={time}
        onTimeNavigation={handleTimeNavigation}
        onClickBackToRealTime={handleBackToRealTime}
        registerScrollSync={registerScrollSync}
        unregisterScrollSync={unregisterScrollSync}
      />
      <Box style={{ marginTop: "10px" }}>
        {[...markets].sort(sortMethod).map((market) => {
          return (
            <TimelineItem
              key={market.code}
              time={time}
              market={market}
              registerScrollSync={registerScrollSync}
              unregisterScrollSync={unregisterScrollSync}
            />
          );
        })}
      </Box>
    </Box>
  );
}
