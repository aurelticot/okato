import React, { useState, useContext } from "react";
import { FeatureContext } from "../contexts/FeatureContext";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton } from "@material-ui/core";
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
import { Market } from "../interfaces/Market";
import FeatureStatus from "../enums/FeatureStatus";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
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
  const { bookmark, reminder } = useContext(FeatureContext);
  const classes = useStyles(props);

  const { market } = props;
  const [bookmarked, setBookmarked] = useState(market.isBookmarked);

  return (
    <Box className={classes.root}>
      {bookmark.status === FeatureStatus.Enabled && (
        <IconButton size="small" onClick={() => setBookmarked(!bookmarked)}>
          {bookmarked ? (
            <BookmarkIcon className={classes.bookmarkIcon} />
          ) : (
            <BookmarkBorderIcon className={classes.bookmarkIcon} />
          )}
        </IconButton>
      )}
      <Box>{market.name}</Box>
      {reminder.status === FeatureStatus.Enabled && market.hasReminder && (
        <NotificationsIcon className={classes.reminderIcon} />
      )}
    </Box>
  );
}
