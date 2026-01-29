// src/hooks/useAppTheme.ts
import { useAppSelector } from '@/libs/redux-toolkit/redux-persist/store';
import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#22c55e',     // seu verde neon
    // personalize mais cores se quiser
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#22c55e',
    // surface: '#121212', etc.
  },
};

export function useAppTheme(): MD3Theme {
  const colorScheme = useColorScheme();           // 'light' | 'dark' | null
  const { mode, userPreference } = useAppSelector(state => state.theme);

  const resolvedMode =
    mode === 'system'
      ? colorScheme ?? 'light'
      : userPreference ?? 'light';

  return resolvedMode === 'dark' ? darkTheme : lightTheme;
}