import React from 'react';
import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useColorScheme, Platform } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export default function SellerPortalLayout() {
  const theme = useTheme();
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: isDark ? '#8E8E93' : '#A0AEC0',
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: isDark ? '#2E3135' : '#E2E8F0',
          borderTopWidth: 1.5,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="catalog"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'square.grid.2x2', android: 'grid_on', web: 'grid_on' } as any}
              size={22}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="preview"
        options={{
          title: 'Vista Previa',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'eye', android: 'visibility', web: 'visibility' } as any}
              size={22}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'storefront', android: 'storefront', web: 'storefront' } as any}
              size={22}
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
