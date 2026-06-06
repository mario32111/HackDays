import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Platform,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { VoiceAiOverlay } from '@/components/voice-ai-overlay';

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const [voiceAiVisible, setVoiceAiVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const insets = {
    ...safeAreaInsets,
    top: safeAreaInsets.top,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top + Spacing.two,
      paddingBottom: Spacing.six,
    },
    ios: {
      paddingTop: insets.top + Spacing.two,
      paddingBottom: Spacing.six,
    },
    web: {
      paddingTop: Spacing.four,
      paddingBottom: Spacing.six,
    },
  });

  return (
    <ThemedView style={styles.outerContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, contentPlatformStyle]}>
        
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View>
            <ThemedText style={styles.locationLabel} themeColor="textSecondary">
              UBICACIÓN ACTUAL
            </ThemedText>
            <View style={styles.locationSelector}>
              <SymbolView
                name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' }}
                size={16}
                tintColor={isDark ? '#FFFFFF' : '#000000'}
                style={styles.locationIcon}
              />
              <ThemedText style={styles.locationText}>
                Centro Histórico, Dgo
              </ThemedText>
            </View>
          </View>
          
          {/* User Avatar Circle */}
          <Pressable 
            onPress={() => router.push('/profile')}
            style={({ pressed }) => pressed && styles.pressed}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' }}
              style={styles.avatar}
            />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={[
          styles.searchBar,
          { 
            borderColor: isDark ? '#2E3135' : '#E2E8F0',
            backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF'
          }
        ]}>
          <SymbolView
            name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
            size={18}
            tintColor={isDark ? '#8E8E93' : '#A0AEC0'}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Buscar negocios, tacos, servicios..."
            placeholderTextColor={isDark ? '#636366' : '#A0AEC0'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: theme.text }]}
          />
          <Pressable 
            onPress={() => setVoiceAiVisible(true)} 
            style={({ pressed }) => pressed && styles.pressed}>
            <SymbolView
              name={{ ios: 'mic.fill', android: 'mic', web: 'mic' }}
              size={18}
              tintColor={theme.text}
              style={styles.micIcon}
            />
          </Pressable>
        </View>

        {/* Section 1: Flash Matches */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <SymbolView
                name={{ ios: 'bolt.fill', android: 'bolt', web: 'bolt' }}
                size={18}
                tintColor="#F5A623"
                style={styles.titleIcon}
              />
              <ThemedText style={styles.sectionTitle}>
                Flash Matches
              </ThemedText>
            </View>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <View style={styles.seeMoreRow}>
                <ThemedText type="smallBold" themeColor="textSecondary">
                  Ver más
                </ThemedText>
                <SymbolView
                  name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                  size={12}
                  tintColor={isDark ? '#B0B4BA' : '#60646C'}
                />
              </View>
            </Pressable>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollList}>
            
            {/* Flash Match Card 1 */}
            <View style={[styles.flashCard, { backgroundColor: '#FFD700' }]}>
              <View style={styles.flashCardTop}>
                <View style={styles.flashBadge}>
                  <ThemedText style={styles.flashBadgeText}>Termina en 2h</ThemedText>
                </View>
                <ThemedText style={styles.discountText}>-50%</ThemedText>
              </View>
              <View style={styles.flashCardContent}>
                <ThemedText style={styles.flashTitle}>Tacos El Paisa</ThemedText>
                <ThemedText style={styles.flashSubtitle}>Orden de pastor al 2x1</ThemedText>
              </View>
              <Pressable style={({ pressed }) => [
                styles.flashButton,
                pressed && styles.pressed
              ]}>
                <ThemedText style={styles.flashButtonText}>Lo quiero</ThemedText>
              </Pressable>
            </View>

            {/* Flash Match Card 2 */}
            <View style={[styles.flashCard, { backgroundColor: '#F8E71C' }]}>
              <View style={styles.flashCardTop}>
                <View style={styles.flashBadge}>
                  <ThemedText style={styles.flashBadgeText}>Termina en 3h</ThemedText>
                </View>
                <ThemedText style={styles.discountText}>-30%</ThemedText>
              </View>
              <View style={styles.flashCardContent}>
                <ThemedText style={styles.flashTitle}>Café Andrade</ThemedText>
                <ThemedText style={styles.flashSubtitle}>Café americano + dona gratis</ThemedText>
              </View>
              <Pressable style={({ pressed }) => [
                styles.flashButton,
                pressed && styles.pressed
              ]}>
                <ThemedText style={styles.flashButtonText}>Lo quiero</ThemedText>
              </Pressable>
            </View>

          </ScrollView>
        </View>

        {/* Section 2: Negocios Destacados */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>
              Negocios Destacados
            </ThemedText>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollList}>
            
            {/* Business 1 */}
            <View style={styles.businessCard}>
              <View style={styles.businessImageContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&fit=crop' }}
                  style={styles.businessImage}
                />
                <View style={[styles.ratingBadge, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
                  <SymbolView
                    name={{ ios: 'star.fill', android: 'star', web: 'star' }}
                    size={10}
                    tintColor="#FFCC00"
                    style={{ marginRight: 2 }}
                  />
                  <ThemedText style={[styles.ratingText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                    4.8
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.businessTitle} numberOfLines={1}>
                Café de la Fundición
              </ThemedText>
              <ThemedText style={styles.businessSubtitle} themeColor="textSecondary">
                A 1.2 km
              </ThemedText>
            </View>

            {/* Business 2 */}
            <View style={styles.businessCard}>
              <View style={styles.businessImageContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&fit=crop' }}
                  style={styles.businessImage}
                />
                <View style={[styles.ratingBadge, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
                  <SymbolView
                    name={{ ios: 'star.fill', android: 'star', web: 'star' }}
                    size={10}
                    tintColor="#FFCC00"
                    style={{ marginRight: 2 }}
                  />
                  <ThemedText style={[styles.ratingText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                    4.9
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.businessTitle} numberOfLines={1}>
                Artesanías Alacrán
              </ThemedText>
              <ThemedText style={styles.businessSubtitle} themeColor="textSecondary">
                A 1.2 km
              </ThemedText>
            </View>

            {/* Business 3 */}
            <View style={styles.businessCard}>
              <View style={styles.businessImageContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&fit=crop' }}
                  style={styles.businessImage}
                />
                <View style={[styles.ratingBadge, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
                  <SymbolView
                    name={{ ios: 'star.fill', android: 'star', web: 'star' }}
                    size={10}
                    tintColor="#FFCC00"
                    style={{ marginRight: 2 }}
                  />
                  <ThemedText style={[styles.ratingText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                    4.7
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.businessTitle} numberOfLines={1}>
                Panadería Dulce
              </ThemedText>
              <ThemedText style={styles.businessSubtitle} themeColor="textSecondary">
                A 1.2 km
              </ThemedText>
            </View>

          </ScrollView>
        </View>

        {/* Section 3: Recomendado para ti */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>
              Recomendado para ti
            </ThemedText>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollList}>
            
            {/* Recommended 1 */}
            <View style={styles.recommendedCard}>
              <View style={styles.recImageContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&fit=crop' }}
                  style={styles.recImage}
                />
                <View style={styles.categoryBadge}>
                  <ThemedText style={styles.categoryText}>Barbería</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.recTitle} numberOfLines={1}>
                Corte de Cabello
              </ThemedText>
              <ThemedText style={styles.recPrice}>
                $150
              </ThemedText>
            </View>

            {/* Recommended 2 */}
            <View style={styles.recommendedCard}>
              <View style={styles.recImageContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&fit=crop' }}
                  style={styles.recImage}
                />
                <View style={styles.categoryBadge}>
                  <ThemedText style={styles.categoryText}>Comida</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.recTitle} numberOfLines={1}>
                Pizza Artesanal
              </ThemedText>
              <ThemedText style={styles.recPrice}>
                $180
              </ThemedText>
            </View>

          </ScrollView>
        </View>

      </ScrollView>

      {/* Voice AI Overlay modal */}
      <VoiceAiOverlay
        visible={voiceAiVisible}
        onClose={() => setVoiceAiVisible(false)}
      />

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scrollContent: {
    flexGrow: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.two,
    marginBottom: Spacing.three,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 18,
    paddingHorizontal: Spacing.three,
    height: 52,
    marginBottom: Spacing.four,
  },
  searchIcon: {
    marginRight: Spacing.two,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    height: '100%',
  },
  micIcon: {
    marginLeft: Spacing.two,
  },
  sectionContainer: {
    marginBottom: Spacing.four + Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: Spacing.two,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  seeMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  horizontalScrollList: {
    paddingRight: Spacing.four,
  },
  flashCard: {
    width: 260,
    height: 164,
    borderRadius: 24,
    padding: Spacing.three + 2,
    marginRight: Spacing.three,
    justifyContent: 'space-between',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }
    })
  },
  flashCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flashBadge: {
    backgroundColor: '#000000',
    paddingHorizontal: Spacing.two,
    paddingVertical: 5,
    borderRadius: 12,
  },
  flashBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  discountText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -1,
  },
  flashCardContent: {
    marginTop: -Spacing.one,
  },
  flashTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 2,
  },
  flashSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  flashButton: {
    backgroundColor: '#000000',
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.three + 4,
    marginTop: Spacing.two,
  },
  flashButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  businessCard: {
    width: 140,
    marginRight: Spacing.three,
  },
  businessImageContainer: {
    height: 140,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.two,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.04)',
      }
    })
  },
  businessImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '800',
  },
  businessTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  businessSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  recommendedCard: {
    width: 180,
    marginRight: Spacing.three,
  },
  recImageContainer: {
    height: 120,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.two,
  },
  recImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: Spacing.two,
    left: Spacing.two,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  recTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  recPrice: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 2,
  },
  pressed: {
    opacity: 0.8,
  },
});
