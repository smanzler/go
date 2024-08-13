import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';
import { useTheme } from '@/src/providers/ThemeProvider';
import { useElevation } from '@/src/constants/Themes';

export default function TabLayout() {
  const { theme }  = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.text,
        tabBarStyle: [{ borderTopWidth: 0 }, useElevation(10)],
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
