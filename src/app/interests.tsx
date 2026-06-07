import React, { useState } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Platform,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { auth } from '@/config/firebase';
import { updateUserInterests } from '@/services/db';

const INTERESTS = [
  'Alimentos',
  'Artesanías de Durango',
  'Servicios para el hogar',
  'Tienditas',
  'Mercados',
  'Restaurantes',
  'Talleres',
  'Moda local',
  'Cafeterías',
];

export default function InterestsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (selectedInterests.length >= 3 && auth.currentUser) {
      setLoading(true);
      try {
        await updateUserInterests(auth.currentUser.uid, selectedInterests);
        router.replace('/home');
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleSkip = async () => {
    if (auth.currentUser) {
      setLoading(true);
      try {
        await updateUserInterests(auth.currentUser.uid, []);
        router.replace('/home');
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      router.replace('/home');
    }
  };

  const isNextEnabled = selectedInterests.length >= 3;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header Row: Stepper and Skip */}
        <View style={styles.headerRow}>
          {/* Stepper Indicator */}
          <View style={styles.stepperContainer}>
            <View style={[styles.stepperActiveBar, { backgroundColor: theme.text }]} />
            <View style={[styles.stepperDot, { backgroundColor: isDark ? '#48484A' : '#E2E8F0' }]} />
          </View>

          {/* Saltar Button */}
          <Pressable onPress={handleSkip} style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.skipText}>
              Saltar
            </ThemedText>
          </Pressable>
        </View>

        {/* Content Section */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.titleContainer}>
            <ThemedText type="subtitle" style={styles.title}>
              ¿Qué te interesa?
            </ThemedText>
            <ThemedText style={styles.subtitle} themeColor="textSecondary">
              Selecciona al menos 3 para personalizar tus recomendaciones.
            </ThemedText>
          </View>

          {/* Interests Grid */}
          <View style={styles.interestsContainer}>
            {INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <Pressable
                  key={interest}
                  onPress={() => toggleInterest(interest)}
                  style={({ pressed }) => [
                    styles.pill,
                    {
                      borderColor: isSelected
                        ? theme.text
                        : (isDark ? '#2E3135' : '#E2E8F0'),
                      backgroundColor: isSelected
                        ? theme.text
                        : (isDark ? '#1C1C1E' : '#FFFFFF'),
                    },
                    pressed && styles.pressed,
                  ]}>
                  <ThemedText
                    type="smallBold"
                    style={{
                      color: isSelected
                        ? (isDark ? '#000000' : '#FFFFFF')
                        : theme.text,
                    }}>
                    {interest}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>

        </ScrollView>

        {/* Footer Button */}
        <View style={styles.footer}>
          <Pressable 
            onPress={handleNext}
            disabled={selectedInterests.length < 3 || loading}
            style={({ pressed }) => [
              styles.nextButton,
              { 
                backgroundColor: selectedInterests.length >= 3 
                  ? theme.text 
                  : (isDark ? '#2E3135' : '#CBD5E1'),
                opacity: loading ? 0.7 : 1
              },
              pressed && selectedInterests.length >= 3 && styles.pressed,
            ]}>
            <ThemedText 
              style={[
                styles.nextButtonText, 
                { 
                  color: isDark ? '#000000' : '#FFFFFF'
                }
              ]}>
              {loading ? 'Cargando...' : 'Siguiente'}
            </ThemedText>
          </Pressable>
        </View>

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperActiveBar: {
    width: 28,
    height: 6,
    borderRadius: 3,
  },
  stepperDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 6,
  },
  skipText: {
    fontSize: 16,
  },
  scrollContent: {
    paddingVertical: Spacing.three,
  },
  titleContainer: {
    marginBottom: Spacing.four,
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
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  pill: {
    borderWidth: 1.5,
    borderRadius: 24,
    paddingHorizontal: Spacing.three + 4,
    paddingVertical: Spacing.two + 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
        cursor: 'pointer',
      }
    })
  },
  pressed: {
    opacity: 0.8,
  },
  footer: {
    paddingBottom: Spacing.four,
  },
  nextButton: {
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
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
