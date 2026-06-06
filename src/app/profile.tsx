import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
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
import { authSession } from '@/constants/auth';

interface MenuItemProps {
  iconName: { ios: string; android: string; web: string };
  title: string;
  value?: string;
  onPress?: () => void;
  isDark: boolean;
  themeColor: string;
}

function MenuItem({ iconName, title, value, onPress, isDark, themeColor }: MenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        { 
          borderColor: isDark ? '#2E3135' : '#F2F2F7',
          backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' 
        },
        pressed && styles.pressed
      ]}>
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIconContainer, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' }]}>
          <SymbolView
            name={iconName}
            size={18}
            tintColor={themeColor}
          />
        </View>
        <ThemedText style={styles.menuItemTitle}>
          {title}
        </ThemedText>
      </View>
      <View style={styles.menuItemRight}>
        {value && (
          <ThemedText style={styles.menuItemValue}>
            {value}
          </ThemedText>
        )}
        <SymbolView
          name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
          size={14}
          tintColor={isDark ? '#8E8E93' : '#A0AEC0'}
        />
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const handleSignOut = () => {
    authSession.isLoggedIn = false;
    router.replace('/');
  };

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
        
        {/* Header navigation bar */}
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
          <ThemedText style={styles.headerTitle}>
            Perfil
          </ThemedText>
          <View style={styles.backButtonPlaceholder} />
        </View>

        {/* User Card */}
        <View style={[
          styles.userCard,
          { 
            borderColor: isDark ? '#2E3135' : '#E2E8F0',
            backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' 
          }
        ]}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <ThemedText style={styles.userName}>
              Ana García
            </ThemedText>
            <ThemedText style={styles.userEmail} themeColor="textSecondary">
              ana@ejemplo.com
            </ThemedText>
          </View>
        </View>

        {/* Menu Items List */}
        <View style={styles.menuContainer}>
          {/* Configuración de cuenta */}
          <MenuItem
            iconName={{ ios: 'gearshape.fill', android: 'settings', web: 'settings' }}
            title="Configuración de cuenta"
            isDark={isDark}
            themeColor={theme.text}
            onPress={() => {}}
          />

          {/* Mi Cashback */}
          <MenuItem
            iconName={{ ios: 'wallet.pass.fill', android: 'wallet', web: 'wallet' }}
            title="Mi Cashback"
            value="$150.50"
            isDark={isDark}
            themeColor={theme.text}
            onPress={() => {}}
          />

          {/* Invitar a un amigo */}
          <MenuItem
            iconName={{ ios: 'qrcode', android: 'qr_code', web: 'qr_code' }}
            title="Invitar a un amigo"
            isDark={isDark}
            themeColor={theme.text}
            onPress={() => {}}
          />

          {/* Ayuda y Soporte */}
          <MenuItem
            iconName={{ ios: 'questionmark.circle.fill', android: 'help', web: 'help' }}
            title="Ayuda y Soporte"
            isDark={isDark}
            themeColor={theme.text}
            onPress={() => {}}
          />
        </View>

        {/* Cerrar Sesión Button */}
        <Pressable
          onPress={handleSignOut}
          style={({ pressed }) => [
            styles.signOutButton,
            { backgroundColor: isDark ? '#3D1B1B' : '#FFF0F0' },
            pressed && styles.pressed
          ]}>
          <ThemedText style={styles.signOutText}>
            Cerrar Sesión
          </ThemedText>
        </Pressable>

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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    marginBottom: Spacing.four,
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
  backButtonPlaceholder: {
    width: 40,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 28,
    padding: Spacing.four,
    marginBottom: Spacing.four,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
      }
    })
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: Spacing.three + 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  menuContainer: {
    marginBottom: Spacing.three,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: Spacing.three + 4,
    marginBottom: Spacing.two + 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
        cursor: 'pointer',
      }
    })
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  menuItemValue: {
    fontSize: 15,
    fontWeight: '800',
  },
  signOutButton: {
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.four,
    marginBottom: Spacing.six,
  },
  signOutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
});
