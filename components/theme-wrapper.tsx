"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

type ThemeContextValue = {
  isDark: boolean;
  isHydrated: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const syncDocumentTheme = (isDark: boolean) => {
  if (typeof document === "undefined") {
    return;
  }

  const htmlElement = document.documentElement;
  htmlElement.classList.toggle("dark", isDark);
  htmlElement.style.colorScheme = isDark ? "dark" : "light";
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeWrapper");
  }
  return context;
}

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  // Start with false (light mode) for SSR consistency
  const [isDark, setIsDark] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let mediaQuery: MediaQueryList | null = null;

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsDark(event.matches);
      syncDocumentTheme(event.matches);
    };

    try {
      // On mount, read the actual preference
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const initialIsDark = mediaQuery.matches;

      console.log('[ThemeWrapper] Hydrating with theme from system preference:', initialIsDark ? 'dark' : 'light');
      setIsDark(initialIsDark);
      syncDocumentTheme(initialIsDark);

      mediaQuery.addEventListener("change", handleMediaChange);
    } catch (error) {
      console.error("[ThemeWrapper] Failed to read theme preference", error);
    } finally {
      setIsHydrated(true);
    }

    return () => {
      mediaQuery?.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const value = useMemo(
    () => ({
      isDark,
      isHydrated,
    }),
    [isDark, isHydrated],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
