import { useContext } from "react";
import { FeatureContext } from "../contexts/FeaturesProvider";
import Feature from "../helpers/Feature";

const emptyFeature = new Feature("hidden");

export function useFeature(featureName: string): Feature {
  const features = useContext(FeatureContext);
  const feature = features[featureName];
  return feature ? feature : emptyFeature;
}
