import React from "react";
import { SettingSelectionDialog } from "components/SettingSelectionDialog";
import { List, ListSubheader, ListItem, ListItemIcon, Divider, ListItemText, Box } from "@material-ui/core";
import { InvertColors as InvertColorsIcon, Translate as LanguageIcon } from "@material-ui/icons";
import { usePreference } from "hooks/preferencesHooks";
import PreferenceKeys from "enums/PreferenceKeys";
import PreferenceValueDefinition from "interfaces/PreferenceValueDefinition";

export function SettingsView() {
  const [theme, setTheme, themesPreferenceDefinition] = usePreference(PreferenceKeys.Theme);
  const selectedThemeDefinition = themesPreferenceDefinition.values.filter((valueDefinition) => {
    return valueDefinition.key === theme;
  })[0];

  const [language, setLanguage, languagesPreferenceDefinition] = usePreference(PreferenceKeys.Language);
  const selectedLanguageDefinition = languagesPreferenceDefinition.values.filter((valueDefinition) => {
    return valueDefinition.key === language;
  })[0];

  interface DialogProps {
    title: string;
    selectedValue: string | string[];
    values: PreferenceValueDefinition[];
    onClose: (value: string | string[]) => void;
  }

  const emptyDialogProps: DialogProps = {
    title: "",
    selectedValue: "",
    values: [],
    onClose: () => {},
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogProps, setDialogProps] = React.useState<DialogProps>(emptyDialogProps);

  function openDialog(settingsDialogProps: DialogProps) {
    setDialogProps(settingsDialogProps);
    setDialogOpen(true);
  }

  function closeDialog(value: string | string[]) {
    dialogProps.onClose(value);
    setDialogOpen(false);
  }

  // TODO localized the messages
  return (
    <Box>
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItem
          button
          onClick={() =>
            openDialog({
              title: `Select a ${themesPreferenceDefinition.localizedLabelKey}`,
              selectedValue: theme,
              values: themesPreferenceDefinition.values,
              onClose: setTheme,
            })
          }
        >
          <ListItemIcon>
            <InvertColorsIcon />
          </ListItemIcon>
          <ListItemText
            primary={themesPreferenceDefinition.localizedLabelKey}
            secondary={selectedThemeDefinition.localizedLabelKey}
          />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() =>
            openDialog({
              title: `Select a ${languagesPreferenceDefinition.localizedLabelKey}`,
              selectedValue: language,
              values: languagesPreferenceDefinition.values,
              onClose: setLanguage,
            })
          }
        >
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText
            primary={languagesPreferenceDefinition.localizedLabelKey}
            secondary={selectedLanguageDefinition.localizedLabelKey}
          />
        </ListItem>
        <Divider />
      </List>
      <SettingSelectionDialog open={dialogOpen} {...dialogProps} onClose={closeDialog} />
    </Box>
  );
}
