import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  Platform,
  ScrollView,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';

const FILTERS = ['Todo', 'Antojos', 'Relajación', 'Noche', 'Servicios'];

interface CardData {
  id: string;
  title: string;
  category: string;
  rating: string;
  image: string;
  description: string;
  tags: string[];
}

const CARDS_DATA: CardData[] = [
  {
    id: '1',
    title: 'Mamma Mia Pizza',
    category: 'Pizza Artesanal',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&fit=crop',
    description: 'La mejor pizza a la leña de Durango, con ingredientes frescos y masa madre reposada por 48 horas.',
    tags: ['#Leña', '#Parejas', '#Vino'],
  },
  {
    id: '2',
    title: 'Tacos El Paisa',
    category: 'Tacos al Pastor',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&fit=crop',
    description: 'Tradicionales tacos al pastor en Durango con doble tortilla, piña, cilantro y salsas artesanales picantes.',
    tags: ['#Pastor', '#2x1', '#Picante'],
  },
  {
    id: '3',
    title: 'Café de la Fundición',
    category: 'Café de Especialidad',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&fit=crop',
    description: 'Granos de café seleccionados de Chiapas, preparados por baristas certificados en un ambiente histórico.',
    tags: ['#Baristas', '#Postres', '#WiFi'],
  },
];

export default function DiscoverScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const [selectedFilter, setSelectedFilter] = useState('Antojos');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation value for sliding cards left/right
  const [slideAnim] = useState(() => new Animated.Value(0));
  const rotateAnim = slideAnim.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-10deg', '0deg', '10deg'],
  });
  const opacityAnim = slideAnim.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0, 1, 0],
  });

  const activeCard = CARDS_DATA[currentIndex];

  const handleOpenMap = () => {
    if (!activeCard) return;
    const latitude = 24.0277;
    const longitude = -104.6538;
    const query = encodeURIComponent(`${activeCard.title}, Durango, Mexico`);

    const url = Platform.select({
      ios: `maps:0,0?q=${query}&ll=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${query})`,
      default: `https://www.google.com/maps/search/?api=1&query=${query}`
    });

    Linking.openURL(url).catch((err) => {
      console.error("Failed to open map URL:", err);
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
    });
  };

  const triggerSwipeAnimation = (direction: 'left' | 'right', callback: () => void) => {
    Animated.timing(slideAnim, {
      toValue: direction === 'left' ? -400 : 400,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      callback();
      // Reset position instantly
      slideAnim.setValue(0);
    });
  };

  const handleDislike = () => {
    if (currentIndex < CARDS_DATA.length) {
      triggerSwipeAnimation('left', () => {
        setCurrentIndex((prev) => prev + 1);
      });
    }
  };

  const handleLike = () => {
    if (currentIndex < CARDS_DATA.length) {
      triggerSwipeAnimation('right', () => {
        setCurrentIndex((prev) => prev + 1);
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    slideAnim.setValue(0);
  };

  const insets = {
    ...safeAreaInsets,
    top: safeAreaInsets.top,
  };

  return (
    <View style={[styles.outerContainer, { backgroundColor: '#000000' }]}>
      <View style={[styles.container, { paddingTop: insets.top + Spacing.two }]}>

        {/* Header Discover */}
        <View style={styles.headerRow}>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.closeButton}>
              <SymbolView
                name={{ ios: 'xmark', android: 'close', web: 'close' }}
                size={18}
                tintColor="#FFFFFF"
              />
            </View>
          </Pressable>
          <ThemedText style={styles.headerTitle}>
            Descubrir
          </ThemedText>
          <View style={styles.headerPlaceholder} />
        </View>

        {/* Categories Bar */}
        <View style={styles.filtersWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}>
            {FILTERS.map((filter) => {
              const isSelected = selectedFilter === filter;
              return (
                <Pressable
                  key={filter}
                  onPress={() => setSelectedFilter(filter)}
                  style={({ pressed }) => [
                    styles.filterPill,
                    isSelected ? styles.filterPillSelected : styles.filterPillUnselected,
                    pressed && styles.pressed,
                  ]}>
                  <ThemedText
                    type="smallBold"
                    style={{
                      color: isSelected ? '#000000' : '#FFFFFF',
                    }}>
                    {filter}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Card Deck Area */}
        <View style={styles.deckContainer}>
          {currentIndex < CARDS_DATA.length ? (
            <Animated.View
              style={[
                styles.swipeCard,
                {
                  transform: [
                    { translateX: slideAnim },
                    { rotate: rotateAnim }
                  ],
                  opacity: opacityAnim,
                }
              ]}>

              {/* Photo */}
              <View style={styles.cardImageWrapper}>
                <Image
                  source={{ uri: activeCard.image }}
                  style={styles.cardImage}
                />

                {/* Location button */}
                <Pressable 
                  onPress={handleOpenMap}
                  style={({ pressed }) => [
                    styles.locationButton,
                    pressed && styles.pressed
                  ]}>
                  <ThemedText style={styles.locationButtonText}>
                    Ver ubicación
                  </ThemedText>
                </Pressable>

                {/* Order button */}
                <Pressable style={({ pressed }) => [
                  styles.orderButton,
                  pressed && styles.pressed
                ]}>
                  <ThemedText style={styles.orderButtonText}>
                    Agendar visita
                  </ThemedText>
                </Pressable>
              </View>

              {/* Text content details */}
              <View style={styles.cardDetails}>
                <View style={styles.ratingRow}>
                  <SymbolView
                    name={{ ios: 'star.fill', android: 'star', web: 'star' }}
                    size={14}
                    tintColor="#FFCC00"
                    style={{ marginRight: 4 }}
                  />
                  <ThemedText style={styles.ratingText}>
                    {activeCard.rating} <ThemedText type="small" style={styles.categoryDivider}>• {activeCard.category}</ThemedText>
                  </ThemedText>
                </View>

                <ThemedText style={styles.cardTitle}>
                  {activeCard.title}
                </ThemedText>

                <ThemedText style={styles.cardDescription}>
                  {activeCard.description}
                </ThemedText>

                {/* Hash tags */}
                <View style={styles.tagsContainer}>
                  {activeCard.tags.map((tag) => (
                    <View key={tag} style={styles.tagBadge}>
                      <ThemedText style={styles.tagText}>{tag}</ThemedText>
                    </View>
                  ))}
                </View>
              </View>

            </Animated.View>
          ) : (
            /* Exhausted Deck State */
            <View style={styles.exhaustedCard}>
              <SymbolView
                name={{ ios: 'sparkles', android: 'explore', web: 'explore' }}
                size={48}
                tintColor="#FFCC00"
                style={{ marginBottom: Spacing.three }}
              />
              <ThemedText style={styles.exhaustedTitle}>
                ¡Has visto todo!
              </ThemedText>
              <ThemedText style={styles.exhaustedSubtitle}>
                No quedan más recomendaciones cercanas por el momento.
              </ThemedText>
              <Pressable
                onPress={handleRestart}
                style={({ pressed }) => [
                  styles.restartButton,
                  pressed && styles.pressed
                ]}>
                <ThemedText style={styles.restartButtonText}>
                  Volver a cargar
                </ThemedText>
              </Pressable>
            </View>
          )}
        </View>

        {/* Bottom Swipe Controls */}
        {currentIndex < CARDS_DATA.length && (
          <View style={styles.actionsRow}>
            {/* Dislike */}
            <Pressable
              onPress={handleDislike}
              style={({ pressed }) => [
                styles.circleActionButton,
                styles.dislikeButton,
                pressed && styles.pressed
              ]}>
              <SymbolView
                name={{ ios: 'xmark', android: 'close', web: 'close' }}
                size={22}
                tintColor="#FFFFFF"
              />
            </Pressable>

            {/* Info */}
            <Pressable
              style={({ pressed }) => [
                styles.circleActionButton,
                styles.infoButton,
                pressed && styles.pressed
              ]}>
              <SymbolView
                name={{ ios: 'info', android: 'info', web: 'info' }}
                size={18}
                tintColor="#FFFFFF"
              />
            </Pressable>

            {/* Like */}
            <Pressable
              onPress={handleLike}
              style={({ pressed }) => [
                styles.circleActionButton,
                styles.likeButton,
                pressed && styles.pressed
              ]}>
              <SymbolView
                name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }}
                size={22}
                tintColor="#000000"
              />
            </Pressable>
          </View>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
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
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  headerPlaceholder: {
    width: 36,
  },
  filtersWrapper: {
    height: 52,
    justifyContent: 'center',
    marginVertical: Spacing.two,
  },
  filtersScroll: {
    gap: Spacing.two,
    alignItems: 'center',
  },
  filterPill: {
    borderRadius: 20,
    paddingHorizontal: Spacing.four,
    paddingVertical: 10,
  },
  filterPillSelected: {
    backgroundColor: '#FFFFFF',
  },
  filterPillUnselected: {
    backgroundColor: '#1C1C1E',
  },
  deckContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.three,
  },
  swipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    width: '100%',
    height: '100%',
    maxHeight: 520,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }
    })
  },
  cardImageWrapper: {
    height: '60%',
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  orderButton: {
    position: 'absolute',
    bottom: Spacing.three,
    right: Spacing.three,
    backgroundColor: '#000000',
    paddingHorizontal: Spacing.four,
    paddingVertical: 12,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }
    })
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  locationButton: {
    position: 'absolute',
    bottom: Spacing.three,
    left: Spacing.three,
    backgroundColor: '#000000',
    paddingHorizontal: Spacing.four,
    paddingVertical: 12,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }
    })
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  cardDetails: {
    padding: Spacing.four,
    flex: 1,
    justifyContent: 'space-between',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },
  categoryDivider: {
    color: '#8E8E93',
    fontWeight: '500',
  },
  cardTitle: {
    color: '#000000',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginVertical: Spacing.one,
  },
  cardDescription: {
    color: '#636366',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: Spacing.two,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  tagBadge: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: Spacing.three,
    paddingVertical: 6,
    borderRadius: 10,
  },
  tagText: {
    color: '#3A3A3C',
    fontSize: 12,
    fontWeight: '600',
  },
  exhaustedCard: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.five,
    width: '100%',
    height: '100%',
    borderRadius: 32,
    backgroundColor: '#1C1C1E',
  },
  exhaustedTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: Spacing.two,
  },
  exhaustedSubtitle: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.four,
  },
  restartButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.five,
    paddingVertical: 14,
    borderRadius: 16,
  },
  restartButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.four,
    marginBottom: Spacing.four,
  },
  circleActionButton: {
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
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      }
    })
  },
  dislikeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#48484A',
    backgroundColor: 'transparent',
  },
  infoButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#48484A',
    backgroundColor: 'transparent',
  },
  likeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});
