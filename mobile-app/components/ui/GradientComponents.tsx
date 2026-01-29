import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, ActivityIndicator } from 'react-native-paper';

interface GradientButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  colors?: readonly [string, string, ...string[]];
}

export const GradientButton = ({ onPress, title, loading, disabled, style, colors }: GradientButtonProps) => {
  const defaultColors: readonly [string, string, ...string[]] = ['#22c55e', '#15803d']; // Green gradient

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[styles.buttonContainer, style, disabled && { opacity: 0.6 }]}
    >
      <LinearGradient
        colors={colors || defaultColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const GradientBorder = ({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) => {
    const theme = useTheme();
    return (
        <LinearGradient
            colors={['#22c55e', 'rgba(34, 197, 94, 0.2)', '#22c55e']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[styles.borderContainer, style]}
        >
            <View style={[styles.contentContainer, { backgroundColor: theme.colors.background }]}>
                {children}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 56,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  borderContainer: {
      padding: 1.5, // Border width
      borderRadius: 12,
  },
  contentContainer: {
      flex: 1,
      borderRadius: 10.5,
      overflow: 'hidden',
      justifyContent: 'center',
  }
});