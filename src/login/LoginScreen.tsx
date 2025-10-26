import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Pressable,
  Alert,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MD3LightTheme,
  Provider as PaperProvider,
  TextInput,
  Button,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';

type Props = {
  onLogin?: (credentials: { email: string; password: string }) => void;
};

const logo = require('../../images/logo.png');

const COLORS = {
  green: '#17804F',
  teal: '#016177',
  orange: '#F98608',
  paleOverlay: 'rgba(243,243,220,0.6)',
};

const { width, height } = Dimensions.get('window');

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paperTheme = useTheme();

  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const submit = () => {
    setError(null);
    if (!email || !password) return setError('Por favor completa ambos campos');
    if (!isValidEmail(email)) return setError('Introduce un correo válido');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin({ email, password });
    }, 900);
  };

  const handleForgot = () => {
    Alert.alert('Recuperar contraseña', 'Se ha enviado un enlace de recuperación.');
  };

  return (
    <PaperProvider
      theme={{
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: COLORS.teal,
          secondary: COLORS.green,
          tertiary: COLORS.orange,
          surface: '#FFFFFF',
        },
      }}
    >
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 10}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={[styles.scrollContainer, { paddingHorizontal: width * 0.06 }]}
            keyboardShouldPersistTaps="handled"
          >
            <Surface
              style={[
                styles.surface,
                {
                  backgroundColor: paperTheme.colors.surface,
                  width: width * 0.8,
                  padding: width * 0.04,
                  elevation: 2,
                },
              ]}
              accessible
            >
              <View style={styles.logoRow}>
                <Image
                  source={logo}
                  style={{
                    width: width * 0.25,
                    height: width * 0.25,
                    resizeMode: 'contain',
                    marginBottom: height * 0.01,
                  }}
                  accessibilityLabel="Logo SmartMenu"
                />
                <Text variant="titleLarge" style={styles.brandName}>
                  SmartMenu
                </Text>
              </View>

              <Text variant="headlineMedium" style={styles.welcome}>
                Bienvenido
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                Inicia sesión para continuar
              </Text>

              <TextInput
                label="Correo electrónico"
                placeholder="tunombre@ejemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                mode="outlined"
                style={{ marginBottom: height * 0.02 }}
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
              />

              <TextInput
                label="Contraseña"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword((s) => !s)}
                  />
                }
                mode="outlined"
                style={{ marginBottom: height * 0.02 }}
                ref={passwordRef}
                returnKeyType="done"
                onSubmitEditing={submit}
              />

              <Pressable
                onPress={handleForgot}
                style={({ pressed }) => [styles.forgotWrap, pressed && { opacity: 0.6 }]}
                android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
              >
                <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
              </Pressable>

              {error && (
                <Text variant="bodySmall" style={styles.error}>
                  {error}
                </Text>
              )}

              <Button
                mode="contained"
                onPress={submit}
                loading={loading}
                disabled={loading}
                style={[
                  styles.button,
                  {
                    marginTop: height * 0.01,
                    backgroundColor: COLORS.teal,
                    paddingVertical: height * 0.005,
                  },
                ]}
              >
                Iniciar sesión
              </Button>
            </Surface>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.paleOverlay,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  surface: {
    borderRadius: 16,
    alignSelf: 'center',
  },
  logoRow: {
    alignItems: 'center',
    marginBottom: 10,
  },
  brandName: {
    color: COLORS.teal,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  welcome: {
    textAlign: 'center',
    marginBottom: 6,
    color: COLORS.teal,
  },
  subtitle: {
    marginBottom: 12,
    color: '#6b6b6b',
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
  },
  error: {
    color: '#b00020',
    marginBottom: 8,
    textAlign: 'center',
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: 6,
  },
  forgot: {
    color: COLORS.teal,
    fontSize: 13,
  },
});

export default LoginScreen;
