import SettingKey from "enums/SettingKey";
import Settings from "interfaces/Settings";

const settings: Settings = {
  [SettingKey.Theme]: {
    key: SettingKey.Theme,
    localizedLabelKey: "settings.theme.label",
    values: [
      { key: "system", localizedLabelKey: "settings.theme.value.system.label" },
      { key: "dark", localizedLabelKey: "settings.theme.value.dark.label" },
      { key: "light", localizedLabelKey: "settings.theme.value.light.label" },
    ],
  },
  [SettingKey.Language]: {
    key: SettingKey.Language,
    localizedLabelKey: "settings.language.label",
    values: [
      { key: "system", localizedLabelKey: "settings.language.value.system.label" },
      { key: "en", localizedLabelKey: "settings.language.value.en.label" },
      { key: "fr", localizedLabelKey: "settings.language.value.fr.label" },
    ],
  },
};

export default settings;
