import { useContext } from "react";
import { PreferenceContext } from "contexts/PreferencesProvider";
import SettingKeys from "enums/SettingKeys";
import PreferenceDefinition from "interfaces/Setting";
import config from "config";

const { settings } = config;

export function usePreference(key: SettingKeys) {
  const { preferences, setPreference } = useContext(PreferenceContext);
  const definition = settings[key];
  const preference = preferences[key];
  // TODO handle undefined preference
  function setter(value: string | string[]): void {
    setPreference(key, value);
  }

  const returnedObject: [string | string[], (value: string | string[]) => void, PreferenceDefinition] = [
    preference,
    setter,
    definition,
  ];
  return returnedObject;
}
