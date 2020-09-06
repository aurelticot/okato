import SettingKey from "enums/SettingKey";
import UserSettings from "interfaces/UserSettings";
import settings from "settings";
import MarketSortingMethod from "enums/MarketSortingMethod";

const timelineVisiblePeriod = 24;
const daysInPast = 2;
const daysRequestedInPast = daysInPast + 1;
const daysInFuture = 2;
const daysRequestedInFuture = daysInFuture + 1;

const defaultUserSettings: UserSettings = {
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
  defaultUserSettings,
};
