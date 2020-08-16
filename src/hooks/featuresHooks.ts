import { useContext } from "react";
import { FeatureContext } from "../contexts/FeaturesProvider";
import { Feature } from "../interfaces/Feature";
import FeatureStatus from "../enums/FeatureStatus";

const emptyFeature = {
  status: FeatureStatus.Hidden,
};

export function useFeature(featureName: string): Feature {
  const features = useContext(FeatureContext);
  const feature = features[featureName];
  return feature ? feature : emptyFeature;
}
