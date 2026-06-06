import React, { useState } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Platform,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authSession } from '@/constants/auth';

export default function ProfileSelectorScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  React.useEffect(() => {
    if (!authSession.isLoggedIn) {
      router.replace('/');
    }
  }, [router]);

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top + Spacing.two,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    ios: {
      paddingTop: insets.top + Spacing.two,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.five,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        
        {/* Back Button */}
        <View style={styles.headerRow}>
          <Pressable 
            onPress={() => {
              authSession.isLoggedIn = false;
              router.replace('/');
            }} 
            style={({ pressed }) => [
              styles.backButton,
              { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' },
              pressed && styles.buttonPressed
            ]}>
            <SymbolView
              name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
              size={20}
              tintColor={theme.text}
            />
          </Pressable>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle" style={styles.title}>
            ¿Cómo quieres usar la app?
          </ThemedText>
          <ThemedText style={styles.subtitle} themeColor="textSecondary">
            Elige tu perfil para personalizar tu experiencia en Durango.
          </ThemedText>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          
          {/* Option 1: Explorar y Comprar */}
          <Pressable
            onPress={() => setSelectedProfile('user')}
            style={({ pressed }) => [
              styles.card,
              { 
                borderColor: selectedProfile === 'user'
                  ? theme.text 
                  : (isDark ? '#2E3135' : '#E2E8F0'),
                backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF'
              },
              pressed && styles.cardPressed
            ]}>
            
            {/* Background Decorative Circle */}
            <View style={[
              styles.cardCircle, 
              { backgroundColor: isDark ? '#2E3135' : '#F1F5F9', opacity: selectedProfile === 'user' ? 0.4 : 0.2 }
            ]} />

            <View style={styles.cardHeader}>
              <View style={[
                styles.iconContainer, 
                { backgroundColor: isDark ? '#FFFFFF' : '#000000' }
              ]}>
                <SymbolView
                  name={{ ios: 'bag', android: 'shopping_bag', web: 'shopping_bag' }}
                  size={24}
                  tintColor={isDark ? '#000000' : '#FFFFFF'}
                />
              </View>
              
              {selectedProfile === 'user' && (
                <View style={[styles.badge, { backgroundColor: theme.text }]}>
                  <SymbolView
                    name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                    size={12}
                    tintColor={isDark ? '#000000' : '#FFFFFF'}
                  />
                </View>
              )}
            </View>

            <View style={styles.cardTextContainer}>
              <ThemedText style={styles.cardTitle}>
                Explorar y Comprar
              </ThemedText>
              <ThemedText style={styles.cardDescription} themeColor="textSecondary">
                Quiero descubrir lugares y ofertas locales.
              </ThemedText>
            </View>
          </Pressable>

          {/* Option 2: Tengo un Negocio */}
          <Pressable
            onPress={() => setSelectedProfile('business')}
            style={({ pressed }) => [
              styles.card,
              { 
                borderColor: selectedProfile === 'business'
                  ? theme.text 
                  : (isDark ? '#2E3135' : '#E2E8F0'),
                backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF'
              },
              pressed && styles.cardPressed
            ]}>
            
            {/* Background Decorative Circle */}
            <View style={[
              styles.cardCircle, 
              { backgroundColor: isDark ? '#2E3135' : '#F1F5F9', opacity: selectedProfile === 'business' ? 0.4 : 0.2 }
            ]} />

            <View style={styles.cardHeader}>
              <View style={[
                styles.iconContainer, 
                { backgroundColor: isDark ? '#FFFFFF' : '#000000' }
              ]}>
                <SymbolView
                  name={{ ios: 'storefront', android: 'store', web: 'store' }}
                  size={24}
                  tintColor={isDark ? '#000000' : '#FFFFFF'}
                />
              </View>
              
              {selectedProfile === 'business' && (
                <View style={[styles.badge, { backgroundColor: theme.text }]}>
                  <SymbolView
                    name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                    size={12}
                    tintColor={isDark ? '#000000' : '#FFFFFF'}
                  />
                </View>
              )}
            </View>

            <View style={styles.cardTextContainer}>
              <ThemedText style={styles.cardTitle}>
                Tengo un Negocio
              </ThemedText>
              <ThemedText style={styles.cardDescription} themeColor="textSecondary">
                Quiero vender y conectar con más clientes.
              </ThemedText>
            </View>
          </Pressable>

        </View>

        {/* Continue Button */}
        {selectedProfile && (
          <View style={styles.footer}>
            <Pressable 
              onPress={() => {
                if (selectedProfile) {
                  authSession.role = selectedProfile as 'user' | 'business';
                  router.push('/signup' as any);
                }
              }}
              style={({ pressed }) => [
                styles.continueButton,
                { 
                  backgroundColor: selectedProfile 
                    ? theme.text 
                    : (isDark ? '#2E3135' : '#CBD5E1') 
                },
                pressed && selectedProfile && styles.buttonPressed
              ]}>
              <ThemedText style={[styles.continueButtonText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                Siguiente
              </ThemedText>
            </Pressable>
          </View>
        )}

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
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
  titleContainer: {
    marginBottom: Spacing.five,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    letterSpacing: -0.5,
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  optionsContainer: {
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 24,
    padding: Spacing.four,
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
      }
    })
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  cardCircle: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.12)',
      }
    })
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextContainer: {
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: Spacing.one,
  },
  cardDescription: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  footer: {
    marginTop: Spacing.two,
    marginBottom: Spacing.four,
  },
  continueButton: {
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
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
