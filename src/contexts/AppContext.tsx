import React, { PropsWithChildren } from "react";
import { FeaturesProvider } from "contexts/FeaturesProvider";
import { MessagesProvider } from "contexts/MessagesProvider";
import { ThemeProvider } from "@material-ui/core/styles";
import { themes } from "themes/themes";

export default function AppContext(props: PropsWithChildren<{}>) {
  return (
    <FeaturesProvider>
      <MessagesProvider>
        <ThemeProvider theme={themes.dark}>
          {props.children}
        </ThemeProvider>
      </MessagesProvider>
    </FeaturesProvider>
  );
}
