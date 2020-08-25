import React, { PropsWithChildren, useState, useEffect, useMemo } from "react";

const initialPreferences = (localStorage ? JSON.parse(localStorage.getItem("preferences") as string) : {}) || {};

export const PreferenceContext = React.createContext({
  preferences: initialPreferences,
  setPreference: (key: string, value: any) => {},
});

export function PreferencesProvider(props: PropsWithChildren<{}>) {
  const [preferences, setPreferences] = useState(initialPreferences);

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [preferences]);

  const contextValue = useMemo(
    function () {
      const setPreference = function (key: string, value: any) {
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
