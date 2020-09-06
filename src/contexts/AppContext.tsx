import React, { PropsWithChildren } from "react";
import { FeaturesProvider } from "contexts/FeaturesProvider";
import { UserSettingsProvider } from "contexts/UserSettingsProvider";
import { MessagesProvider } from "contexts/MessagesProvider";
import { ThemesProvider } from "contexts/ThemesProvider";

export default function AppContext(props: PropsWithChildren<{}>) {
  return (
    <FeaturesProvider>
      <UserSettingsProvider>
        <MessagesProvider>
          <ThemesProvider>{props.children}</ThemesProvider>
        </MessagesProvider>
      </UserSettingsProvider>
    </FeaturesProvider>
  );
}
