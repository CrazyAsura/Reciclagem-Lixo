import React, { useState, useMemo } from 'react';
import { View, Modal, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme, IconButton, Searchbar, TextInput as PaperInput } from 'react-native-paper';
import { DDDS, DDD } from '@/constants/ddds';

interface DDDPickerProps {
  value: string;
  onSelect: (ddd: string) => void;
  error?: boolean;
}

export function DDDPicker({ value, onSelect, error }: DDDPickerProps) {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  const filteredDDDs = useMemo(() => {
    return DDDS.filter(
      (d) =>
        d.code.includes(searchQuery) ||
        d.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.8}>
        <View pointerEvents="none">
          <PaperInput
            label="DDD"
            value={value}
            mode="outlined"
            error={error}
            right={<PaperInput.Icon icon="chevron-down" />}
            editable={false}
            style={{ backgroundColor: theme.colors.surface, width: 80, marginRight: 8 }}
            theme={{ colors: { background: theme.colors.surface } }}
          />
        </View>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <View style={styles.header}>
            <IconButton icon="close" onPress={() => setVisible(false)} />
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>Selecione o DDD</Text>
            <View style={{ width: 48 }} />
          </View>

          <Searchbar
            placeholder="Buscar DDD ou Cidade"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
            keyboardType="numeric"
          />

          <FlatList
            data={filteredDDDs}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.item, { borderBottomColor: theme.colors.outlineVariant }]}
                onPress={() => {
                  onSelect(item.code);
                  setVisible(false);
                }}
              >
                <Text style={[styles.itemCode, { color: theme.colors.primary }]}>{item.code}</Text>
                <Text style={[styles.itemRegion, { color: theme.colors.onSurface }]}>{item.region}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchbar: {
    margin: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  itemCode: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 16,
    width: 40,
  },
  itemRegion: {
    fontSize: 16,
    flex: 1,
  },
});