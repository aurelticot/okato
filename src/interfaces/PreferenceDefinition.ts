import PreferenceValueDefinition from "interfaces/PreferenceValueDefinition";

export default interface PreferenceDefinition {
  key: string;
  localizedLabelKey: string;
  values: PreferenceValueDefinition[];
}
