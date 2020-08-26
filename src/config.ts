import PreferenceKeys from "enums/PreferenceKeys";

const timelineVisiblePeriod = 24;
const daysInPast = 3;
const daysInFuture = 3;
const defaultPreferences = {
  [PreferenceKeys.Theme]: "system",
  [PreferenceKeys.Language]: "en",
};

export default {
  timelineVisiblePeriod,
  daysInPast,
  daysInFuture,
  defaultPreferences,
};
