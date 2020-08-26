import React, { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import config from "config";
import frenchMessages from "lang/fr.json";
import englishMessages from "lang/en.json";
import PreferenceKeys from "enums/PreferenceKeys";
import { usePreference } from "hooks/preferencesHooks";

const defaultLanguage = config.defaultPreferences.language;

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

function getLocaleMessages(locale: string) {
  switch (locale) {
    case "fr":
      return frenchMessages;
    case "en":
      return englishMessages;
    default:
      return englishMessages;
  }
}

export function MessagesProvider(props: PropsWithChildren<{}>) {
  const browserLanguage = getBrowserLanguage();
  const [languagePreference] = usePreference(PreferenceKeys.Language);
  const locale = languagePreference || browserLanguage;
  const messages = getLocaleMessages(locale);

  return (
    <IntlProvider key={locale} locale={locale} defaultLocale={defaultLanguage} messages={messages}>
      {props.children}
    </IntlProvider>
  );
}
