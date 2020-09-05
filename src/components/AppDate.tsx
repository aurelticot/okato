import React from "react";
import { Box } from "@material-ui/core";
import { useIntl } from "react-intl";

interface AppDateProps {
  time: Date | null;
}

export function AppDate({ time }: AppDateProps) {
  const i18n = useIntl();

  //i18n.formatMessage({ id: "AppDateToday", defaultMessage: "Today" })

  return (
    <>
      {time && <Box>{i18n.formatDate(time)}</Box>}
      {!time && <Box>{i18n.formatDate(new Date())}</Box>}
    </>
  );
}
