'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../theme/theme';
import { useAppSelector } from '../state/hooks';
import React from 'react';

interface MuiProviderProps {
  children: React.ReactNode;
}

function MuiProviderContent({ children }: MuiProviderProps) {
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function MuiProvider({ children }: MuiProviderProps) {
  return (
    <MuiProviderContent>{children}</MuiProviderContent>
  );
}
