import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import { parseCookies, setCookie } from "nookies";

type ThemeContextData = {
  theme: 'light' | 'dark';
  toogleTheme: () => void;
}

const ThemeContext = createContext({} as ThemeContextData);

type ThemeProviderProps = {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const cookies = parseCookies();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (cookies['moveit.theme']) {
      return cookies['moveit.theme'] as 'light' | 'dark';
    }

    if (typeof window != "undefined") {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setCookie(undefined, 'moveit.theme', 'dark', {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        });

        return 'dark';
      } else {

        setCookie(undefined, 'moveit.theme', 'light', {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        });

        return 'light';
      }
    }
  });
  
  const toogleTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark');

      setCookie(undefined, 'moveit.theme', dark.title, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    } else {
      setTheme('light');

      setCookie(undefined, 'moveit.theme', light.title, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toogleTheme }}>
      <StyledThemeProvider theme={theme === 'light' ? light : dark}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextData => useContext(ThemeContext);