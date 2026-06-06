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

export default function CatalogScreen() {
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const products = [
    {
      id: '1',
      name: 'Pizza Margarita',
      price: '$120.00',
      status: 'Activo',
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=120&h=120&fit=crop',
    },
    {
      id: '2',
      name: 'Pizza Pepperoni',
      price: '$140.00',
      status: 'Activo',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=120&h=120&fit=crop',
    },
    {
      id: '3',
      name: 'Refresco Familiar',
      price: '$45.00',
      status: 'Agotado',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=120&h=120&fit=crop',
    },
  ];

  const handleContinue = () => {
    router.push('/seller/preview' as any);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          {/* Header Row */}
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
            <ThemedText style={styles.headerTitle} type="subtitle">
              Catálogo
            </ThemedText>
            <View style={{ width: 40 }} /> {/* spacer */}
          </View>
        </SafeAreaView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          
          {/* Top Quick Actions Tab Buttons */}
          <View style={styles.tabButtonsRow}>
            {/* + Producto */}
            <Pressable style={[styles.tabButton, styles.tabProductButton]}>
              <SymbolView
                name={{ ios: 'plus', android: 'add', web: 'add' } as any}
                size={16}
                tintColor="#FFFFFF"
                style={styles.tabIcon}
              />
              <ThemedText style={styles.tabProductText}>Producto</ThemedText>
            </Pressable>

            {/* Promoción */}
            <Pressable style={[
              styles.tabButton, 
              styles.tabPromoButton, 
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF', borderColor: isDark ? '#2E3135' : '#E2E8F0' }
            ]}>
              <SymbolView
                name={{ ios: 'tag', android: 'local_offer', web: 'local_offer' } as any}
                size={16}
                tintColor={theme.text}
                style={styles.tabIcon}
              />
              <ThemedText style={[styles.tabText, { color: theme.text }]}>Promoción</ThemedText>
            </Pressable>

            {/* Horas Muertas */}
            <Pressable style={[
              styles.tabButton, 
              styles.tabHoursButton, 
              { backgroundColor: isDark ? '#3D3016' : '#FEF3C7', borderColor: isDark ? '#6E521D' : '#FDE68A' }
            ]}>
              <SymbolView
                name={{ ios: 'clock', android: 'schedule', web: 'schedule' } as any}
                size={16}
                tintColor={isDark ? '#FBBF24' : '#D97706'}
                style={styles.tabIcon}
              />
              <ThemedText style={[styles.tabText, { color: isDark ? '#FBBF24' : '#D97706', fontWeight: '700' }]}>
                Horas Muertas
              </ThemedText>
            </Pressable>
          </View>

          {/* Section Title */}
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>
              Tus Productos
            </ThemedText>
          </View>

          {/* Product Items List */}
          <View style={styles.productListContainer}>
            {products.map((item) => (
              <View 
                key={item.id}
                style={[
                  styles.productCard,
                  { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF', borderColor: isDark ? '#2E3135' : '#E2E8F0' }
                ]}>
                
                {/* Product Image */}
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />

                {/* Info Column */}
                <View style={styles.productInfoContainer}>
                  <ThemedText style={styles.productName}>
                    {item.name}
                  </ThemedText>
                  
                  <ThemedText style={styles.productPrice} themeColor="textSecondary">
                    {item.price}
                  </ThemedText>

                  {/* Status row */}
                  <View style={styles.statusRow}>
                    <View style={[
                      styles.statusDot, 
                      { backgroundColor: item.status === 'Activo' ? '#10B981' : '#94A3B8' }
                    ]} />
                    <ThemedText style={styles.statusText} themeColor="textSecondary">
                      {item.status}
                    </ThemedText>
                  </View>
                </View>

                {/* Edit Button */}
                <Pressable style={styles.editButton}>
                  <SymbolView
                    name={{ ios: 'pencil', android: 'edit', web: 'edit' } as any}
                    size={20}
                    tintColor={isDark ? '#8E8E93' : '#64748B'}
                  />
                </Pressable>

              </View>
            ))}
          </View>

          {/* Continue Action Button */}
          <View style={styles.footerContainer}>
            <Pressable 
              onPress={handleContinue}
              style={({ pressed }) => [
                styles.buttonPrimary,
                { backgroundColor: theme.text },
                pressed && styles.buttonPressed
              ]}>
              <ThemedText style={[styles.buttonPrimaryText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                Continuar
              </ThemedText>
            </Pressable>
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
  safeArea: {
    paddingHorizontal: Spacing.four,
  },
  headerRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  tabButtonsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.four,
    flexWrap: 'wrap',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    borderWidth: 1.5,
  },
  tabIcon: {
    marginRight: Spacing.one,
  },
  tabProductButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  tabProductText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  tabPromoButton: {
    borderColor: '#E2E8F0',
  },
  tabHoursButton: {
    // colors are set inline dynamically
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: Spacing.two,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  productListContainer: {
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.two,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 14,
  },
  productInfoContainer: {
    flex: 1,
    marginLeft: Spacing.three,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  editButton: {
    padding: Spacing.two,
  },
  footerContainer: {
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
