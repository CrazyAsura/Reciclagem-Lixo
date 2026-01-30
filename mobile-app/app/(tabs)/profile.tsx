import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Avatar, List, Divider, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/libs/redux-toolkit/authSlice';
import { useLogoutAuthQuery } from '@/libs/api/react query/auth-query';

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const logoutMutation = useLogoutAuthQuery();

  const handleLogout = async () => {
    try {
      if (user) {
        await logoutMutation.mutateAsync({
          id: user.id,
          email: user.email,
          role: user.role || 'USER',
          isActive: user.isActive ?? true,
        });
      }
      dispatch(logout());
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout on local state even if server fails
      dispatch(logout());
      router.replace('/');
    }
  };

  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Usuário não autenticado</Text>
        <Button onPress={() => router.replace('/')}>Ir para Login</Button>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        {user.photo ? (
            <Avatar.Image size={80} source={{ uri: user.photo }} />
        ) : (
            <Avatar.Text size={80} label={user.name?.substring(0, 2).toUpperCase() || 'US'} />
        )}
        <Text variant="headlineSmall" style={styles.name}>{user.name}</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>{user.email}</Text>
      </View>

      <Divider />

      <List.Section>
        <List.Subheader>Informações Pessoais</List.Subheader>
        <List.Item
          title="Nome Completo"
          description={user.name}
          left={(props) => <List.Icon {...props} icon="account" />}
        />
        <List.Item
          title="CPF"
          description={user.cpf}
          left={(props) => <List.Icon {...props} icon="card-account-details" />}
        />
        <List.Item
          title="Data de Nascimento"
          description={user.birthDate}
          left={(props) => <List.Icon {...props} icon="calendar" />}
        />
         <List.Item
          title="Gênero"
          description={user.gender}
          left={(props) => <List.Icon {...props} icon="gender-male-female" />}
        />
      </List.Section>

      <View style={styles.actions}>
        <Button 
            mode="contained" 
            onPress={() => router.push('/edit-profile')} 
            style={styles.button}
            icon="pencil"
        >
          Editar Perfil
        </Button>
        
        <Button 
            mode="outlined" 
            onPress={handleLogout} 
            style={[styles.button, { borderColor: theme.colors.error }]}
            textColor={theme.colors.error}
            icon="logout"
        >
          Sair
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  name: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  actions: {
    padding: 16,
    gap: 12,
  },
  button: {
    borderRadius: 8,
  }
});