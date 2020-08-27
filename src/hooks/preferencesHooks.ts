import { useContext } from "react";
import { PreferenceContext } from "contexts/PreferencesProvider";
import PreferenceKeys from "enums/PreferenceKeys";
import PreferenceDefinition from "interfaces/PreferenceDefinition";
import config from "config";

const { availablePreferences } = config;

export function usePreference(key: PreferenceKeys) {
  const { preferences, setPreference } = useContext(PreferenceContext);
  const definition = availablePreferences[key];
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
