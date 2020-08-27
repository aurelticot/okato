import { Theme } from "@material-ui/core/styles";
import { dark } from "themes/dark.theme";
import { light } from "themes/light.theme";

export const themes = {
  dark,
  light,
};

export function getDarkTheme() {
  return themes.dark;
}

export function getLightTheme() {
  return themes.light;
}

export function getTheme(theme: string): Theme {
  switch (theme) {
    case "light":
      return themes.light;
    case "dark":
      return themes.dark;
    default:
      return themes.light;
  }
}
