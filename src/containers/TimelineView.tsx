import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";
import { TimelineTime } from "components/TimelineTime";
import { TimelineItem } from "components/TimelineItem";
import { getMarketData } from "helpers/APImock";
import { Market } from "interfaces/Market";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "56px",
  },
}));

export function TimelineView() {
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    getMarketData().then((marketsData) => {
      setMarkets(marketsData);
    });
  }, []);

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TimelineTime />
      <Box style={{ marginTop: "10px" }}>
        {markets.map((market) => {
          return <TimelineItem key={market.code} market={market}></TimelineItem>;
        })}
      </Box>
      <Divider />
    </Box>
  );
}
