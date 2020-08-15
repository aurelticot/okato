import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Box, IconButton } from "@material-ui/core";
import { Sort as SortIcon, Edit as EditIcon, Person as PersonIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.background.default,
    top: "auto",
    bottom: 0,
  },
}));

export function ApplicationBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Box width="100%" display="flex" justifyContent="space-between">
          <IconButton edge="start">
            <SortIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton edge="end">
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
