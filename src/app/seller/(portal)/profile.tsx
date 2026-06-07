import React from 'react';
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
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authSession } from '@/constants/auth';

export default function BusinessProfileScreen() {
  const router = useRouter();
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  const handleLogout = () => {
    authSession.isLoggedIn = false;
    authSession.role = undefined;
    router.replace('/');
  };

  const options = [
    {
      id: 'settings',
      title: 'Configuración del Negocio',
      icon: { ios: 'gearshape', android: 'settings', web: 'settings' },
    },
    {
      id: 'stats',
      title: 'Estadísticas y Ventas',
      icon: { ios: 'chart.bar', android: 'bar_chart', web: 'bar_chart' },
    },
    {
      id: 'plan',
      title: 'Plan Pro',
      icon: { ios: 'crown', android: 'star', web: 'star' },
      badge: 'Activo',
    },
    {
      id: 'support',
      title: 'Soporte para Negocios',
      icon: { ios: 'questionmark.circle', android: 'help_outline', web: 'help_outline' },
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <ThemedText style={styles.headerTitle} type="subtitle">
              Perfil de Empresa
            </ThemedText>
          </View>
        </SafeAreaView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>

          {/* Business Logo & Name Header */}
          <View style={[
            styles.businessHeaderCard,
            { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF', borderColor: isDark ? '#2E3135' : '#E2E8F0' }
          ]}>
            {/* MM Circle Initials Logo */}
            <View style={[styles.avatarCircle, { backgroundColor: isDark ? '#FFFFFF' : '#000000' }]}>
              <ThemedText style={[styles.avatarText, { color: isDark ? '#000000' : '#FFFFFF' }]}>
                MM
              </ThemedText>
            </View>

            <View style={styles.headerTextContainer}>
              <ThemedText style={styles.businessName}>
                Mamma Mia
              </ThemedText>
              <ThemedText style={styles.businessEmail} themeColor="textSecondary">
                contacto@mammamia.com
              </ThemedText>
            </View>
          </View>

          {/* Settings Options List */}
          <View style={styles.optionsList}>
            {options.map((item) => (
              <Pressable 
                key={item.id}
                style={({ pressed }) => [
                  styles.optionRow,
                  { 
                    backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF', 
                    borderColor: isDark ? '#2E3135' : '#E2E8F0' 
                  },
                  pressed && styles.pressed
                ]}>
                
                {/* Left Icon wrapper */}
                <View style={[styles.optionIconBg, { backgroundColor: isDark ? '#2E3135' : '#F1F5F9' }]}>
                  <SymbolView
                    name={item.icon as any}
                    size={20}
                    tintColor={theme.text}
                  />
                </View>

                {/* Option Title */}
                <ThemedText style={styles.optionTitle}>
                  {item.title}
                </ThemedText>

                {/* Optional Gold Badge */}
                {item.badge ? (
                  <View style={styles.badgeContainer}>
                    <ThemedText style={styles.badgeText}>
                      {item.badge}
                    </ThemedText>
                  </View>
                ) : null}

                {/* Right Chevron */}
                <SymbolView
                  name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' } as any}
                  size={16}
                  tintColor={isDark ? '#636366' : '#A0AEC0'}
                  style={styles.chevronIcon}
                />

              </Pressable>
            ))}
          </View>

          {/* Logout Action Button */}
          <View style={styles.logoutContainer}>
            <Pressable 
              onPress={handleLogout}
              style={({ pressed }) => [
                styles.buttonLogout,
                { backgroundColor: isDark ? '#3D1313' : '#FEE2E2', borderColor: isDark ? '#7F1D1D' : '#FCA5A5' },
                pressed && styles.pressed
              ]}>
              <ThemedText style={styles.buttonLogoutText}>
                Cerrar Sesión de Negocio
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
    justifyContent: 'flex-start',
    marginTop: Spacing.one,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  businessHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 24,
    borderWidth: 1.5,
    marginBottom: Spacing.four,
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
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)',
      }
    })
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerTextContainer: {
    marginLeft: Spacing.three,
  },
  businessName: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  businessEmail: {
    fontSize: 14,
    fontWeight: '500',
  },
  optionsList: {
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  optionIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  optionTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  badgeContainer: {
    backgroundColor: '#FBBF24',
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: Spacing.one,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000000',
  },
  chevronIcon: {
    marginLeft: Spacing.one,
  },
  logoutContainer: {
    marginTop: Spacing.two,
    marginBottom: Spacing.four,
  },
  buttonLogout: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  buttonLogoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
  },
  pressed: {
    opacity: 0.85,
  },
});
