import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch, Divider, useTheme, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/libs/redux-toolkit/themeSlice';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { mode } = useSelector((state: any) => state.theme);
  
  // Local state for toggles (mocking functionality for now)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  const isDark = mode === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <IconButton icon="close" onPress={() => router.back()} iconColor={theme.colors.onSurface} />
        <Text variant="headlineSmall" style={{ color: theme.colors.onSurface, flex: 1, textAlign: 'center', marginRight: 48 }}>
          Configurações
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <List.Section>
          <List.Subheader>Geral</List.Subheader>
          
          <List.Item
            title="Tema Escuro"
            description="Alternar entre claro e escuro"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={isDark}
                onValueChange={() => { dispatch(toggleTheme()); }}
              />
            )}
          />

          <Divider />

          <List.Item
            title="Notificações"
            description="Receber alertas e novidades"
            left={(props) => <List.Icon {...props} icon="bell-outline" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />

          <Divider />

          <List.Item
            title="Biometria"
            description="Entrar com digital/face"
            left={(props) => <List.Icon {...props} icon="fingerprint" />}
            right={() => (
              <Switch
                value={biometricsEnabled}
                onValueChange={setBiometricsEnabled}
              />
            )}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>Sobre</List.Subheader>
          <List.Item
            title="Versão do App"
            description="1.0.0"
            left={(props) => <List.Icon {...props} icon="information-outline" />}
          />
          <List.Item
            title="Termos de Uso"
            onPress={() => {}}
            left={(props) => <List.Icon {...props} icon="file-document-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
           <List.Item
            title="Política de Privacidade"
            onPress={() => {}}
            left={(props) => <List.Icon {...props} icon="shield-check-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  content: {
    paddingBottom: 24,
  },
});