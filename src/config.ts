import SettingKeys from "enums/SettingKeys";
import Preferences from "interfaces/Preferences";
import settings from "settings";

const timelineVisiblePeriod = 24;
const daysInPast = 3;
const daysInFuture = 3;

const defaultPreferenceValues: Preferences = {
  [SettingKeys.Theme]: "system",
  [SettingKeys.Language]: "en",
  [SettingKeys.MarketSelection]: ["NYSE", "NASDAQ", "EURONEXT"],
};

export default {
  timelineVisiblePeriod,
  daysInPast,
  daysInFuture,
  settings,
  defaultPreferenceValues,
};
