import React, { useState, useEffect } from "react";
import { getMarketData } from "helpers/APImock";
import { Box, List, ListSubheader, ListItemText, ListItem, ListItemSecondaryAction, Switch } from "@material-ui/core";
import { Market } from "interfaces/Market";
import { usePreference } from "hooks/preferencesHooks";
import SettingKey from "enums/SettingKey";
import { useIntl } from "react-intl";

export function MarketSelectionView() {
  const [allMarkets, setAllMarkets] = useState<Market[]>([]);
  const [marketSelection, setMarketSelection] = usePreference(SettingKey.MarketSelection);

  useEffect(() => {
    getMarketData().then((marketsData) => {
      setAllMarkets(marketsData.sort((marketA, marketB) => marketA.name.localeCompare(marketB.name)));
    });
  }, []);

  const handleToggle = (value: string) => () => {
    const currentIndex = marketSelection.indexOf(value);
    const newMarketSelection = [...marketSelection];
    if (currentIndex === -1) {
      newMarketSelection.push(value);
    } else {
      newMarketSelection.splice(currentIndex, 1);
    }
    setMarketSelection(newMarketSelection);
  };

  const i18n = useIntl();

  return (
    <Box>
      <List
        subheader={
          <ListSubheader>
            {i18n.formatMessage({ id: "MarketSelectionView.title", defaultMessage: "Markets" })}
          </ListSubheader>
        }
      >
        {allMarkets.map((market) => {
          return (
            <ListItem key={market.code}>
              <ListItemText id={`switch-list-label-${market.code}`} primary={market.name} secondary={market.city} />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={handleToggle(market.code)}
                  checked={marketSelection.indexOf(market.code) !== -1}
                  inputProps={{ "aria-labelledby": `switch-list-label-${market.code}` }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
