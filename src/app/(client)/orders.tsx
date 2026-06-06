import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Platform,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function OrdersScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

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
        
        {/* Title */}
        <ThemedText type="subtitle" style={styles.pageTitle}>
          Mis Pedidos
        </ThemedText>

        {/* Segmented Tab Bar */}
        <View style={[
          styles.segmentedControl,
          { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }
        ]}>
          <Pressable
            onPress={() => setActiveTab('active')}
            style={[
              styles.segmentTab,
              activeTab === 'active' && [
                styles.segmentTabSelected,
                { backgroundColor: isDark ? '#2C2C2E' : '#FFFFFF' }
              ]
            ]}>
            <ThemedText
              type="smallBold"
              style={{
                color: activeTab === 'active' ? theme.text : (isDark ? '#8E8E93' : '#60646C'),
              }}>
              Activos
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('history')}
            style={[
              styles.segmentTab,
              activeTab === 'history' && [
                styles.segmentTabSelected,
                { backgroundColor: isDark ? '#2C2C2E' : '#FFFFFF' }
              ]
            ]}>
            <ThemedText
              type="smallBold"
              style={{
                color: activeTab === 'history' ? theme.text : (isDark ? '#8E8E93' : '#60646C'),
              }}>
              Historial
            </ThemedText>
          </Pressable>
        </View>

        {/* Tab Content */}
        {activeTab === 'active' ? (
          /* Active Orders List */
          <View style={styles.ordersList}>
            <View style={[
              styles.orderCard,
              { 
                borderColor: isDark ? '#2E3135' : '#E2E8F0',
                backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' 
              }
            ]}>
              
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  {/* Shop box icon */}
                  <View style={[styles.shopIconContainer, { backgroundColor: isDark ? '#FFFFFF' : '#000000' }]}>
                    <SymbolView
                      name={{ ios: 'shippingbox.fill', android: 'local_shipping', web: 'local_shipping' }}
                      size={20}
                      tintColor={isDark ? '#000000' : '#FFFFFF'}
                    />
                  </View>
                  <View>
                    <ThemedText style={styles.shopTitle}>
                      Tacos El Paisa
                    </ThemedText>
                    <View style={styles.deliveryTimeRow}>
                      <SymbolView
                        name={{ ios: 'clock.fill', android: 'schedule', web: 'schedule' }}
                        size={12}
                        tintColor={isDark ? '#8E8E93' : '#60646C'}
                        style={{ marginRight: 4 }}
                      />
                      <ThemedText type="small" themeColor="textSecondary" style={styles.deliveryTimeText}>
                        Llega en 15 min
                      </ThemedText>
                    </View>
                  </View>
                </View>

                {/* Status Badge */}
                <View style={[styles.statusBadge, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' }]}>
                  <ThemedText style={styles.statusBadgeText}>
                    En camino
                  </ThemedText>
                </View>
              </View>

              {/* Items Breakdown list */}
              <View style={[styles.divider, { backgroundColor: isDark ? '#2E3135' : '#E2E8F0' }]} />
              
              <View style={styles.itemsContainer}>
                <View style={styles.itemRow}>
                  <ThemedText style={styles.itemText}>
                    2x Orden al Pastor
                  </ThemedText>
                  <ThemedText style={styles.itemPrice}>
                    $120.00
                  </ThemedText>
                </View>
                <View style={styles.itemRow}>
                  <ThemedText style={styles.itemText}>
                    1x Coca Cola
                  </ThemedText>
                  <ThemedText style={styles.itemPrice}>
                    $35.00
                  </ThemedText>
                </View>
              </View>

              {/* Action track button */}
              <Pressable style={({ pressed }) => [
                styles.trackButton,
                { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
                pressed && styles.pressed
              ]}>
                <ThemedText style={styles.trackButtonText}>
                  Rastrear Pedido
                </ThemedText>
                <SymbolView
                  name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                  size={14}
                  tintColor={theme.text}
                />
              </Pressable>

            </View>
          </View>
        ) : (
          /* History Orders List */
          <View style={styles.ordersList}>
            {/* History Item 1 */}
            <View style={[
              styles.orderCard,
              { 
                borderColor: isDark ? '#2E3135' : '#E2E8F0',
                backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
                opacity: 0.85
              }
            ]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <View style={[styles.shopIconContainer, { backgroundColor: isDark ? '#48484A' : '#7F7F7F' }]}>
                    <SymbolView
                      name={{ ios: 'storefront.fill', android: 'store', web: 'store' }}
                      size={20}
                      tintColor="#FFFFFF"
                    />
                  </View>
                  <View>
                    <ThemedText style={styles.shopTitle}>
                      Café Andrade
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      Ayer • 3 de Junio
                    </ThemedText>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: isDark ? '#253E2A' : '#EAF6EC' }]}>
                  <ThemedText style={[styles.statusBadgeText, { color: isDark ? '#8ED99C' : '#2A7E3B' }]}>
                    Entregado
                  </ThemedText>
                </View>
              </View>
              <View style={[styles.divider, { backgroundColor: isDark ? '#2E3135' : '#E2E8F0' }]} />
              <View style={styles.itemsContainer}>
                <View style={styles.itemRow}>
                  <ThemedText style={styles.itemText}>
                    1x Café Americano + Dona
                  </ThemedText>
                  <ThemedText style={styles.itemPrice}>
                    $65.00
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* History Item 2 */}
            <View style={[
              styles.orderCard,
              { 
                borderColor: isDark ? '#2E3135' : '#E2E8F0',
                backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
                opacity: 0.85
              }
            ]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <View style={[styles.shopIconContainer, { backgroundColor: isDark ? '#48484A' : '#7F7F7F' }]}>
                    <SymbolView
                      name={{ ios: 'storefront.fill', android: 'store', web: 'store' }}
                      size={20}
                      tintColor="#FFFFFF"
                    />
                  </View>
                  <View>
                    <ThemedText style={styles.shopTitle}>
                      Panadería Dulce
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      29 de Mayo
                    </ThemedText>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: isDark ? '#253E2A' : '#EAF6EC' }]}>
                  <ThemedText style={[styles.statusBadgeText, { color: isDark ? '#8ED99C' : '#2A7E3B' }]}>
                    Entregado
                  </ThemedText>
                </View>
              </View>
              <View style={[styles.divider, { backgroundColor: isDark ? '#2E3135' : '#E2E8F0' }]} />
              <View style={styles.itemsContainer}>
                <View style={styles.itemRow}>
                  <ThemedText style={styles.itemText}>
                    1x Paquete Pan de Dulce (x6)
                  </ThemedText>
                  <ThemedText style={styles.itemPrice}>
                    $90.00
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
        )}

      </ScrollView>
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
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    letterSpacing: -0.5,
    marginTop: Spacing.two,
    marginBottom: Spacing.four,
  },
  segmentedControl: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 14,
    padding: 3,
    marginBottom: Spacing.five,
  },
  segmentTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
  },
  segmentTabSelected: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
      }
    })
  },
  ordersList: {
    gap: Spacing.three,
  },
  orderCard: {
    borderWidth: 1.5,
    borderRadius: 24,
    padding: Spacing.four,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
      }
    })
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  shopIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  deliveryTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  deliveryTimeText: {
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    marginVertical: Spacing.three + 2,
  },
  itemsContainer: {
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
  },
  trackButton: {
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    marginTop: Spacing.two,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.8,
  },
});
