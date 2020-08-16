import React, { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import config from "../config";
import frenchMessages from "../lang/fr.json";
import englishMessages from "../lang/en.json";

const { defaultLocale } = config;

function getUserLocale(): string {
  const userLocale = navigator.language.split(/[-_]/)[0];
  switch (userLocale) {
    case "fr":
      return "fr";
    case "en":
      return "en";
    default:
      return defaultLocale;
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
  const locale = getUserLocale();
  const messages = getLocaleMessages(locale);

  return (
    <IntlProvider key={locale} locale={locale} defaultLocale={defaultLocale} messages={messages}>
      {props.children}
    </IntlProvider>
  );
}
