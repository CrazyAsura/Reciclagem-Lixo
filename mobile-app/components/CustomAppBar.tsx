import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, TouchableOpacity, Platform, StatusBar } from 'react-native';
import {
  Appbar,
  Avatar,
  useTheme,
  IconButton,
  Menu,
  Divider,
  Badge,
} from 'react-native-paper';

// Importe os hooks tipados do arquivo correto
import { useAppSelector, useAppDispatch } from '@/libs/redux-toolkit/redux-persist/store';
import { toggleTheme } from '@/libs/redux-toolkit/themeSlice';
import { NotificationModal } from './NotificationModal';

const sunIcon = 'white-balance-sunny';
const moonIcon = 'weather-night';

import { usePathname } from 'expo-router';

// ... existing imports

import { useRouter } from 'expo-router';
import { logout } from '@/libs/redux-toolkit/authSlice';
import { useLogoutAuthQuery } from '@/libs/api/react query/auth-query';
import { Alert } from 'react-native';

export default function CustomAppBar() {
  const router = useRouter();
  const logoutMutation = useLogoutAuthQuery();
  const pathname = usePathname();
  const dispatch = useAppDispatch();              
  const mode = useAppSelector((state) => state.theme.mode); 
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  const theme = useTheme();

  const isDark = mode === 'dark';

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const toggleMenu = () => setMenuVisible((prev) => !prev);
  const closeMenu = () => setMenuVisible(false);

  const onToggleTheme = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
      dispatch(toggleTheme());
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleLogout = async () => {
    closeMenu();
    try {
      if (user) {
        // Attempt API logout
        await logoutMutation.mutateAsync({
          id: user.id,
          email: user.email,
          role: user.role || 'USER',
          isActive: user.isActive ?? true,
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue to local logout even if API fails
    } finally {
      dispatch(logout());
      router.replace('/');
    }
  };

  // Hide CustomAppBar on auth screens and modals
  if (pathname === '/' || pathname === '/register' || pathname === '/password-reset' || pathname === '/edit-profile' || pathname === '/settings') {
    return null;
  }

  return (
    <>
      <Appbar.Header
        mode="small"
        elevated
        style={[styles.header, { backgroundColor: theme.colors.surface }]}
      >
        {isLoggedIn && (
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={toggleMenu}>
                {user?.photo ? (
                  <Avatar.Image
                    size={40}
                    source={{ uri: user.photo }}
                    style={{ marginLeft: 8 }}
                  />
                ) : (
                  <Avatar.Icon
                    size={40}
                    icon="account"
                    style={{ marginLeft: 8, backgroundColor: theme.colors.surfaceVariant }}
                  />
                )}
              </TouchableOpacity>
            }
            contentStyle={{ borderRadius: 12, elevation: 8, marginTop: 40 }}
          >
            <Menu.Item
              onPress={() => {
                closeMenu();
                router.push('/(tabs)/profile');
              }}
              title="Perfil"
              leadingIcon="account-circle-outline"
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
                router.push('/settings');
              }}
              title="Configurações"
              leadingIcon="cog-outline"
            />
            <Divider />
            <Menu.Item
              onPress={handleLogout}
              title="Sair"
              leadingIcon="door-open"
              titleStyle={{ color: theme.colors.error }}
            />
          </Menu>
        )}

        <Appbar.Content
          title="Meu App"
          titleStyle={{ marginLeft: 12, fontWeight: '600' }}
        />

        <View style={styles.actionsContainer}>
          <View>
            <IconButton
              icon="bell-outline"
              size={24}
              onPress={() => setNotificationVisible(true)}
              iconColor={theme.colors.onSurface}
            />
            <Badge size={16} style={styles.badge}>1</Badge>
          </View>

          <TouchableOpacity onPress={onToggleTheme} style={styles.iconWrapper}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <IconButton
                icon={isDark ? moonIcon : sunIcon}
                size={26}
                iconColor={theme.colors.primary}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Appbar.Header>

      <NotificationModal 
        visible={notificationVisible} 
        onDismiss={() => setNotificationVisible(false)} 
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: { elevation: 4 },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    gap: 0,
  },
  iconWrapper: { padding: 4 },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff3b30',
  }
});