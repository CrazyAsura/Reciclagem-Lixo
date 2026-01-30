import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import { useForm, Controller, FormProvider, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextInput as PaperInput,
  Button,
  useTheme,
  Menu,
  IconButton,
  Text,
  Avatar,
  Snackbar,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { z } from 'zod';
import * as ImagePicker from 'expo-image-picker';
import { useEditProfileAuthQuery } from '@/libs/api/react query/auth-query';
import { register } from '@/libs/redux-toolkit/authSlice';
import pako from 'pako';
import { Buffer } from 'buffer';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getAddressByCep } from '@/libs/services/viacep';
import { CountryPicker } from '@/components/CountryPicker';
import { DDDPicker } from '@/components/DDDPicker';
import { COUNTRIES } from '@/constants/countries';

// -----------------------------------------------------------------------------
// SCHEMA
// -----------------------------------------------------------------------------
const editProfileSchema = z.object({
  // Step 1: Pessoal
  name: z.string().min(3, "Nome muito curto"),
  cpf: z.string(),
  birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato inválido"),
  gender: z.string(),
  photo: z.string().optional(),

  // Step 2: Endereço
  zipCode: z.string().min(9, "CEP incompleto"), // 8 digits + hyphen
  street: z.string().min(1, "Rua obrigatória"),
  numberResidence: z.string().min(1, "Número obrigatório"),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
  state: z.string().length(2, "UF inválida"),
  complement: z.string().optional(),
  country: z.string(),

  // Step 3: Contato
  email: z.string().email("E-mail inválido"),
  ddi: z.string().min(1, "DDI obrigatório"),
  ddd: z.string().min(2, "DDD obrigatório"),
  phone: z.string().min(8, "Telefone inválido"),

  // Step 4: Senha
  password: z.string().min(1, "Senha necessária para confirmar"),
});

type EditProfileSchema = z.infer<typeof editProfileSchema>;

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------
export default function EditProfileScreen() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const editProfileMutation = useEditProfileAuthQuery();
  
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const [showPassword, setShowPassword] = useState(false);
  const [genderMenuVisible, setGenderMenuVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(user?.photo);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Setup form with default values from Redux user state
  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      // Step 1
      name: user?.name || '',
      cpf: user?.cpf || '',
      birthDate: user?.birthDate || '',
      gender: user?.gender || '',
      photo: user?.photo || '',
      
      // Step 2 (Flattened Address)
      zipCode: user?.address?.zipCode || '',
      street: user?.address?.street || '',
      numberResidence: user?.address?.numberResidence || '',
      neighborhood: user?.address?.neighborhood || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      complement: user?.address?.complement || '',
      country: user?.address?.country || 'Brasil',

      // Step 3 (Flattened Phone)
      email: user?.email || '',
      ddi: user?.phone?.ddi || '+55',
      ddd: user?.phone?.ddd || '',
      phone: user?.phone?.number || '',

      // Step 4
      password: '',
    },
    mode: 'onChange',
  });

  const { control, handleSubmit, setValue, trigger, formState: { errors } } = form;
  const genderOptions = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];

  // Image Picker Logic
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        const originalBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
        
        // Compress using pako
        const binaryString = atob(result.assets[0].base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        const compressed = pako.gzip(bytes);
        const compressedBase64 = Buffer.from(compressed).toString('base64');
        const payload = `zipped:${compressedBase64}`;
        
        setSelectedImage(originalBase64);
        setValue('photo', payload);
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  // Navigation Logic
  const getFieldsForStep = (step: number): (keyof EditProfileSchema)[] => {
    switch (step) {
      case 1: return ['name', 'cpf', 'birthDate', 'gender'];
      case 2: return ['zipCode', 'street', 'numberResidence', 'neighborhood', 'city', 'state'];
      case 3: return ['email', 'ddi', 'ddd', 'phone'];
      case 4: return ['password'];
      default: return [];
    }
  };

  const nextStep = async () => {
    await Haptics.selectionAsync();
    const fields = getFieldsForStep(step);
    const isValid = await trigger(fields);

    if (isValid) {
      if (step < totalSteps) setStep(step + 1);
      else handleSubmit(onSubmit)();
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      // Optional: Show specific error if needed
    }
  };

  const prevStep = () => {
    if (step > 1) {
      Haptics.selectionAsync();
      setStep(step - 1);
    } else {
        router.back();
    }
  };

  const onSubmit = async (data: EditProfileSchema) => {
    try {
      // Construct payload
      // Note: We need to check how backend expects address/phone on update.
      // Assuming similar structure to Register (arrays) or User (objects).
      // Since 'editProfile' takes 'any', we'll try to match the User structure 
      // which is what we have in Redux.
      
      const payload = {
          id: user.id,
          name: data.name,
          cpf: user.cpf,
          birthDate: data.birthDate,
          gender: data.gender,
          email: data.email,
          password: data.password, // For confirmation
          role: user.role,
          isActive: user.isActive,
          photo: data.photo,
          // Reconstruct nested objects
          phone: {
              ddi: data.ddi.replace('+', ''),
              ddd: data.ddd,
              number: data.phone
          },
          address: {
              zipCode: data.zipCode,
              street: data.street,
              numberResidence: data.numberResidence,
              complement: data.complement,
              neighborhood: data.neighborhood,
              city: data.city,
              state: data.state,
              country: data.country
          }
      };

      await editProfileMutation.mutateAsync(payload);
      
      // Update Redux state
      // We need to match the User type structure
      const updatedUser = {
        ...user,
        ...data,
        photo: data.photo || user.photo,
        phone: payload.phone,
        address: payload.address,
      };
      
      dispatch(register(updatedUser)); 
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Sucesso', 'Perfil atualizado!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
      
    } catch (error: any) {
      console.error('Edit Profile Error:', error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      
      const status = error.response?.status;
      const message = error.response?.data?.message || 'Falha ao atualizar perfil.';
      
      if (!status) {
        Alert.alert('Erro', 'Servidor indisponível ou erro de conexão.');
      } else {
        Alert.alert('Erro', `Status: ${status}\n${Array.isArray(message) ? message.join('\n') : message}`);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
            <IconButton icon="arrow-left" onPress={prevStep} iconColor={theme.colors.onSurface} />
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>Editar Perfil</Text>
            <View style={{ width: 48 }} />
        </View>

        <View style={[styles.progressContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={[styles.stepText, { color: theme.colors.onSurfaceVariant }]}>Etapa {step} de {totalSteps}</Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <FormProvider {...form}>
            {step === 1 && (
                <Step1 
                    control={control} 
                    errors={errors} 
                    genderMenuVisible={genderMenuVisible} 
                    setGenderMenuVisible={setGenderMenuVisible} 
                    genderOptions={genderOptions}
                    pickImage={pickImage}
                    selectedImage={selectedImage}
                />
            )}
            {step === 2 && (
                <Step2 
                    control={control} 
                    errors={errors} 
                    setValue={setValue} 
                    onShowSnackbar={(msg: string) => { setSnackbarMessage(msg); setSnackbarVisible(true); }} 
                />
            )}
            {step === 3 && (
                <Step3 
                    control={control} 
                    errors={errors} 
                />
            )}
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

      <View style={[styles.footer, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.outlineVariant }]}>
        <Button mode="contained" onPress={nextStep} style={styles.button} contentStyle={{ height: 50 }}>
            {step === totalSteps ? 'Salvar Alterações' : 'Continuar'}
        </Button>
      </View>

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

// -----------------------------------------------------------------------------
// STEPS COMPONENTS
// -----------------------------------------------------------------------------

function Step1({ control, errors, genderMenuVisible, setGenderMenuVisible, genderOptions, pickImage, selectedImage }: any) {
    const theme = useTheme();
    return (
        <>
            <View style={styles.avatarContainer}>
                <TouchableOpacity onPress={pickImage}>
                    {selectedImage ? (
                        <Avatar.Image size={100} source={{ uri: selectedImage }} />
                    ) : (
                        <Avatar.Icon size={100} icon="camera" />
                    )}
                    <View style={[styles.editIconBadge, { backgroundColor: theme.colors.primary }]}>
                        <IconButton icon="pencil" size={16} iconColor={theme.colors.onPrimary} />
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Informações Pessoais</Text>
            
            <CustomInput name="name" label="Nome" control={control} errors={errors} />
            <CustomInput name="cpf" label="CPF" control={control} errors={errors} editable={false} right={<PaperInput.Icon icon="lock" />} />
            <CustomInput name="birthDate" label="Data de Nascimento" control={control} errors={errors} keyboardType="numeric" mask={formatDate} placeholder="DD/MM/AAAA" />

            <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Menu
                        visible={genderMenuVisible}
                        onDismiss={() => setGenderMenuVisible(false)}
                        anchor={
                            <TouchableOpacity onPress={() => setGenderMenuVisible(true)}>
                                <View pointerEvents="none">
                                    <PaperInput
                                        label="Gênero"
                                        value={value}
                                        mode="outlined"
                                        style={styles.input}
                                        error={!!errors.gender}
                                        right={<PaperInput.Icon icon="chevron-down" />}
                                    />
                                </View>
                            </TouchableOpacity>
                        }
                    >
                        {genderOptions.map((option: string) => (
                            <Menu.Item key={option} onPress={() => { onChange(option); setGenderMenuVisible(false); }} title={option} />
                        ))}
                    </Menu>
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
            if (zipCode?.length === 9) {
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
            <CustomInput name="zipCode" label="CEP" control={control} errors={errors} keyboardType="numeric" mask={formatCEP} />
            <View style={styles.row}>
                <View style={{ flex: 3 }}>
                    <CustomInput name="street" label="Rua" control={control} errors={errors} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <CustomInput name="numberResidence" label="Nº" control={control} errors={errors} />
                </View>
            </View>
            <CustomInput name="complement" label="Complemento" control={control} errors={errors} />
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

function Step3({ control, errors }: any) {
    const theme = useTheme();
    return (
        <>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Contato</Text>
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
                        <DDDPicker value={value} onSelect={onChange} error={!!errors.ddd} />
                    )}
                />
                <View style={{ flex: 1 }}>
                    <CustomInput name="phone" label="Celular" control={control} errors={errors} keyboardType="phone-pad" mask={formatPhone} />
                </View>
            </View>
        </>
    );
}

function Step4({ control, errors, showPassword, togglePassword }: any) {
    const theme = useTheme();
    return (
        <>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Confirmação</Text>
            <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 20 }}>
                Para salvar as alterações, por favor, confirme sua senha atual.
            </Text>
            <CustomInput
                name="password"
                label="Senha Atual"
                control={control}
                errors={errors}
                secureTextEntry={!showPassword}
                right={<PaperInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={togglePassword} />}
            />
        </>
    );
}

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

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
            style={styles.input}
            error={!!errors[name]}
            {...props}
          />
        )}
      />
      {errors[name] && <Text style={{ color: theme.colors.error, fontSize: 12, marginTop: 4 }}>{errors[name]?.message}</Text>}
    </View>
  );
}

const formatDate = (v: string) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 10);
const formatCEP = (v: string) => v.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
const formatPhone = (v: string) => {
  const r = v.replace(/\D/g, '');
  return r.replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 10);
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  progressContainer: {
    height: 6,
    borderRadius: 3,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
  },
  stepText: {
    fontSize: 13,
    textAlign: 'right',
    marginTop: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  button: {
    borderRadius: 8,
  }
});