import React, { PropsWithChildren } from "react";
import { FeaturesProvider } from "./FeaturesProvider";
import { MessagesProvider } from "./MessagesProvider";

export default function AppContext(props: PropsWithChildren<{}>) {
  return (
    <FeaturesProvider>
      <MessagesProvider>{props.children}</MessagesProvider>
    </FeaturesProvider>
  );
}
