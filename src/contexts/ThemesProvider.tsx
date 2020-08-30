import React, { PropsWithChildren, useState, useEffect } from "react";
import { ThemeProvider, Theme } from "@material-ui/core/styles";
import { getTheme } from "themes/themes";
import { usePreference } from "hooks/preferencesHooks";
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

function resolveTheme(systemTheme: string, themePreference: string | string[]): string {
  return !themePreference || themePreference === "system" || Array.isArray(themePreference)
    ? systemTheme
    : themePreference;
}

export function ThemesProvider(props: PropsWithChildren<{}>) {
  const systemTheme = useSystemTheme();
  const [themePreference] = usePreference(SettingKey.Theme);

  const [appliedTheme, setAppliedTheme] = useState<Theme>(getTheme(resolveTheme(systemTheme, themePreference)));
  useEffect(() => {
    setAppliedTheme(getTheme(resolveTheme(systemTheme, themePreference)));
  }, [systemTheme, themePreference]);

  return <ThemeProvider theme={appliedTheme}>{props.children}</ThemeProvider>;
}
