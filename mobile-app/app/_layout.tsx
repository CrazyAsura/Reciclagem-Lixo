
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { persistor, store } from '@/libs/redux-toolkit/redux-persist/store';
import CustomAppBar from '@/components/CustomAppBar';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Redirect } from 'expo-router';
import { ThemedProvider } from '@/components/ThemedProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/libs/api/react query';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemedProvider>
            <CustomAppBar />
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ headerShown: false }} />
                <Stack.Screen name="password-reset" options={{ headerShown: false }} />
                <Stack.Screen name="edit-profile" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="settings" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              </Stack>
          </ThemedProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
