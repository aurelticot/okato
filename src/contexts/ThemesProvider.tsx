import React, { PropsWithChildren, useState, useEffect } from "react";
import { ThemeProvider, Theme } from "@material-ui/core/styles";
import { themes } from "themes/themes";
import { usePreference } from "hooks/preferencesHooks";

function getThemeToApply(theme: string, osTheme: string): Theme {
  switch (theme) {
    case "light":
      return themes.light;
    case "dark":
      return themes.dark;
    default:
      return getThemeToApply(osTheme, osTheme);
  }
}

export function ThemesProvider(props: PropsWithChildren<{}>) {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const [osTheme, setOSTheme] = useState(prefersDarkScheme.matches ? "dark" : "light");

  console.log(`osTheme: ${osTheme}`);

  useEffect(() => {
    function setter(e: MediaQueryListEvent) {
      console.log(`changing OS theme`);
      setOSTheme(e.matches ? "dark" : "light");
    }
    prefersDarkScheme.addListener(setter);
    return () => {
      prefersDarkScheme.removeListener(setter);
    };
  });

  const [themePreference] = usePreference("theme");
  console.log(`Theme preference: ${themePreference}`);

  const appliedTheme = getThemeToApply(themePreference, osTheme);

  return <ThemeProvider theme={appliedTheme}>{props.children}</ThemeProvider>;
}
