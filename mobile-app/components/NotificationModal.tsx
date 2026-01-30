import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, useTheme, IconButton, Divider, List, ActivityIndicator } from 'react-native-paper';
import { useNotificationsQuery, useMarkNotificationReadMutation, useMarkAllNotificationsReadMutation } from '@/libs/api/react query/notification-query';
import { useAppSelector } from '@/libs/redux-toolkit/redux-persist/store';
import { Notification } from '@/libs/types/notification';

interface NotificationModalProps {
  visible: boolean;
  onDismiss: () => void;
}

function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Agora';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min atrás`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} h atrás`;
    return `${Math.floor(diffInSeconds / 86400)} d atrás`;
}

export function NotificationModal({ visible, onDismiss }: NotificationModalProps) {
  const theme = useTheme();
  const { user } = useAppSelector((state) => state.auth);
  const { data: notifications = [], isLoading } = useNotificationsQuery(user?.id);
  const markReadMutation = useMarkNotificationReadMutation();
  const markAllReadMutation = useMarkAllNotificationsReadMutation();

  const handleMarkRead = (id: string, currentReadStatus: boolean) => {
    if (!currentReadStatus) {
        markReadMutation.mutate(id);
    }
  };

  const handleMarkAllRead = () => {
    if (user?.id) {
        markAllReadMutation.mutate(user.id);
    }
  };

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
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            ) : notifications.length > 0 ? (
                notifications.map((item: Notification, index: number) => (
                    <React.Fragment key={item.id}>
                        <List.Item
                            title={item.title}
                            description={item.description}
                            descriptionNumberOfLines={2}
                            onPress={() => handleMarkRead(item.id, item.read)}
                            left={props => <List.Icon {...props} icon={item.icon || 'bell'} color={item.read ? theme.colors.onSurfaceVariant : theme.colors.primary} />}
                            right={() => (
                                <Text variant="labelSmall" style={{ alignSelf: 'center', color: theme.colors.outline }}>
                                    {formatTimeAgo(item.createdAt)}
                                </Text>
                            )}
                            titleStyle={{ fontWeight: item.read ? 'normal' : 'bold' }}
                            style={[styles.listItem, !item.read && { backgroundColor: theme.colors.elevation.level1 }]}
                        />
                        {index < notifications.length - 1 && <Divider />}
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
            <Button mode="text" onPress={handleMarkAllRead} disabled={notifications.every((n: Notification) => n.read)}>
                Marcar todas como lidas
            </Button>
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
  loadingContainer: {
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
  },
  emptyState: {
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
  }
});