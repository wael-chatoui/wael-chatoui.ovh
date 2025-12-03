"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
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
      if (window.localStorage.getItem("theme")) {
        return;
      }

      setIsDark(event.matches);
      syncDocumentTheme(event.matches);
    };

    try {
      // On mount, read the actual preference
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const storedPreference = window.localStorage.getItem("theme");
      const initialIsDark = storedPreference
        ? storedPreference === "dark"
        : mediaQuery.matches;

      console.log('[ThemeWrapper] Hydrating with theme:', initialIsDark ? 'dark' : 'light', '| source:', storedPreference ? 'localStorage' : 'system preference');
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

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      console.log('[ThemeWrapper] Toggle theme:', next ? 'dark' : 'light');
      window.localStorage.setItem("theme", next ? "dark" : "light");
      syncDocumentTheme(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      isDark,
      toggleTheme,
      isHydrated,
    }),
    [isDark, toggleTheme, isHydrated],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
