import SettingKeys from "enums/SettingKeys";
import Settings from "interfaces/Settings";

const settings: Settings = {
  [SettingKeys.Theme]: {
    key: SettingKeys.Theme,
    localizedLabelKey: "Theme",
    values: [
      { key: "system", localizedLabelKey: "System default" },
      { key: "dark", localizedLabelKey: "Dark" },
      { key: "light", localizedLabelKey: "Light" },
    ],
  },
  [SettingKeys.Language]: {
    key: SettingKeys.Language,
    localizedLabelKey: "Language",
    values: [
      { key: "system", localizedLabelKey: "System default" },
      { key: "en", localizedLabelKey: "English" },
      { key: "fr", localizedLabelKey: "Français" },
    ],
  },
};

export default settings;
