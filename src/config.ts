import PreferenceKeys from "enums/PreferenceKeys";
import AvailablePreferences from "interfaces/AvailablePreferences";
import Preferences from "interfaces/Preferences";

const timelineVisiblePeriod = 24;
const daysInPast = 3;
const daysInFuture = 3;

const availablePreferences: AvailablePreferences = {
  [PreferenceKeys.Theme]: {
    key: PreferenceKeys.Theme,
    localizedLabelKey: "Theme",
    values: [
      { key: "system", localizedLabelKey: "System default" },
      { key: "dark", localizedLabelKey: "Dark" },
      { key: "light", localizedLabelKey: "Light" },
    ],
  },
  [PreferenceKeys.Language]: {
    key: PreferenceKeys.Language,
    localizedLabelKey: "Language",
    values: [
      { key: "system", localizedLabelKey: "System default" },
      { key: "en", localizedLabelKey: "English" },
      { key: "fr", localizedLabelKey: "Français" },
    ],
  },
};

const defaultPreferenceValues: Preferences = {
  [PreferenceKeys.Theme]: "system",
  [PreferenceKeys.Language]: "en",
};

export default {
  timelineVisiblePeriod,
  daysInPast,
  daysInFuture,
  availablePreferences,
  defaultPreferenceValues,
};
