import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, TouchableOpacity, Platform, StatusBar } from 'react-native';
import {
  Appbar,
  Avatar,
  useTheme,
  IconButton,
  Menu,
  Divider,
} from 'react-native-paper';

// Importe os hooks tipados do arquivo correto
import { useAppSelector, useAppDispatch } from '@/libs/redux-toolkit/redux-persist/store';
import { toggleTheme } from '@/libs/redux-toolkit/themeSlice';

const sunIcon = 'white-balance-sunny';
const moonIcon = 'weather-night';

export default function CustomAppBar() {
  const dispatch = useAppDispatch();              // ← correto
  const mode = useAppSelector((state) => state.theme.mode); // ← tipado e correto
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const theme = useTheme();

  const isDark = mode === 'dark';

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const avatarRef = useRef<View>(null);

  const [menuVisible, setMenuVisible] = useState(false);

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

  const handleLogout = () => {
    closeMenu();
    console.log('Logout realizado!');
    // sua lógica de logout aqui
  };

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
                <Avatar.Image
                  size={40}
                  source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
            }
            contentStyle={{ borderRadius: 12, elevation: 8, marginTop: 40 }}
          >
            <Menu.Item
              onPress={() => {
                closeMenu();
                console.log('Ir para Perfil');
              }}
              title="Perfil"
              leadingIcon="account-circle-outline"
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
                console.log('Ir para Configurações');
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
    </>
  );
}

const styles = StyleSheet.create({
  header: { elevation: 4 },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  iconWrapper: { padding: 4 },
});