import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authSession } from '@/constants/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';

export default function WelcomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isDark = scheme === 'dark';

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor ingresa correo y contraseña.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      authSession.isLoggedIn = true;
      router.push('/explore');
    } catch (error: any) {
      setErrorMessage(error.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor ingresa correo y contraseña.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      authSession.isLoggedIn = true;
      router.push('/explore');
    } catch (error: any) {
      setErrorMessage(error.message || 'Error al crear cuenta.');
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <SafeAreaView style={styles.safeArea}>
            
            {/* Logo Section */}
            <View style={[styles.logoContainer, isDark ? styles.logoContainerDark : styles.logoContainerLight]}>
              <ThemedText style={[styles.logoText, { color: isDark ? '#000000' : '#FFFFFF' }]}>Dgo</ThemedText>
            </View>

            {/* Header Title & Subtitle */}
            <View style={styles.headerContainer}>
              <ThemedText type="subtitle" style={styles.welcomeTitle}>
                Bienvenido
              </ThemedText>
              <ThemedText style={styles.subtitleText} themeColor="textSecondary">
                Conecta con lo mejor de Victoria de Durango.
              </ThemedText>
            </View>

            {/* Inputs Section */}
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={[
                styles.inputWrapper, 
                { borderColor: isDark ? '#2E3135' : '#E2E8F0', backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }
              ]}>
                <SymbolView
                  name={{ ios: 'envelope', android: 'mail', web: 'mail' }}
                  size={20}
                  tintColor={isDark ? '#8E8E93' : '#A0AEC0'}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Correo electrónico"
                  placeholderTextColor={isDark ? '#636366' : '#A0AEC0'}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={[styles.textInput, { color: theme.text }]}
                />
              </View>

              {/* Password Input */}
              <View style={[
                styles.inputWrapper, 
                { borderColor: isDark ? '#2E3135' : '#E2E8F0', backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }
              ]}>
                <SymbolView
                  name={{ ios: 'lock', android: 'lock', web: 'lock' }}
                  size={20}
                  tintColor={isDark ? '#8E8E93' : '#A0AEC0'}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Contraseña"
                  placeholderTextColor={isDark ? '#636366' : '#A0AEC0'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  style={[styles.textInput, { color: theme.text }]}
                />
              </View>
            </View>

            {/* Remember Me & Forgot Password Row */}
            <View style={styles.optionsRow}>
              <Pressable 
                onPress={() => setRememberMe(!rememberMe)} 
                style={styles.checkboxContainer}>
                <View style={[
                  styles.checkbox,
                  { borderColor: isDark ? '#48484A' : '#CBD5E1' },
                  rememberMe && { backgroundColor: theme.text, borderColor: theme.text }
                ]}>
                  {rememberMe && (
                    <SymbolView
                      name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                      size={12}
                      tintColor={isDark ? '#000000' : '#FFFFFF'}
                    />
                  )}
                </View>
                <ThemedText type="small" themeColor="textSecondary" style={styles.checkboxLabel}>
                  Recordarme
                </ThemedText>
              </Pressable>

              <Pressable onPress={() => {}}>
                <ThemedText type="smallBold" style={styles.forgotPassword}>
                  ¿Olvidaste tu contraseña?
                </ThemedText>
              </Pressable>
            </View>

            {/* Error Message */}
            {errorMessage ? (
              <ThemedText style={{ color: '#EF4444', textAlign: 'center', marginBottom: Spacing.three }}>
                {errorMessage}
              </ThemedText>
            ) : null}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              {/* Iniciar Sesión */}
              <Pressable 
                onPress={handleLogin}
                disabled={loading}
                style={({ pressed }) => [
                  styles.buttonPrimary,
                  { backgroundColor: theme.text, opacity: loading ? 0.7 : 1 },
                  pressed && styles.buttonPressed
                ]}>
                <ThemedText style={[styles.buttonPrimaryText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                  {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </ThemedText>
              </Pressable>

              {/* Crear Cuenta */}
              <Pressable 
                onPress={handleRegister}
                disabled={loading}
                style={({ pressed }) => [
                  styles.buttonSecondary,
                  { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', opacity: loading ? 0.7 : 1 },
                  pressed && styles.buttonPressed
                ]}>
                <ThemedText style={[styles.buttonSecondaryText, { color: theme.text }]}>
                  Crear Cuenta
                </ThemedText>
              </Pressable>
            </View>

            {/* Separator "O continuar con" */}
            <View style={styles.separatorContainer}>
              <View style={[styles.separatorLine, { backgroundColor: isDark ? '#2E3135' : '#E2E8F0' }]} />
              <ThemedText type="small" themeColor="textSecondary" style={styles.separatorText}>
                O continuar con
              </ThemedText>
              <View style={[styles.separatorLine, { backgroundColor: isDark ? '#2E3135' : '#E2E8F0' }]} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialContainer}>
              <Pressable style={({ pressed }) => [
                styles.googleButton,
                { 
                  borderColor: isDark ? '#2E3135' : '#E2E8F0', 
                  backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' 
                },
                pressed && styles.buttonPressed
              ]}>
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png' }}
                  style={styles.googleIcon}
                />
                <ThemedText style={[styles.googleButtonText, { color: theme.text }]}>
                  Continuar con Google
                </ThemedText>
              </Pressable>
            </View>

          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  keyboardAvoid: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.four,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'center',
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.four,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
      }
    })
  },
  logoContainerLight: {
    backgroundColor: '#000000',
  },
  logoContainerDark: {
    backgroundColor: '#FFFFFF',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerContainer: {
    marginBottom: Spacing.four,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 42,
    letterSpacing: -0.5,
    marginBottom: Spacing.two,
  },
  subtitleText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  formContainer: {
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    height: 56,
  },
  inputIcon: {
    marginRight: Spacing.two,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    height: '100%',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.two,
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '700',
  },
  buttonContainer: {
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  buttonPrimary: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
      }
    })
  },
  buttonPrimaryText: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonSecondary: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSecondaryText: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.three,
  },
  separatorLine: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    marginHorizontal: Spacing.three,
    fontSize: 12,
    fontWeight: '600',
  },
  socialContainer: {
    marginBottom: Spacing.four,
  },
  googleButton: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: Spacing.two,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
