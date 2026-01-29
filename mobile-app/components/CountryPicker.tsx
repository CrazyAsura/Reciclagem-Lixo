import React, { useState, useMemo } from 'react';
import { View, Modal, FlatList, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { useTheme, IconButton, Searchbar } from 'react-native-paper';
import { COUNTRIES, Country } from '@/constants/countries';

interface CountryPickerProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
}

export function CountryPicker({ selectedCountry, onSelect }: CountryPickerProps) {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.ddi.includes(searchQuery) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.trigger, { borderColor: theme.colors.outline }]}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={[styles.ddi, { color: theme.colors.onSurface }]}>{selectedCountry.ddi}</Text>
        <IconButton icon="chevron-down" size={16} />
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <View style={styles.header}>
            <IconButton icon="close" onPress={() => setVisible(false)} />
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>Selecione o País</Text>
            <View style={{ width: 48 }} />
          </View>

          <Searchbar
            placeholder="Buscar país ou código"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.item, { borderBottomColor: theme.colors.outlineVariant }]}
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                }}
              >
                <Text style={styles.itemFlag}>{item.flag}</Text>
                <Text style={[styles.itemName, { color: theme.colors.onSurface }]}>{item.name}</Text>
                <Text style={[styles.itemDdi, { color: theme.colors.primary }]}>{item.ddi}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 56, // Match Paper Input height
    marginRight: 8,
  },
  flag: {
    fontSize: 24,
    marginRight: 4,
  },
  ddi: {
    fontSize: 16,
    fontWeight: '500',
  },
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
  itemFlag: {
    fontSize: 28,
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  itemDdi: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});