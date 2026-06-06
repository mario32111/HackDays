import React from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Platform,
  ScrollView,
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

export default function PreviewScreen() {
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const handleGoToProfile = () => {
    router.push('/seller/profile' as any);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          
          {/* Cover Image Section with Overlay */}
          <View style={styles.coverContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop' }}
              style={styles.coverImage}
            />
            {/* Dark gradient overlay style */}
            <View style={styles.coverOverlay} />

            {/* Back Button Overlay */}
            <SafeAreaView style={styles.backButtonSafeArea} edges={['top', 'left']}>
              <Pressable 
                onPress={() => router.back()} 
                style={({ pressed }) => [
                  styles.backButton,
                  pressed && styles.pressed
                ]}>
                <SymbolView
                  name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' } as any}
                  size={20}
                  tintColor="#FFFFFF"
                />
              </Pressable>
            </SafeAreaView>

            {/* Business Info Overlay */}
            <View style={styles.infoOverlayContainer}>
              <ThemedText style={styles.businessTitle}>
                Mamma Mia Pizza
              </ThemedText>
              
              <View style={styles.ratingRow}>
                <SymbolView
                  name={{ ios: 'star.fill', android: 'star', web: 'star' } as any}
                  size={16}
                  tintColor="#FBBF24"
                  style={styles.starIcon}
                />
                <ThemedText style={styles.ratingText}>
                  4.9 (120 res)
                </ThemedText>
                <ThemedText style={styles.ratingDivider}>•</ThemedText>
                <ThemedText style={styles.categoryText}>
                  Pizza Artesanal
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Body Content */}
          <View style={styles.bodyContainer}>
            {/* Tags Row */}
            <View style={styles.tagsRow}>
              {['#Leña', '#Parejas', '#Vino'].map((tag) => (
                <View 
                  key={tag} 
                  style={[
                    styles.tagPill, 
                    { backgroundColor: isDark ? '#1C1C1E' : '#F1F5F9' }
                  ]}>
                  <ThemedText style={styles.tagText} themeColor="textSecondary">
                    {tag}
                  </ThemedText>
                </View>
              ))}
            </View>

            {/* Acerca de nosotros */}
            <View style={styles.sectionContainer}>
              <ThemedText style={styles.sectionTitle}>
                Acerca de nosotros
              </ThemedText>
              <ThemedText style={styles.sectionContent} themeColor="textSecondary">
                La mejor pizza a la leña de Durango, con ingredientes frescos y masa madre reposada por 48 horas. Un rincón único donde el sabor tradicional se encuentra con un ambiente moderno. Perfecto para disfrutar de tardes tranquilas con la mejor compañía.
              </ThemedText>
            </View>

            {/* Details List */}
            <View style={styles.detailsList}>
              {/* Location */}
              <View style={styles.detailRow}>
                <SymbolView
                  name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' } as any}
                  size={20}
                  tintColor={isDark ? '#8E8E93' : '#64748B'}
                  style={styles.detailIcon}
                />
                <View style={styles.detailTextContainer}>
                  <ThemedText style={styles.detailText}>
                    Av. 20 de Noviembre 123, Centro
                  </ThemedText>
                </View>
              </View>

              {/* Hours */}
              <View style={styles.detailRow}>
                <SymbolView
                  name={{ ios: 'clock', android: 'schedule', web: 'schedule' } as any}
                  size={20}
                  tintColor={isDark ? '#8E8E93' : '#64748B'}
                  style={styles.detailIcon}
                />
                <View style={styles.detailTextContainer}>
                  <View style={styles.hoursRow}>
                    <ThemedText style={styles.statusOpen}>
                      Abierto ahora
                    </ThemedText>
                    <ThemedText style={styles.hoursDivider}>•</ThemedText>
                    <ThemedText style={styles.hoursText} themeColor="textSecondary">
                      Cierra a las 23:00
                    </ThemedText>
                  </View>
                </View>
              </View>
            </View>

            {/* Next Action Button */}
            <View style={styles.footerContainer}>
              <Pressable 
                onPress={handleGoToProfile}
                style={({ pressed }) => [
                  styles.buttonPrimary,
                  { backgroundColor: theme.text },
                  pressed && styles.buttonPressed
                ]}>
                <ThemedText style={[styles.buttonPrimaryText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                  Ver Perfil de la Empresa
                </ThemedText>
              </Pressable>
            </View>

          </View>
        </ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },
  scrollContent: {
    flexGrow: 1,
  },
  coverContainer: {
    height: 280,
    position: 'relative',
    backgroundColor: '#000000',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    opacity: 0.82,
  },
  coverOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  backButtonSafeArea: {
    position: 'absolute',
    top: 0,
    left: Spacing.four,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  infoOverlayContainer: {
    position: 'absolute',
    bottom: Spacing.four,
    left: Spacing.four,
    right: Spacing.four,
    gap: 4,
  },
  businessTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ratingDivider: {
    marginHorizontal: 6,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  bodyContainer: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  tagPill: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionContainer: {
    marginBottom: Spacing.four,
    gap: Spacing.one,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  detailsList: {
    gap: Spacing.three,
    marginBottom: Spacing.four,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#E2E8F0',
    borderBottomColor: '#E2E8F0',
    paddingVertical: Spacing.three,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: Spacing.three,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailText: {
    fontSize: 15,
    fontWeight: '600',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusOpen: {
    fontSize: 15,
    fontWeight: '700',
    color: '#10B981',
  },
  hoursDivider: {
    marginHorizontal: Spacing.one,
    color: '#94A3B8',
  },
  hoursText: {
    fontSize: 15,
    fontWeight: '600',
  },
  footerContainer: {
    marginTop: Spacing.two,
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
  pressed: {
    opacity: 0.82,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
