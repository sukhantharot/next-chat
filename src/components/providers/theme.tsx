'use client';

import React, {createContext, ReactNode, useContext, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Define the type for the context value
interface ThemeContextValue {
  color: 'light' | 'dark';
  setColor: (newColor: 'light' | 'dark') => void;
}

// Create the context with an initial empty object of type ThemeContextValue
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({children}) => {
  const [color, setColor] = useState<'light' | 'dark'>('dark');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: color,
        },
      }),
    [color],
  );
  return (
    <ThemeContext.Provider value={{color, setColor}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};
