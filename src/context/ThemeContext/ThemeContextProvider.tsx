import { useEffect, useMemo, useState } from "react";

import { Theme, ThemeContext, ThemeContextValues } from "./ThemeContext";

interface Props {
  children: React.ReactNode;
}

const THEME_STORAGE_KEY = "os-theme";

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
  };

  const toggleTheme = () => {
    setThemeState(currentTheme => (currentTheme === "dark" ? "light" : "dark"));
  };

  const context: ThemeContextValues = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme]
  );

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
};
