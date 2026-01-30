import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, useTheme, IconButton, Divider, List } from 'react-native-paper';

interface NotificationModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Bem-vindo!',
    description: 'Obrigado por se juntar à nossa comunidade de reciclagem.',
    time: '2h atrás',
    read: false,
    icon: 'party-popper',
  },
  {
    id: 2,
    title: 'Coleta Seletiva',
    description: 'O caminhão da coleta passará amanhã no seu bairro.',
    time: '5h atrás',
    read: true,
    icon: 'truck-fast',
  },
  {
    id: 3,
    title: 'Nova Conquista',
    description: 'Você reciclou 10kg de plástico este mês! Parabéns!',
    time: '1d atrás',
    read: true,
    icon: 'trophy',
  },
  {
    id: 4,
    title: 'Atualização do App',
    description: 'Novas funcionalidades disponíveis. Confira agora.',
    time: '2d atrás',
    read: true,
    icon: 'cellphone-arrow-down',
  },
];

export function NotificationModal({ visible, onDismiss }: NotificationModalProps) {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modalContent, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.header}>
          <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Notificações</Text>
          <IconButton icon="close" onPress={onDismiss} />
        </View>
        <Divider />
        
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            {MOCK_NOTIFICATIONS.length > 0 ? (
                MOCK_NOTIFICATIONS.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <List.Item
                            title={item.title}
                            description={item.description}
                            descriptionNumberOfLines={2}
                            left={props => <List.Icon {...props} icon={item.icon} color={item.read ? theme.colors.onSurfaceVariant : theme.colors.primary} />}
                            right={() => <Text variant="labelSmall" style={{ alignSelf: 'center', color: theme.colors.outline }}>{item.time}</Text>}
                            titleStyle={{ fontWeight: item.read ? 'normal' : 'bold' }}
                            style={[styles.listItem, !item.read && { backgroundColor: theme.colors.elevation.level1 }]}
                        />
                        {index < MOCK_NOTIFICATIONS.length - 1 && <Divider />}
                    </React.Fragment>
                ))
            ) : (
                <View style={styles.emptyState}>
                    <IconButton icon="bell-off-outline" size={48} iconColor={theme.colors.outline} />
                    <Text variant="bodyLarge" style={{ color: theme.colors.outline }}>Nenhuma notificação</Text>
                </View>
            )}
        </ScrollView>
        
        <View style={styles.footer}>
            <Button mode="text" onPress={onDismiss}>Marcar todas como lidas</Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 8,
    paddingVertical: 8,
  },
  listContainer: {
    paddingHorizontal: 0,
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  footer: {
      padding: 8,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.05)'
  },
  emptyState: {
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
  }
});
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, useTheme, IconButton, Divider, List } from 'react-native-paper';

interface NotificationModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Bem-vindo!',
    description: 'Obrigado por se juntar à nossa comunidade de reciclagem.',
    time: '2h atrás',
    read: false,
    icon: 'party-popper',
  },
  {
    id: 2,
    title: 'Coleta Seletiva',
    description: 'O caminhão da coleta passará amanhã no seu bairro.',
    time: '5h atrás',
    read: true,
    icon: 'truck-fast',
  },
  {
    id: 3,
    title: 'Nova Conquista',
    description: 'Você reciclou 10kg de plástico este mês! Parabéns!',
    time: '1d atrás',
    read: true,
    icon: 'trophy',
  },
  {
    id: 4,
    title: 'Atualização do App',
    description: 'Novas funcionalidades disponíveis. Confira agora.',
    time: '2d atrás',
    read: true,
    icon: 'cellphone-arrow-down',
  },
];

export function NotificationModal({ visible, onDismiss }: NotificationModalProps) {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modalContent, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.header}>
          <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Notificações</Text>
          <IconButton icon="close" onPress={onDismiss} />
        </View>
        <Divider />
        
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            {MOCK_NOTIFICATIONS.length > 0 ? (
                MOCK_NOTIFICATIONS.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <List.Item
                            title={item.title}
                            description={item.description}
                            descriptionNumberOfLines={2}
                            left={props => <List.Icon {...props} icon={item.icon} color={item.read ? theme.colors.onSurfaceVariant : theme.colors.primary} />}
                            right={() => <Text variant="labelSmall" style={{ alignSelf: 'center', color: theme.colors.outline }}>{item.time}</Text>}
                            titleStyle={{ fontWeight: item.read ? 'normal' : 'bold' }}
                            style={[styles.listItem, !item.read && { backgroundColor: theme.colors.elevation.level1 }]}
                        />
                        {index < MOCK_NOTIFICATIONS.length - 1 && <Divider />}
                    </React.Fragment>
                ))
            ) : (
                <View style={styles.emptyState}>
                    <IconButton icon="bell-off-outline" size={48} iconColor={theme.colors.outline} />
                    <Text variant="bodyLarge" style={{ color: theme.colors.outline }}>Nenhuma notificação</Text>
                </View>
            )}
        </ScrollView>
        
        <View style={styles.footer}>
            <Button mode="text" onPress={onDismiss}>Marcar todas como lidas</Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 8,
    paddingVertical: 8,
  },
  listContainer: {
    paddingHorizontal: 0,
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  footer: {
      padding: 8,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.05)'
  },
  emptyState: {
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
  }
});