import React from "react";

export function useSavedState(
  key: string,
  defaultValue?: string
): [string | undefined, (value: string) => void, () => void] {
  const [value, setValue] = React.useState(window.localStorage.getItem(key) || defaultValue);

  function clear() {
    window.localStorage.removeItem(key);
  }

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue, clear];
}

export function useSessionSavedState(
  key: string,
  defaultValue?: string
): [string | undefined, (value: string) => void, () => void] {
  const [value, setValue] = React.useState(window.sessionStorage.getItem(key) || defaultValue);

  function clear() {
    window.sessionStorage.removeItem(key);
  }

  React.useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue, clear];
}
