import { useContext } from "react";
import { PreferenceContext } from "contexts/PreferencesProvider";
import SettingKey from "enums/SettingKey";
import PreferenceDefinition from "interfaces/Setting";
import config from "config";

const { settings, defaultPreferenceValues } = config;

export function usePreference(key: SettingKey) {
  const { preferences, setPreference } = useContext(PreferenceContext);
  const definition = settings[key];
  const defaultValue = defaultPreferenceValues[key];
  const preference = preferences[key];

  function setter(value: string | string[]): void {
    setPreference(key, value);
  }

  const returnedObject: [
    string | string[],
    (value: string | string[]) => void,
    PreferenceDefinition,
    string | string[]
  ] = [preference ? preference : defaultValue, setter, definition, defaultValue];
  return returnedObject;
}
