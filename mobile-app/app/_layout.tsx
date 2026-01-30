
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { Provider, useSelector } from 'react-redux';
import { persistor, store } from '@/libs/redux-toolkit/redux-persist/store';
import CustomAppBar from '@/components/CustomAppBar';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Redirect } from 'expo-router';
import { ThemedProvider } from '@/components/ThemedProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/libs/api/react query';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

function InitialLayout() {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isLoggedIn === 'undefined') return;

    const inAuthGroup = segments[0] === '(tabs)';
    
    if (isLoggedIn && !inAuthGroup) {
      // If user is logged in and currently on a public screen (login, register, etc.),
      // redirect them to the main app flow.
      // We check !inAuthGroup to avoid redirecting if they are already in the app.
      // We might need to be more specific if there are other public screens.
      const isPublicRoute = segments.length === 0 || 
                            segments[0] === 'index' || 
                            segments[0] === 'register' || 
                            segments[0] === 'password-reset';
      
      if (isPublicRoute) {
        router.replace('/(tabs)/historic-photos');
      }
    } else if (!isLoggedIn && inAuthGroup) {
      // If user is not logged in but tries to access the protected tabs,
      // redirect back to login.
      router.replace('/');
    }
  }, [isLoggedIn, segments]);

  return (
    <>
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
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemedProvider>
            <InitialLayout />
          </ThemedProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
