import React, { useState, useEffect, PropsWithChildren } from "react";
import { getFeatureData } from "helpers/APImock";

export const FeatureContext = React.createContext(getFeatureData());

export function FeaturesProvider(props: PropsWithChildren<{}>) {
  const [features, setFeatures] = useState(getFeatureData());

  useEffect(() => {
    setFeatures(getFeatureData());
  }, []);

  return <FeatureContext.Provider value={features}>{props.children}</FeatureContext.Provider>;
}
