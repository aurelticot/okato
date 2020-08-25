import { useContext } from "react";
import { PreferenceContext } from "contexts/PreferencesProvider";

export function usePreference(key: string) {
  const { preferences, setPreference } = useContext(PreferenceContext);
  const preference = preferences[key];
  // TODO handle undefined preference
  function setter(value: any) {
    setPreference(key, value);
  }
  return [preference, setter];
}
