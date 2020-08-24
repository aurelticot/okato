import FeatureStatus from "enums/FeatureStatus";

export function getFeatureStatusFromString(status: string): FeatureStatus {
  switch (status) {
    case "enabled":
      return FeatureStatus.Enabled;
    case "disabled":
      return FeatureStatus.Disabled;
    case "hidden":
    default:
      return FeatureStatus.Hidden;
  }
}
