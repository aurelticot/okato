import SettingKeys from "enums/SettingKeys";
import Settings from "interfaces/Settings";

const settings: Settings = {
  [SettingKeys.Theme]: {
    key: SettingKeys.Theme,
    localizedLabelKey: "settings.theme.label",
    values: [
      { key: "system", localizedLabelKey: "settings.theme.value.system.label" },
      { key: "dark", localizedLabelKey: "settings.theme.value.dark.label" },
      { key: "light", localizedLabelKey: "settings.theme.value.light.label" },
    ],
  },
  [SettingKeys.Language]: {
    key: SettingKeys.Language,
    localizedLabelKey: "settings.language.label",
    values: [
      { key: "system", localizedLabelKey: "settings.language.value.system.label" },
      { key: "en", localizedLabelKey: "settings.language.value.en.label" },
      { key: "fr", localizedLabelKey: "settings.language.value.fr.label" },
    ],
  },
};

export default settings;
