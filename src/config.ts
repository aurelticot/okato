import SettingKey from "enums/SettingKey";
import Preferences from "interfaces/Preferences";
import settings from "settings";
import MarketSortingMethod from "enums/MarketSortingMethod";

const timelineVisiblePeriod = 24;
const daysInPast = 3;
const daysRequestedInPast = daysInPast + 1;
const daysInFuture = 3;
const daysRequestedInFuture = daysInFuture + 1;

const defaultPreferenceValues: Preferences = {
  [SettingKey.Theme]: "system",
  [SettingKey.Language]: "system",
  [SettingKey.MarketSelection]: ["NYSE", "NASDAQ", "EURONEXT"],
  [SettingKey.MarketSort]: MarketSortingMethod.Chronologically,
};

export default {
  timelineVisiblePeriod,
  daysInPast,
  daysRequestedInPast,
  daysInFuture,
  daysRequestedInFuture,
  settings,
  defaultPreferenceValues,
};
