import { useContext } from "react";
import { UserSettingsContext } from "contexts/UserSettingsProvider";
import SettingKey from "enums/SettingKey";
import SettingDefinition from "interfaces/Setting";
import config from "config";

const { settings, defaultUserSettings } = config;

export function useUserSetting(key: SettingKey) {
  const { userSettings, setUserSetting } = useContext(UserSettingsContext);
  const definition = settings[key];
  const defaultValue = defaultUserSettings[key];
  const userSetting = userSettings[key];

  function setter(value: string | string[]): void {
    setUserSetting(key, value);
  }

  const returnedObject: [
    string | string[],
    (value: string | string[]) => void,
    SettingDefinition,
    string | string[]
  ] = [userSetting ? userSetting : defaultValue, setter, definition, defaultValue];
  return returnedObject;
}
