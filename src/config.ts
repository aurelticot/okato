import SettingKey from "enums/SettingKey";
import Preferences from "interfaces/Preferences";
import settings from "settings";

const timelineVisiblePeriod = 24;
const daysInPast = 3;
const daysInFuture = 3;

const defaultPreferenceValues: Preferences = {
  [SettingKey.Theme]: "system",
  [SettingKey.Language]: "en",
  [SettingKey.MarketSelection]: ["NYSE", "NASDAQ", "EURONEXT"],
};

export default {
  timelineVisiblePeriod,
  daysInPast,
  daysInFuture,
  settings,
  defaultPreferenceValues,
};
