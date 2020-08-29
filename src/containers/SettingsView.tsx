import React, { useState } from "react";
import { SettingSelectionDialog } from "components/SettingSelectionDialog";
import { List, ListSubheader, ListItem, ListItemIcon, ListItemText, Box } from "@material-ui/core";
import { InvertColors as InvertColorsIcon, Translate as LanguageIcon } from "@material-ui/icons";
import { usePreference } from "hooks/preferencesHooks";
import SettingKeys from "enums/SettingKeys";
import PreferenceValueDefinition from "interfaces/SettingValue";
import { useIntl } from "react-intl";

export function SettingsView() {
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<DialogProps>(emptyDialogProps);

  function openDialog(settingsDialogProps: DialogProps) {
    setDialogProps(settingsDialogProps);
    setDialogOpen(true);
  }

  function closeDialog(value: string | string[]) {
    dialogProps.onClose(value);
    setDialogOpen(false);
  }

  const i18n = useIntl();
  const settingsViewTitle = i18n.formatMessage({
    id: "SettingsView.title",
    defaultMessage: "Settings",
    description: "Title of the Settings view",
  });

  const [theme, setTheme, themesPreferenceDefinition] = usePreference(SettingKeys.Theme);
  const selectedThemeDefinition = themesPreferenceDefinition.values.filter((valueDefinition) => {
    return valueDefinition.key === theme;
  })[0];
  const themeDialogConfiguration = {
    title: i18n.formatMessage({ id: "settings.theme.selectionDialog.title" }),
    selectedValue: theme,
    values: themesPreferenceDefinition.values,
    onClose: setTheme,
  };

  const [language, setLanguage, languagesPreferenceDefinition] = usePreference(SettingKeys.Language);
  const selectedLanguageDefinition = languagesPreferenceDefinition.values.filter((valueDefinition) => {
    return valueDefinition.key === language;
  })[0];
  const languageDialogConfiguration = {
    title: i18n.formatMessage({ id: "settings.language.selectionDialog.title" }),
    selectedValue: language,
    values: languagesPreferenceDefinition.values,
    onClose: setLanguage,
  };

  return (
    <Box>
      <List subheader={<ListSubheader>{settingsViewTitle}</ListSubheader>}>
        <ListItem button onClick={() => openDialog(themeDialogConfiguration)}>
          <ListItemIcon>
            <InvertColorsIcon />
          </ListItemIcon>
          <ListItemText
            primary={i18n.formatMessage({ id: themesPreferenceDefinition.localizedLabelKey })}
            secondary={i18n.formatMessage({ id: selectedThemeDefinition.localizedLabelKey })}
          />
        </ListItem>
        <ListItem button onClick={() => openDialog(languageDialogConfiguration)}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText
            primary={i18n.formatMessage({ id: languagesPreferenceDefinition.localizedLabelKey })}
            secondary={i18n.formatMessage({ id: selectedLanguageDefinition.localizedLabelKey })}
          />
        </ListItem>
      </List>
      <SettingSelectionDialog open={dialogOpen} {...dialogProps} onClose={closeDialog} />
    </Box>
  );
}
