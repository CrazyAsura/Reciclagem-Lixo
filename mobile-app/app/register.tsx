import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Alert,
} from 'react-native';
import { useForm, Controller, FormProvider, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextInput as PaperInput,
  Button,
  Checkbox,
  IconButton,
  useTheme,
  Menu,
  Snackbar,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { registerSchema, RegisterSchema } from '@/libs/validation/zod/register';
import { useRegisterAuthQuery } from '@/libs/api/react query/auth-query';

import { getAddressByCep } from '@/libs/services/viacep';
import { CountryPicker } from '@/components/CountryPicker';
import { DDDPicker } from '@/components/DDDPicker';
import { COUNTRIES } from '@/constants/countries';
import { DDDS } from '@/constants/ddds';

export default function RegisterScreen() {
  const router = useRouter();
  const theme = useTheme();
  const registerMutation = useRegisterAuthQuery();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [genderMenuVisible, setGenderMenuVisible] = useState(false);
  
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      country: 'Brasil',
      gender: 'Prefiro não informar',
      ddi: '+55',
      ddd: '',
    },
    mode: 'onChange',
  });

  const { handleSubmit, control, formState: { errors }, trigger, setValue } = form;

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const genderOptions = [
    'Masculino',
    'Feminino',
    'Outro',
    'Prefiro não informar',
  ];

  const nextStep = async () => {
    await Haptics.selectionAsync();
    const fields = getFieldsForStep(step);
    const isValid = await trigger(fields);

    if (isValid) {
      if (step < totalSteps) setStep(step + 1);
      else setModalVisible(true);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      Haptics.selectionAsync();
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: RegisterSchema) => {
    if (!accepted) return;
    
    try {
      await registerMutation.mutateAsync(data);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'Ir para Login', onPress: () => router.replace('/') }
      ]);
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      
      let message = 'Falha ao realizar cadastro. Tente novamente.';
      if (error.response?.data?.message) {
        message = Array.isArray(error.response.data.message) 
          ? error.response.data.message.join('\n') 
          : error.response.data.message;
      }

      Alert.alert('Erro', message);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const getFieldsForStep = (step: number): (keyof RegisterSchema)[] => {
    switch (step) {
      case 1: return ['name', 'cpf', 'birthDate', 'gender'];
      case 2: return ['zipCode', 'street', 'numberResidence', 'neighborhood', 'city', 'state'];
      case 3: return ['email', 'ddi', 'ddd', 'phone'];
      case 4: return ['password', 'confirmPassword'];
      default: return [];
    }
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const padding = 40;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - padding) {
      if (!scrolledToBottom) {
        setScrolledToBottom(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} backgroundColor={theme.colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {step > 1 ? (
            <IconButton icon="arrow-left" onPress={prevStep} iconColor={theme.colors.onSurface} />
          ) : (
            <View style={{ width: 48 }} />
          )}
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Criar Conta</Text>
          <View style={{ width: 48 }} />
        </View>

        <View style={[styles.progressContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={[styles.stepText, { color: theme.colors.onSurfaceVariant }]}>Etapa {step} de {totalSteps}</Text>
      </View>

      {/* Form content */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <FormProvider {...form}>
            {step === 1 && <Step1 control={control} errors={errors} genderMenuVisible={genderMenuVisible} setGenderMenuVisible={setGenderMenuVisible} genderOptions={genderOptions} />}
            {step === 2 && <Step2 control={control} errors={errors} setValue={setValue} onShowSnackbar={(msg: string) => { setSnackbarMessage(msg); setSnackbarVisible(true); }} />}
            {step === 3 && <Step3 control={control} errors={errors} setValue={setValue} />}
            {step === 4 && (
              <Step4
                control={control}
                errors={errors}
                showPassword={showPassword}
                togglePassword={() => setShowPassword(!showPassword)}
              />
            )}
          </FormProvider>

          <View style={{ height: 100 }} />
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* Next button */}
      <View style={[styles.footer, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.outlineVariant }]}>
        <Button
          mode="contained"
          onPress={nextStep}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          style={styles.nextButton}
        >
          {step === totalSteps ? 'Finalizar Cadastro' : 'Continuar'}
        </Button>
      </View>

      {/* Terms Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>Termos de Uso</Text>
              <IconButton icon="close" onPress={() => setModalVisible(false)} iconColor={theme.colors.onSurface} />
            </View>

            <Text style={[styles.modalSubtitle, { color: theme.colors.onSurfaceVariant }]}>Leia até o final para aceitar</Text>

            <ScrollView
              style={[styles.modalScroll, { backgroundColor: theme.colors.elevation.level1 }]}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              <Text style={[styles.termText, { color: theme.colors.onSurface }]}>
                1. ACEITAÇÃO DOS TERMOS{'\n'}
                Ao acessar e utilizar o aplicativo de Reciclagem, você concorda expressamente com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, você não deve utilizar o serviço.{'\n\n'}

                2. CADASTRO E CONTA{'\n'}
                Para utilizar certas funcionalidades, você deve se cadastrar fornecendo informações verdadeiras, exatas, atuais e completas. Você é responsável por manter a confidencialidade de sua senha e conta.{'\n\n'}

                3. USO DO SERVIÇO{'\n'}
                O aplicativo conecta usuários a pontos de coleta e serviços de reciclagem. Você concorda em utilizar o serviço apenas para fins lícitos e de acordo com as leis ambientais vigentes.{'\n\n'}

                4. PRIVACIDADE{'\n'}
                Respeitamos sua privacidade. Seus dados pessoais serão processados de acordo com nossa Política de Privacidade e a Lei Geral de Proteção de Dados (LGPD).{'\n\n'}

                5. RESPONSABILIDADES DO USUÁRIO{'\n'}
                Você é o único responsável por todo o conteúdo que enviar ou publicar através do serviço. É proibido publicar conteúdo ofensivo, ilegal ou que viole direitos de terceiros.{'\n\n'}

                6. PROPRIEDADE INTELECTUAL{'\n'}
                Todo o conteúdo do aplicativo, incluindo marcas, logotipos e software, é propriedade exclusiva de seus desenvolvedores ou licenciadores.{'\n\n'}

                7. ALTERAÇÕES NOS TERMOS{'\n'}
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.{'\n\n'}

                8. CONTATO{'\n'}
                Para dúvidas sobre estes termos, entre em contato através do suporte no aplicativo.{'\n\n'}
                
                Li e compreendi todos os termos acima descritos.
              </Text>
            </ScrollView>

            <View style={styles.agreementArea}>
              <TouchableOpacity
                style={[styles.checkboxRow, { backgroundColor: theme.colors.elevation.level1 }]}
                onPress={() => scrolledToBottom && setAccepted(!accepted)}
                disabled={!scrolledToBottom}
                activeOpacity={0.8}
              >
                <Checkbox
                  status={accepted ? 'checked' : 'unchecked'}
                  onPress={() => scrolledToBottom && setAccepted(!accepted)}
                  color={theme.colors.primary}
                  disabled={!scrolledToBottom}
                />
                <Text style={[styles.checkboxLabel, { color: theme.colors.onSurface }, !scrolledToBottom && { opacity: 0.5 }]}>
                  Li e aceito os Termos de Uso
                </Text>
              </TouchableOpacity>

              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                disabled={!accepted}
                style={[styles.finishButton, !accepted && styles.disabledButton]}
                labelStyle={{ color: accepted ? '#000' : '#888' }}
              >
                Criar Conta
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: theme.colors.errorContainer }}
        theme={{ colors: { inversePrimary: theme.colors.onErrorContainer } }}
      >
        <Text style={{ color: theme.colors.onErrorContainer }}>{snackbarMessage}</Text>
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

// ────────────────────────────────────────────────
//          ETAPAS DO FORMULÁRIO
// ────────────────────────────────────────────────

function Step1({ control, errors, genderMenuVisible, setGenderMenuVisible, genderOptions }: any) {
  const theme = useTheme();

  return (
    <>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Dados Pessoais</Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.onSurfaceVariant }]}>Comece informando quem você é</Text>

      <CustomInput name="name" label="Nome completo" control={control} errors={errors} autoCapitalize="words" />
      <CustomInput name="cpf" label="CPF" control={control} errors={errors} keyboardType="numeric" mask={formatCPF} />
      <CustomInput name="birthDate" label="Data de nascimento" control={control} errors={errors} keyboardType="numeric" mask={formatDate} placeholder="DD/MM/AAAA" />

      {/* Gênero com Menu (Dropdown) */}
      <Controller
        name="gender"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={[styles.inputLabel, { color: theme.colors.onSurfaceVariant }]}>Gênero</Text>
            <Menu
              visible={genderMenuVisible}
              onDismiss={() => setGenderMenuVisible(false)}
              anchor={
                <TouchableOpacity onPress={() => setGenderMenuVisible(!genderMenuVisible)} activeOpacity={0.8}>
                  <View pointerEvents="none">
                    <PaperInput
                      label="Gênero"
                      value={value}
                      mode="outlined"
                      right={<PaperInput.Icon icon="chevron-down" />}
                      editable={false}
                      style={[styles.input, { backgroundColor: theme.colors.surface }]}
                      theme={{ colors: { background: theme.colors.surface } }}
                      outlineColor={theme.colors.outline}
                      activeOutlineColor={theme.colors.primary}
                      textColor={theme.colors.onSurface}
                    />
                  </View>
                </TouchableOpacity>
              }
            >
              {genderOptions.map((option: string) => (
                <Menu.Item
                  key={option}
                  onPress={() => {
                    onChange(option);
                    setGenderMenuVisible(false);
                  }}
                  title={option}
                  titleStyle={{ color: option === value ? theme.colors.primary : theme.colors.onSurface }}
                />
              ))}
            </Menu>
            {errors.gender && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.gender.message}</Text>}
          </>
        )}
      />
    </>
  );
}

function Step2({ control, errors, setValue, onShowSnackbar }: any) {
  const theme = useTheme();
  const zipCode = useWatch({ control, name: 'zipCode' });

  useEffect(() => {
    const fetchAddress = async () => {
      if (zipCode?.length === 9) { // 8 digits + 1 hyphen
        try {
          const address = await getAddressByCep(zipCode);
          if (address) {
            setValue('street', address.logradouro, { shouldValidate: true });
            setValue('neighborhood', address.bairro, { shouldValidate: true });
            setValue('city', address.localidade, { shouldValidate: true });
            setValue('state', address.uf, { shouldValidate: true });
            if (address.complemento) {
              setValue('complement', address.complemento, { shouldValidate: true });
            }
          } else {
            onShowSnackbar('CEP não encontrado');
          }
        } catch (error) {
          onShowSnackbar('Erro ao buscar CEP');
        }
      }
    };

    fetchAddress();
  }, [zipCode, setValue, onShowSnackbar]);

  return (
    <>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Endereço</Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.onSurfaceVariant }]}>Precisamos saber onde você está</Text>

      <CustomInput 
        name="zipCode" 
        label="CEP" 
        control={control} 
        errors={errors} 
        keyboardType="numeric" 
        mask={formatCEP}
      />
      <View style={styles.row}>
        <View style={{ flex: 3 }}>
          <CustomInput name="street" label="Rua / Avenida" control={control} errors={errors} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <CustomInput name="numberResidence" label="Nº" control={control} errors={errors} keyboardType="numeric" />
        </View>
      </View>
      <CustomInput name="complement" label="Complemento (opcional)" control={control} errors={errors} />
      <CustomInput name="neighborhood" label="Bairro" control={control} errors={errors} />
      <View style={styles.row}>
        <View style={{ flex: 3 }}>
          <CustomInput name="city" label="Cidade" control={control} errors={errors} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <CustomInput name="state" label="UF" control={control} errors={errors} maxLength={2} autoCapitalize="characters" />
        </View>
      </View>
    </>
  );
}

function Step3({ control, errors, setValue }: any) {
  const theme = useTheme();
  
  return (
    <>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Contato</Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.onSurfaceVariant }]}>Como entraremos em contato</Text>

      <CustomInput name="email" label="E-mail" control={control} errors={errors} keyboardType="email-address" autoCapitalize="none" />
      
      <View style={styles.row}>
        <Controller
          name="ddi"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CountryPicker
              selectedCountry={COUNTRIES.find(c => c.ddi === value) || COUNTRIES[0]}
              onSelect={(country) => onChange(country.ddi)}
            />
          )}
        />
        
        <Controller
          name="ddd"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DDDPicker
              value={value}
              onSelect={onChange}
              error={!!errors.ddd}
            />
          )}
        />

        <View style={{ flex: 1 }}>
          <CustomInput 
            name="phone" 
            label="Celular" 
            control={control} 
            errors={errors} 
            keyboardType="phone-pad" 
            mask={(v: string) => v.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 10)} 
          />
        </View>
      </View>
      {errors.ddi && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.ddi.message}</Text>}
      {errors.ddd && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.ddd.message}</Text>}
    </>
  );
}

function Step4({ control, errors, showPassword, togglePassword }: any) {
  const theme = useTheme();

  return (
    <>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Crie sua senha</Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.onSurfaceVariant }]}>Use uma senha forte</Text>

      <CustomInput
        name="password"
        label="Senha"
        control={control}
        errors={errors}
        secureTextEntry={!showPassword}
        right={<PaperInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={togglePassword} forceTextInputFocus={false} />}
      />

      <CustomInput
        name="confirmPassword"
        label="Confirmar senha"
        control={control}
        errors={errors}
        secureTextEntry={!showPassword}
        right={<PaperInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={togglePassword} forceTextInputFocus={false} />}
      />

      <View style={styles.tipContainer}>
        <MaterialCommunityIcons name="shield-check-outline" size={20} color={theme.colors.primary} />
        <Text style={styles.tipText}>Mínimo 8 caracteres, letras, números e símbolos</Text>
      </View>
    </>
  );
}

// Componente reutilizável de input
function CustomInput({ name, label, control, errors, mask, ...props }: any) {
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
            onChangeText={mask ? (text) => onChange(mask(text)) : onChange}
            onBlur={onBlur}
            mode="outlined"
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            textColor={theme.colors.onSurface}
            theme={{ colors: { background: theme.colors.surface } }}
            {...props}
          />
        )}
      />
      {errors[name] && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors[name]?.message}</Text>}
    </View>
  );
}

// Máscaras (mesmas que você tinha)
const formatCPF = (v: string) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').slice(0, 14);
const formatDate = (v: string) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 10);
const formatCEP = (v: string) => v.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
const formatPhone = (v: string) => {
  const r = v.replace(/\D/g, '');
  if (r.length > 10) return r.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  return r.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3').slice(0, 15);
};

// Estilos atualizados (mais limpos e modernos)
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 48, paddingHorizontal: 20, paddingBottom: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 20, fontWeight: '600' },
  progressContainer: { height: 6, borderRadius: 3, marginTop: 16, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#22c55e' },
  stepText: { fontSize: 13, textAlign: 'right', marginTop: 6 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 26, fontWeight: 'bold', marginTop: 8, marginBottom: 4 },
  sectionSubtitle: { fontSize: 15, marginBottom: 28 },

  inputWrapper: { marginBottom: 20 },
  inputLabel: { marginBottom: 8, fontSize: 15 },
  input: { fontSize: 16 },
  errorText: { fontSize: 12, marginTop: 4, marginLeft: 4 },

  row: { flexDirection: 'row', alignItems: 'flex-start' },

  footer: { padding: 20, borderTopWidth: 1 },
  nextButton: { borderRadius: 12, backgroundColor: '#22c55e' },
  buttonContent: { height: 56 },
  buttonLabel: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' },
  modalCard: { height: '88%', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  modalTitle: { fontSize: 24, fontWeight: '700' },
  modalSubtitle: { marginBottom: 20 },
  modalScroll: { flex: 1, borderRadius: 16, padding: 16 },
  termText: { lineHeight: 24, fontSize: 15 },
  agreementArea: { marginTop: 16, gap: 16 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12 },
  checkboxLabel: { marginLeft: 8, flex: 1, fontSize: 15 },
  finishButton: { borderRadius: 12, backgroundColor: '#22c55e' },
  disabledButton: { opacity: 0.5 },

  // Dica de segurança
  tipContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(34,197,94,0.12)', padding: 12, borderRadius: 12, marginTop: 16 },
  tipText: { color: '#22c55e', marginLeft: 12, fontSize: 13, flex: 1 },
});