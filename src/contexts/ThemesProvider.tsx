import React, { PropsWithChildren, useState, useEffect } from "react";
import { ThemeProvider, Theme } from "@material-ui/core/styles";
import { getTheme } from "themes/themes";
import { useUserSetting } from "hooks/settingsHooks";
import SettingKey from "enums/SettingKey";

function useSystemTheme(): string {
  const systemDarkThemeMatcher = window.matchMedia("(prefers-color-scheme: dark)");
  const [systemTheme, setSystemTheme] = useState(systemDarkThemeMatcher.matches ? "dark" : "light");
  useEffect(() => {
    function setter(e: MediaQueryListEvent) {
      setSystemTheme(e.matches ? "dark" : "light");
    }
    systemDarkThemeMatcher.addListener(setter);
    return () => {
      systemDarkThemeMatcher.removeListener(setter);
    };
  });
  return systemTheme;
}

function resolveTheme(systemTheme: string, userTheme: string | string[]): string {
  return !userTheme || userTheme === "system" || Array.isArray(userTheme) ? systemTheme : userTheme;
}

export function ThemesProvider(props: PropsWithChildren<{}>) {
  const systemTheme = useSystemTheme();
  const [userTheme] = useUserSetting(SettingKey.Theme);

  const [appliedTheme, setAppliedTheme] = useState<Theme>(getTheme(resolveTheme(systemTheme, userTheme)));
  useEffect(() => {
    setAppliedTheme(getTheme(resolveTheme(systemTheme, userTheme)));
  }, [systemTheme, userTheme]);

  return <ThemeProvider theme={appliedTheme}>{props.children}</ThemeProvider>;
}
