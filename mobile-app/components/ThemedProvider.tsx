import React from 'react';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useAppSelector } from '@/libs/redux-toolkit/redux-persist/store';
import { StatusBar } from 'expo-status-bar';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';

// Custom Light Theme
const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#22c55e',
    onPrimary: '#000000',
    background: '#ffffff',
    surface: '#f5f5f5',
    onSurface: '#000000',
    outline: '#22c55e',
    elevation: {
        level0: 'transparent',
        level1: '#f5f5f5',
        level2: '#eeeeee',
        level3: '#e0e0e0',
        level4: '#d6d6d6',
        level5: '#cccccc',
    }
  },
};

// Custom Dark Theme
const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#22c55e',
    onPrimary: '#000000',
    background: '#000000',
    surface: '#121212',
    onSurface: '#ffffff',
    outline: '#22c55e',
    elevation: {
        level0: 'transparent',
        level1: '#1a1a1a',
        level2: '#222222',
        level3: '#2a2a2a',
        level4: '#303030',
        level5: '#353535',
    }
  },
};

// Navigation Themes
const CustomNavigationLightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: '#22c55e',
    background: '#ffffff',
    card: '#f5f5f5',
    text: '#000000',
    border: '#e5e5e5',
  },
};

const CustomNavigationDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: '#22c55e',
    background: '#000000',
    card: '#121212',
    text: '#ffffff',
    border: '#333333',
  },
};

export function ThemedProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.theme.mode);
  
  // Logic to handle 'system' mode could be added here using useColorScheme()
  // For now, mapping 'system' to 'dark' default or respecting user choice if simpler
  const isDark = mode === 'dark' || (mode === 'system' && false); // Replace false with useColorScheme() === 'dark'

  const paperTheme = isDark ? CustomDarkTheme : CustomLightTheme;
  const navigationTheme = isDark ? CustomNavigationDarkTheme : CustomNavigationLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationThemeProvider value={navigationTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={paperTheme.colors.background} />
        {children}
      </NavigationThemeProvider>
    </PaperProvider>
  );
}