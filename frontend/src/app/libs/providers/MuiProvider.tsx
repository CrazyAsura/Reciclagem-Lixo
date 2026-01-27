'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme/theme';
import React from 'react';

interface MuiProviderProps {
  children: React.ReactNode;
}

export function MuiProvider({ children }: MuiProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
