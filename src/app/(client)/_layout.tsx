import React from 'react';
import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useColorScheme, Platform } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export default function ClientLayout() {
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
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'house', android: 'home', web: 'home' }}
              size={22}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Descubrir',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'sparkles', android: 'explore', web: 'explore' }}
              size={22}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'clipboard', android: 'assignment', web: 'assignment' }}
              size={22}
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
