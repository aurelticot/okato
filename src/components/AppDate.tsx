import React from "react";
import { Box } from "@material-ui/core";
import { useIntl } from "react-intl";

export function AppDate() {
  const i18n = useIntl();

  return <Box>{i18n.formatMessage({ id: "AppDateToday", defaultMessage: "Today" })}</Box>;
}
