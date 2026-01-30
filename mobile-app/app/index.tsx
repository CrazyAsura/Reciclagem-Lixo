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
  Alert,
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
import { GradientButton, GradientBorder } from '@/components/ui/GradientComponents';

import { loginSchema } from '@/libs/validation/zod/login';
import { useLoginAuthQuery } from '@/libs/api/react query/auth-query';
import { useDispatch } from 'react-redux';
import { login } from '@/libs/redux-toolkit/authSlice';

// Tipo inferido do schema (corrigindo o nome do tipo exportado no arquivo original se necessário,
// mas assumindo que podemos usar z.infer aqui se o export estiver nomeado igual a const)
import { z } from 'zod';
type LoginSchema = z.infer<typeof loginSchema>;

import { useSelector } from 'react-redux';

// ... existing imports

export default function LoginScreen() {
  const router = useRouter();
  const theme = useTheme();
  
  // Login status is now handled globally in _layout.tsx
  // We don't need to manually redirect here anymore
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useDispatch();
  const loginMutation = useLoginAuthQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginSchema) => {
    Keyboard.dismiss();
    setIsSubmitting(true);
    
    try {
      const result = await loginMutation.mutateAsync(data);
      console.log('Login bem-sucedido:', result);
      
      dispatch(login({ token: result.token, user: result.user }));
      
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(tabs)/historic-photos');
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Falha ao realizar login. Verifique suas credenciais.');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} backgroundColor={theme.colors.background} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <MaterialCommunityIcons name="recycle" size={64} color={theme.colors.primary} />
            <Text style={[styles.appName, { color: theme.colors.onSurface }]}>EcoCycle</Text>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>Bem-vindo de volta!</Text>
            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>Faça login para continuar</Text>
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
              label="Senha"
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

            <View style={styles.forgotPasswordContainer}>
              <Link href="/password-reset" asChild>
                <TouchableOpacity>
                  <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                    Esqueceu a senha?
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

            <GradientButton
              title="Entrar"
              onPress={handleSubmit(handleLogin)}
              loading={isSubmitting}
              style={{ marginBottom: 24 }}
            />

            <View style={styles.registerContainer}>
              <Text style={[styles.registerText, { color: theme.colors.onSurfaceVariant }]}>Não tem uma conta?</Text>
              <Link href="/register" asChild>
                <TouchableOpacity>
                  <Text style={[styles.linkText, { color: theme.colors.primary, fontWeight: 'bold' }]}>
                    Registre-se
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
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
      <GradientBorder style={{ borderRadius: 12 }}>
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
            <PaperInput
                label={label}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                mode="flat" // Changed to flat to fit inside gradient border
                style={[styles.input, { backgroundColor: theme.colors.elevation.level1 }]}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                textColor={theme.colors.onSurface}
                theme={{ colors: { background: theme.colors.elevation.level1 } }}
                left={icon ? <PaperInput.Icon icon={icon} color={theme.colors.onSurfaceVariant} /> : null}
                {...props}
            />
            )}
        />
      </GradientBorder>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: 16,
    height: 56,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  linkText: {
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  registerText: {
    fontSize: 14,
  },
});