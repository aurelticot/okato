import React, { PropsWithChildren } from "react";
import { FeaturesProvider } from "contexts/FeaturesProvider";
import { PreferencesProvider } from "contexts/PreferencesProvider";
import { MessagesProvider } from "contexts/MessagesProvider";
import { ThemesProvider } from "contexts/ThemesProvider";

export default function AppContext(props: PropsWithChildren<{}>) {
  return (
    <FeaturesProvider>
      <PreferencesProvider>
        <MessagesProvider>
          <ThemesProvider>{props.children}</ThemesProvider>
        </MessagesProvider>
      </PreferencesProvider>
    </FeaturesProvider>
  );
}
