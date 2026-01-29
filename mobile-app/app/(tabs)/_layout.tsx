import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Icon, useTheme } from 'react-native-paper';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AddActionSheet } from '@/components/AddActionSheet';

export default function TabLayout() {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const activeColor = theme.colors.primary;
  const fabColor = theme.colors.primaryContainer;
  const fabIconColor = theme.colors.onPrimaryContainer;
  const borderColor = theme.colors.outline;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            height: 70,
            paddingBottom: 8,
            paddingTop: 6,
            backgroundColor: theme.colors.surface,
            borderTopWidth: 0,
            elevation: 8,
          },
        }}
      >
        <Tabs.Screen
          name="historic-photos"
          options={{
            title: 'Histórico',
            tabBarIcon: ({ color }) => <Icon size={28} source="history" color={color} />,
          }}
        />

        <Tabs.Screen
          name="forum"
          options={{
            title: 'Fórum',
            tabBarIcon: ({ color }) => <Icon size={28} source="forum" color={color} />,
          }}
        />

        {/* Sem aba "add" aqui – removida */}

        <Tabs.Screen
          name="courses"
          options={{
            title: 'Cursos',
              tabBarIcon: ({ color }) => <Icon size={28} source="school" color={color} />,
            }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color }) => <Icon size={28} source="account" color={color} />,
          }}
        />
      </Tabs>

      {/* FAB central – vazando para cima */}
      <FAB
        icon="plus"
        customSize={72}
        style={[
          styles.fab,
          {
            backgroundColor: fabColor,
            borderWidth: 3,
            borderColor: borderColor,
            borderRadius: 44,
          },
        ]}
        color={fabIconColor}
        onPress={() => setModalVisible(true)}
        rippleColor="rgba(255,255,255,0.3)"
      />

      <AddActionSheet visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 38,          // Ajuste fino aqui!
                         // - Se a tab bar tem ~70px de height + padding
                         // - bottom: 38 → vaza ~34px para cima (metade do FAB 72px)
                         // Teste valores entre 30 e 50 dependendo do dispositivo
    alignSelf: 'center',
    elevation: 8,        // Sombra mais forte para destacar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});