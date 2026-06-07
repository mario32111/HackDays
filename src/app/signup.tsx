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
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authSession } from '@/constants/auth';
import { auth } from '@/config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserProfile } from '@/services/db';

export default function SignUpScreen() {
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (!nombre || !apellido || !telefono || !email || !password) {
      setErrorMessage('Por favor completa todos los campos.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(userCredential.user.uid, userCredential.user.email, nombre, apellido, telefono);
      
      authSession.isLoggedIn = true;
      router.replace('/explore');
    } catch (error: any) {
      setErrorMessage(error.message || 'Error al crear cuenta.');
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

            {/* Back Button */}
            <View style={styles.headerRow}>
              <Pressable 
                onPress={() => router.back()} 
                style={({ pressed }) => [
                  styles.backButton,
                  { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' },
                  pressed && styles.pressed
                ]}>
                <SymbolView
                  name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
                  size={20}
                  tintColor={theme.text}
                />
              </Pressable>
            </View>

            {/* Header Title & Subtitle */}
            <View style={styles.headerContainer}>
              <ThemedText type="subtitle" style={styles.welcomeTitle}>
                Crear Cuenta
              </ThemedText>
              <ThemedText style={styles.subtitleText} themeColor="textSecondary">
                Regístrate para continuar explorando Durango.
              </ThemedText>
            </View>

            {/* Inputs Section */}
            <View style={styles.formContainer}>
              {/* Nombre Input */}
              <View style={[
                styles.inputWrapper, 
                { borderColor: isDark ? '#2E3135' : '#E2E8F0', backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }
              ]}>
                <SymbolView
                  name={{ ios: 'person', android: 'person', web: 'person' }}
                  size={20}
                  tintColor={isDark ? '#8E8E93' : '#A0AEC0'}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Nombre"
                  placeholderTextColor={isDark ? '#636366' : '#A0AEC0'}
                  value={nombre}
                  onChangeText={setNombre}
                  style={[styles.textInput, { color: theme.text }]}
                />
              </View>

              {/* Apellido Input */}
              <View style={[
                styles.inputWrapper, 
                { borderColor: isDark ? '#2E3135' : '#E2E8F0', backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }
              ]}>
                <SymbolView
                  name={{ ios: 'person', android: 'person', web: 'person' }}
                  size={20}
                  tintColor={isDark ? '#8E8E93' : '#A0AEC0'}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Apellido"
                  placeholderTextColor={isDark ? '#636366' : '#A0AEC0'}
                  value={apellido}
                  onChangeText={setApellido}
                  style={[styles.textInput, { color: theme.text }]}
                />
              </View>

              {/* Teléfono Input */}
              <View style={[
                styles.inputWrapper, 
                { borderColor: isDark ? '#2E3135' : '#E2E8F0', backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }
              ]}>
                <SymbolView
                  name={{ ios: 'phone', android: 'phone', web: 'phone' }}
                  size={20}
                  tintColor={isDark ? '#8E8E93' : '#A0AEC0'}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Teléfono"
                  placeholderTextColor={isDark ? '#636366' : '#A0AEC0'}
                  value={telefono}
                  onChangeText={setTelefono}
                  keyboardType="phone-pad"
                  style={[styles.textInput, { color: theme.text }]}
                />
              </View>

              {/* Correo Input */}
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

            {errorMessage ? (
              <ThemedText style={{ color: '#EF4444', textAlign: 'center', marginBottom: Spacing.three }}>
                {errorMessage}
              </ThemedText>
            ) : null}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              {/* Siguiente */}
              <Pressable 
                onPress={handleRegister}
                disabled={loading}
                style={({ pressed }) => [
                  styles.buttonPrimary,
                  { backgroundColor: theme.text, opacity: loading ? 0.7 : 1 },
                  pressed && styles.buttonPressed
                ]}>
                <ThemedText style={[styles.buttonPrimaryText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                  {loading ? 'Cargando...' : 'Siguiente'}
                </ThemedText>
              </Pressable>

              {/* ¿Ya tienes cuenta? Iniciar Sesión */}
              <Pressable 
                onPress={() => router.replace('/')}
                style={styles.signInLinkContainer}>
                <ThemedText type="smallBold" style={styles.signInLinkText}>
                  ¿Ya tienes cuenta? Iniciar Sesión
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
  headerRow: {
    height: 48,
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: Spacing.four,
    marginTop: Spacing.one,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
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
    marginBottom: Spacing.four,
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
  buttonContainer: {
    gap: Spacing.three,
    marginTop: Spacing.two,
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
  signInLinkContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.one,
  },
  signInLinkText: {
    fontSize: 14,
  },
  pressed: {
    opacity: 0.82,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
