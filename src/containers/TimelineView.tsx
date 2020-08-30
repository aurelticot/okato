import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";
import { TimelineTime } from "components/TimelineTime";
import { TimelineItem } from "components/TimelineItem";
import { getMarketData } from "helpers/APImock";
import { Market } from "interfaces/Market";
import { usePreference } from "hooks/preferencesHooks";
import SettingKey from "enums/SettingKey";
import { getSortingFunction, getMarketSortingMethodByString } from "enums/MarketSortingMethod";

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

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TimelineTime />
      <Box style={{ marginTop: "10px" }}>
        {[...markets].sort(sortMethod).map((market) => {
          return <TimelineItem key={market.code} market={market}></TimelineItem>;
        })}
      </Box>
      <Divider />
    </Box>
  );
}
