import React, { PropsWithChildren, useState, useEffect, useMemo } from "react";
import config from "config";
import Preferences from "interfaces/Preferences";

const { defaultPreferenceValues } = config;

const initialPreferences: Preferences =
  (localStorage ? JSON.parse(localStorage.getItem("preferences") as string) : defaultPreferenceValues) ||
  defaultPreferenceValues;

export const PreferenceContext = React.createContext({
  preferences: initialPreferences,
  setPreference: (key: string, value: string | string[]): void => {},
});

export function PreferencesProvider(props: PropsWithChildren<{}>) {
  const [preferences, setPreferences] = useState<Preferences>(initialPreferences);

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [preferences]);

  const contextValue = useMemo(
    function () {
      const setPreference = function (key: string, value: string | string[]) {
        setPreferences({ ...preferences, [key]: value });
      };
      return {
        preferences,
        setPreference,
      };
    },
    [preferences]
  );

  return <PreferenceContext.Provider value={contextValue}>{props.children}</PreferenceContext.Provider>;
}
