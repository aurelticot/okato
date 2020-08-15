import React, { PropsWithChildren, useState, useEffect } from "react";
import { FeatureContext } from "./FeatureContext";
import { getFeatureData } from "../helpers/APImock";

export default function AppContext(props: PropsWithChildren<{}>) {
  const [features, setFeatures] = useState(getFeatureData());

  useEffect(() => {
    setFeatures(getFeatureData());
  }, []);

  return <FeatureContext.Provider value={features}>{props.children}</FeatureContext.Provider>;
}
