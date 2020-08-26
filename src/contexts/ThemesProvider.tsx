import React, { PropsWithChildren, useState, useEffect } from "react";
import { ThemeProvider, Theme } from "@material-ui/core/styles";
import { themes } from "themes/themes";
import { usePreference } from "hooks/preferencesHooks";
import PreferenceKeys from "enums/PreferenceKeys";
import config from "config";

const defaultTheme = config.defaultPreferences.theme;

function getMuiTheme(theme: string = defaultTheme): Theme {
  switch (theme) {
    case "light":
      return themes.light;
    case "dark":
      return themes.dark;
    default:
      return themes.light;
  }
}

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

function resolveTheme(systemTheme: string, themePreference: string): string {
  return !themePreference || themePreference === "system" ? systemTheme : themePreference;
}

export function ThemesProvider(props: PropsWithChildren<{}>) {
  const systemTheme = useSystemTheme();
  const [themePreference] = usePreference(PreferenceKeys.Theme);

  const [appliedTheme, setAppliedTheme] = useState<Theme>(getMuiTheme(resolveTheme(systemTheme, themePreference)));
  useEffect(() => {
    setAppliedTheme(getMuiTheme(resolveTheme(systemTheme, themePreference)));
  }, [systemTheme, themePreference]);

  return <ThemeProvider theme={appliedTheme}>{props.children}</ThemeProvider>;
}
