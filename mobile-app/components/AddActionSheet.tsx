// components/AddActionSheet.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Portal,
  Modal,
  Card,
  Text,
  IconButton,
  useTheme,
  TouchableRipple,
} from 'react-native-paper';
import { router } from 'expo-router';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function AddActionSheet({ visible, onClose }: Props) {
  const theme = useTheme();

  const actions = [
    {
      icon: 'camera',
      label: 'Tirar foto',
      onPress: () => {
        onClose();
        router.push('/take-photo');
      },
    },
    {
      icon: 'pencil',
      label: 'Escrever avaliação',
      onPress: () => {
        onClose();
        router.push('/write-review');
      },
    },
    {
      icon: 'alert',
      label: 'Denunciar',
      onPress: () => {
        onClose();
        router.push('/report');
      },
    },
  ];

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[
          styles.modalContent,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Card style={styles.card}>
          {actions.map((action, index) => (
            <TouchableRipple
              key={index}
              onPress={action.onPress}
              style={styles.actionRow}
            >
              <>
                <IconButton icon={action.icon} size={28} />
                <Text variant="titleMedium" style={{ flex: 1 }}>
                  {action.label}
                </Text>
              </>
            </TouchableRipple>
          ))}

          <IconButton
            icon="close"
            size={28}
            onPress={onClose}
            style={styles.closeButton}
          />
        </Card>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    marginHorizontal: 24,
    marginBottom: 100, // espaço acima da tab bar
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    paddingVertical: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    alignSelf: 'center',
    marginVertical: 8,
  },
});