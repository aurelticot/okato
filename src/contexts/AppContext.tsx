import React, { PropsWithChildren } from "react";
import { FeaturesProvider } from "contexts/FeaturesProvider";
import { MessagesProvider } from "contexts/MessagesProvider";

export default function AppContext(props: PropsWithChildren<{}>) {
  return (
    <FeaturesProvider>
      <MessagesProvider>{props.children}</MessagesProvider>
    </FeaturesProvider>
  );
}
