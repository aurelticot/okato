import React, { PropsWithChildren, useState, useEffect, useMemo } from "react";
import config from "config";
import UserSettings from "interfaces/UserSettings";

const { defaultUserSettings } = config;

const userSettingsLocalStorageKey = "userSettings";

const initialUserSettings: UserSettings =
  (localStorage ? JSON.parse(localStorage.getItem(userSettingsLocalStorageKey) as string) : defaultUserSettings) ||
  defaultUserSettings;

export const UserSettingsContext = React.createContext({
  userSettings: initialUserSettings,
  setUserSetting: (key: string, value: string | string[]): void => {},
});

export function UserSettingsProvider(props: PropsWithChildren<{}>) {
  const [userSettings, setUserSettings] = useState<UserSettings>(initialUserSettings);

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    localStorage.setItem(userSettingsLocalStorageKey, JSON.stringify(userSettings));
  }, [userSettings]);

  const contextValue = useMemo(
    function () {
      const setter = function (key: string, value: string | string[]) {
        setUserSettings({ ...userSettings, [key]: value });
      };
      return {
        userSettings,
        setUserSetting: setter,
      };
    },
    [userSettings]
  );

  return <UserSettingsContext.Provider value={contextValue}>{props.children}</UserSettingsContext.Provider>;
}
