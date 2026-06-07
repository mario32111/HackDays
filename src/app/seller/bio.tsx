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
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { auth } from '@/config/firebase';
import { updateBusinessBio } from '@/services/db';

export default function CreateBioScreen() {
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBio, setGeneratedBio] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateBio = () => {
    if (!keywords.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedBio(
        'La mejor pizza a la leña de Durango, con ingredientes frescos y masa madre reposada por 48 horas. Un rincón único donde el sabor tradicional se encuentra con un ambiente moderno. Perfecto para disfrutar de tardes tranquilas con la mejor compañía.'
      );
      setIsGenerating(false);
    }, 1200);
  };

  const handleFinish = async () => {
    if (!generatedBio || !auth.currentUser) return;
    setLoading(true);
    try {
      await updateBusinessBio(auth.currentUser.uid, {
        businessKeywords: keywords,
        businessBio: generatedBio
      });
      router.replace('/seller/catalog' as any);
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
                Crea tu Biografía
              </ThemedText>
              <ThemedText style={styles.subtitleText} themeColor="textSecondary">
                Usa nuestra IA para destacar.
              </ThemedText>
            </View>

            {/* Input Section */}
            <View style={styles.formContainer}>
              <ThemedText type="smallBold" style={styles.inputLabel}>
                Ingresa 5 palabras clave sobre tu negocio
              </ThemedText>
              
              <View style={[
                styles.textareaWrapper, 
                { borderColor: isDark ? '#2E3135' : '#E2E8F0', backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }
              ]}>
                <TextInput
                  placeholder="ej: Terraza, Café, Mascotas, Jazz, Tranquilo"
                  placeholderTextColor={isDark ? '#636366' : '#A0AEC0'}
                  value={keywords}
                  onChangeText={setKeywords}
                  multiline
                  numberOfLines={4}
                  style={[styles.textareaInput, { color: theme.text }]}
                />
              </View>

              {/* Generate with AI Button */}
              <Pressable 
                onPress={handleGenerateBio}
                disabled={isGenerating || !keywords.trim()}
                style={({ pressed }) => [
                  styles.buttonAI,
                  { 
                    backgroundColor: keywords.trim() 
                      ? (isDark ? '#48484A' : '#7E7E7E') 
                      : (isDark ? '#2E3135' : '#E2E8F0') 
                  },
                  pressed && styles.buttonPressed
                ]}>
                {isGenerating ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <View style={styles.aiButtonContent}>
                    <SymbolView
                      name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' } as any}
                      size={18}
                      tintColor="#FFD700"
                      style={styles.aiIcon}
                    />
                    <ThemedText style={styles.buttonAIText}>
                      Generar Bio con IA
                    </ThemedText>
                  </View>
                )}
              </Pressable>

              {/* Display Generated Bio Result */}
              {generatedBio ? (
                <View style={[
                  styles.bioResultCard,
                  { backgroundColor: isDark ? '#1C1C1E' : '#F8FAFC', borderColor: isDark ? '#2E3135' : '#E2E8F0' }
                ]}>
                  <View style={styles.bioResultHeader}>
                    <SymbolView
                      name={{ ios: 'doc.text.fill', android: 'description', web: 'description' } as any}
                      size={16}
                      tintColor={isDark ? '#B0B4BA' : '#64748B'}
                    />
                    <ThemedText style={styles.bioResultTitle} themeColor="textSecondary">
                      Biografía sugerida por IA:
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.bioResultText}>
                    {generatedBio}
                  </ThemedText>
                </View>
              ) : null}
            </View>

            {/* Finalize and enter button */}
            <View style={styles.footerContainer}>
              <Pressable 
                onPress={handleFinish}
                disabled={loading || !generatedBio}
                style={({ pressed }) => [
                  styles.buttonPrimary,
                  { 
                    backgroundColor: generatedBio 
                      ? theme.text 
                      : (isDark ? '#3A3A3C' : '#8E8E93'),
                    opacity: loading ? 0.7 : 1
                  },
                  pressed && styles.buttonPressed
                ]}>
                <ThemedText style={[
                  styles.buttonPrimaryText, 
                  { 
                    color: generatedBio 
                      ? (isDark ? '#000000' : '#FFFFFF') 
                      : (isDark ? '#8E8E93' : '#E2E8F0') 
                  }
                ]}>
                  {loading ? 'Finalizando...' : 'Finalizar y Entrar'}
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
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: Spacing.one,
  },
  textareaWrapper: {
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    height: 120,
  },
  textareaInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    textAlignVertical: 'top',
  },
  buttonAI: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  aiButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    marginRight: Spacing.two,
  },
  buttonAIText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bioResultCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: Spacing.three,
    marginTop: Spacing.two,
    gap: Spacing.one,
  },
  bioResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  bioResultTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  bioResultText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
  },
  footerContainer: {
    marginTop: Spacing.two,
  },
  buttonPrimary: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
