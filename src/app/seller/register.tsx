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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { auth } from '@/config/firebase';
import { updateBusinessBasicInfo } from '@/services/db';

export default function RegisterBusinessScreen() {
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('Av. 20 de Noviembre, Centro');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!businessName || !category || !address || !auth.currentUser) return;
    
    setLoading(true);
    try {
      await updateBusinessBasicInfo(auth.currentUser.uid, {
        businessName,
        businessCategory: category,
        businessAddress: address,
      });
      router.push('/seller/bio' as any);
    } catch (error) {
      console.error(error);
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
                  name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' } as any}
                  size={20}
                  tintColor={theme.text}
                />
              </Pressable>
            </View>

            {/* Header Title & Subtitle */}
            <View style={styles.headerContainer}>
              <ThemedText type="subtitle" style={styles.welcomeTitle}>
                Registra tu Negocio
              </ThemedText>
              <ThemedText style={styles.subtitleText} themeColor="textSecondary">
                Comencemos con los detalles básicos.
              </ThemedText>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* Business Name */}
              <View style={[
                styles.inputWrapper, 
                { borderColor: isDark ? '#2E3135' : '#E2E8F0', backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }
              ]}>
                <SymbolView
                  name={{ ios: 'storefront', android: 'storefront', web: 'storefront' } as any}
                  size={20}
                  tintColor={isDark ? '#8E8E93' : '#A0AEC0'}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Nombre del Negocio"
                  placeholderTextColor={isDark ? '#636366' : '#A0AEC0'}
                  value={businessName}
                  onChangeText={setBusinessName}
                  style={[styles.textInput, { color: theme.text }]}
                />
              </View>

              {/* Category */}
              <View style={[
                styles.inputWrapper, 
                { borderColor: isDark ? '#2E3135' : '#E2E8F0', backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }
              ]}>
                <SymbolView
                  name={{ ios: 'tag', android: 'tag', web: 'tag' } as any}
                  size={20}
                  tintColor={isDark ? '#8E8E93' : '#A0AEC0'}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Categoría (ej. Restaurante)"
                  placeholderTextColor={isDark ? '#636366' : '#A0AEC0'}
                  value={category}
                  onChangeText={setCategory}
                  style={[styles.textInput, { color: theme.text }]}
                />
              </View>

              {/* Ubicacion Label */}
              <View style={styles.sectionLabelRow}>
                <SymbolView
                  name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' } as any}
                  size={18}
                  tintColor={theme.text}
                  style={styles.labelIcon}
                />
                <ThemedText type="smallBold" style={styles.labelText}>
                  Ubicación
                </ThemedText>
              </View>

              {/* Styled Map Box */}
              <View style={styles.mapContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop' }}
                  style={styles.mapImage}
                />
                {/* Central pin marker overlay */}
                <View style={styles.pinCircle}>
                  <SymbolView
                    name={{ ios: 'mappin', android: 'location_pin', web: 'location_pin' } as any}
                    size={20}
                    tintColor="#FFFFFF"
                  />
                </View>
              </View>

              {/* Address input */}
              <View style={[
                styles.inputWrapper, 
                { borderColor: isDark ? '#2E3135' : '#E2E8F0', backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }
              ]}>
                <TextInput
                  placeholder="Dirección del Negocio"
                  placeholderTextColor={isDark ? '#636366' : '#A0AEC0'}
                  value={address}
                  onChangeText={setAddress}
                  style={[styles.textInput, { color: theme.text }]}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Pressable 
                onPress={handleContinue}
                disabled={loading || !businessName || !category || !address}
                style={({ pressed }) => [
                  styles.buttonPrimary,
                  { 
                    backgroundColor: (businessName && category && address) ? theme.text : (isDark ? '#2E3135' : '#CBD5E1'),
                    opacity: loading ? 0.7 : 1
                  },
                  pressed && styles.buttonPressed
                ]}>
                <ThemedText style={[styles.buttonPrimaryText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                  {loading ? 'Guardando...' : 'Continuar'}
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
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.two,
    marginBottom: Spacing.one,
  },
  labelIcon: {
    marginRight: Spacing.one,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '700',
  },
  mapContainer: {
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pinCircle: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonContainer: {
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
  pressed: {
    opacity: 0.82,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
