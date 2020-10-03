import SettingValue from "interfaces/SettingValue";

export default interface Setting {
  key: string;
  localizedLabelKey: string;
  values: SettingValue[];
}
