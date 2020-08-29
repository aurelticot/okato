import React, { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import config from "config";
import frenchMessages from "lang/fr.json";
import englishMessages from "lang/en.json";
import SettingKeys from "enums/SettingKeys";
import { usePreference } from "hooks/preferencesHooks";

const defaultLanguageValue = config.defaultPreferenceValues.language;
const defaultLanguage = resolveLanguageValue(defaultLanguageValue);

function resolveLanguageValue(value: string | string[]): string {
  const resolvedLanguage = Array.isArray(value) ? value[0] : value;
  return resolvedLanguage === "system" ? getBrowserLanguage() : resolvedLanguage;
}

function getBrowserLanguage(): string {
  const browserLanguage = navigator.language.split(/[-_]/)[0];
  switch (browserLanguage) {
    case "fr":
      return "fr";
    case "en":
      return "en";
    default:
      return defaultLanguage;
  }
}

// TODO change the return type of the function
function getLocaleMessages(locale: string | string[]): any {
  if (Array.isArray(locale)) {
    return englishMessages;
  }
  switch (locale) {
    case "fr":
      return frenchMessages;
    case "en":
      return englishMessages;
    case "system":
      const systemLanguage = getBrowserLanguage();
      return getLocaleMessages(systemLanguage);
    default:
      return englishMessages;
  }
}

export function MessagesProvider(props: PropsWithChildren<{}>) {
  const browserLanguage = getBrowserLanguage();
  const [languagePreference] = usePreference(SettingKeys.Language);
  const locale: string = resolveLanguageValue(languagePreference || browserLanguage);
  const messages = getLocaleMessages(locale);

  return (
    <IntlProvider key={locale} locale={locale} defaultLocale={defaultLanguage} messages={messages}>
      {props.children}
    </IntlProvider>
  );
}
