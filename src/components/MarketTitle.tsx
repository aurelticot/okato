import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton } from "@material-ui/core";
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Notifications as NotificationsIcon,
  Brightness1 as FullCircle,
  TripOrigin as HollowedCircle,
} from "@material-ui/icons";
import { Market } from "interfaces/Market";
import { useFeature } from "hooks/featuresHooks";
import { useMarketStatus } from "hooks/marketStatusHooks";
import MarketStatus from "enums/MarketStatus";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  statusIcon: {
    fontSize: "0.7em",
    margin: "0 0.5em",
  },
  bookmarkIcon: {
    fontSize: "1em",
    color: theme.palette.text.secondary,
  },
  reminderIcon: {
    fontSize: "0.7em",
    color: theme.palette.text.secondary,
  },
}));

export interface MarketTitleProps {
  market: Market;
}

export function MarketTitle(props: MarketTitleProps) {
  const bookmark = useFeature("bookmark");
  const reminder = useFeature("reminder");
  const classes = useStyles(props);

  const { market } = props;
  const status = useMarketStatus(market, true);
  const [bookmarked, setBookmarked] = useState(market.isBookmarked);

  return (
    <Box className={classes.root}>
      {bookmark.isEnabled() && (
        <IconButton size="small" onClick={() => setBookmarked(!bookmarked)}>
          {bookmarked ? (
            <BookmarkIcon className={classes.bookmarkIcon} />
          ) : (
            <BookmarkBorderIcon className={classes.bookmarkIcon} />
          )}
        </IconButton>
      )}
      <Box>{market.name}</Box>
      {status === MarketStatus.Opened ? (
        <FullCircle className={classes.statusIcon} />
      ) : (
        <HollowedCircle className={classes.statusIcon} />
      )}
      {reminder.isEnabled() && market.hasReminder && <NotificationsIcon className={classes.reminderIcon} />}
    </Box>
  );
}
