import React, { useState } from "react";
import { SettingSelectionDialog } from "components/SettingSelectionDialog";
import { List, ListSubheader, ListItem, ListItemIcon, Divider, ListItemText, Box } from "@material-ui/core";
import { InvertColors as InvertColorsIcon, Language as LanguageIcon } from "@material-ui/icons";
import { usePreference } from "hooks/preferencesHooks";
import PreferenceKeys from "enums/PreferenceKeys";

const themeValues = ["system", "light", "dark"];
const languageValues = ["en", "fr"];

export function SettingsView() {
  const [openThemeDialog, setOpenThemeDialog] = useState(false);
  const [theme, setTheme] = usePreference(PreferenceKeys.Theme);
  //const [theme, setTheme] = useState("system");
  const handleClickOpenThemeDialog = () => {
    setOpenThemeDialog(true);
  };
  const handleCloseThemeDialog = (value: string) => {
    setOpenThemeDialog(false);
    setTheme(value);
  };

  const [openLanguageDialog, setOpenLanguageDialog] = useState(false);
  const [language, setLanguage] = usePreference(PreferenceKeys.Language);
  const handleClickOpenLanguageDialog = () => {
    setOpenLanguageDialog(true);
  };
  const handleCloseLanguageDialog = (value: string) => {
    setOpenLanguageDialog(false);
    setLanguage(value);
  };

  return (
    <Box>
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem button onClick={handleClickOpenThemeDialog}>
          <ListItemIcon>
            <InvertColorsIcon />
          </ListItemIcon>
          <ListItemText primary="Theme" secondary={theme} />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleClickOpenLanguageDialog}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary="Language" secondary={language} />
        </ListItem>
        <Divider />
      </List>
      <SettingSelectionDialog
        open={openThemeDialog}
        selectedValue={theme}
        title="Select a theme"
        values={themeValues}
        onClose={handleCloseThemeDialog}
      />
      <SettingSelectionDialog
        open={openLanguageDialog}
        selectedValue={language}
        title="Select a language"
        values={languageValues}
        onClose={handleCloseLanguageDialog}
      />
    </Box>
  );
}
