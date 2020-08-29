import SettingKeys from "enums/SettingKeys";
import Preferences from "interfaces/Preferences";
import settings from "settings";

const timelineVisiblePeriod = 24;
const daysInPast = 3;
const daysInFuture = 3;

const defaultPreferenceValues: Preferences = {
  [SettingKeys.Theme]: "system",
  [SettingKeys.Language]: "en",
};

export default {
  timelineVisiblePeriod,
  daysInPast,
  daysInFuture,
  settings,
  defaultPreferenceValues,
};
