import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function TakePhoto() {
  const theme = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: theme.colors.onSurface }}>Tela de Tirar Foto</Text>
    </View>
  );
}
