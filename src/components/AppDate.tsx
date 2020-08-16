import React from "react";
import { Box } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

export function AppDate() {
  return (
    <Box>
      <FormattedMessage id="AppDateToday" defaultMessage="Today" />
    </Box>
  );
}
