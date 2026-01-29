import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextInput as PaperInput,
  Button,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { passwordResetSchema, PasswordResetSchema } from '@/libs/validation/zod/password-reset';

export default function PasswordResetScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleReset = async (data: PasswordResetSchema) => {
    Keyboard.dismiss();
    setIsSubmitting(true);
    
    // Simulação de delay
    // await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Dados de reset:', data);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Volta para o login
    router.replace('/');
    setIsSubmitting(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} backgroundColor={theme.colors.background} />

      <View style={styles.header}>
        <Link href="/" asChild>
            <IconButton icon="arrow-left" iconColor={theme.colors.onSurface} />
        </Link>
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>Recuperar Senha</Text>
        <View style={{ width: 48 }} />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons name="lock-reset" size={64} color={theme.colors.primary} />
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>Redefinir Senha</Text>
            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Informe seu e-mail e a nova senha para recuperar o acesso.
            </Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              name="email"
              label="E-mail"
              control={control}
              errors={errors}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="email-outline"
            />

            <CustomInput
              name="password"
              label="Nova Senha"
              control={control}
              errors={errors}
              secureTextEntry={!showPassword}
              icon="lock-outline"
              right={
                <PaperInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  forceTextInputFocus={false}
                />
              }
            />

            <CustomInput
              name="confirmPassword"
              label="Confirmar Senha"
              control={control}
              errors={errors}
              secureTextEntry={!showPassword}
              icon="lock-check-outline"
              right={
                <PaperInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  forceTextInputFocus={false}
                />
              }
            />

            <View style={styles.tipContainer}>
                <MaterialCommunityIcons name="shield-check-outline" size={20} color={theme.colors.primary} />
                <Text style={[styles.tipText, { color: theme.colors.onSurfaceVariant }]}>Mínimo 8 caracteres</Text>
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit(handleReset)}
              loading={isSubmitting}
              disabled={isSubmitting}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              style={styles.submitButton}
            >
              Redefinir Senha
            </Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

function CustomInput({ name, label, control, errors, icon, ...props }: any) {
  const theme = useTheme();
  
  return (
    <View style={styles.inputWrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <PaperInput
            label={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mode="outlined"
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            textColor={theme.colors.onSurface}
            theme={{ colors: { background: theme.colors.surface } }}
            left={icon ? <PaperInput.Icon icon={icon} color={theme.colors.onSurfaceVariant} /> : null}
            {...props}
          />
        )}
      />
      {errors[name] && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors[name]?.message}</Text>
      )}
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
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 0,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34,197,94,0.12)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  tipText: {
    marginLeft: 12,
    fontSize: 13,
    flex: 1,
  },
  submitButton: {
    borderRadius: 12,
    backgroundColor: '#22c55e',
    marginBottom: 24,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});