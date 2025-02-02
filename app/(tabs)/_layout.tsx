import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useUser } from '@/context/UserContext';
import { LogoutButton } from '@/components/LogoutButton';

export default function TabLayout() {
  const { userRole } = useUser();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => <LogoutButton />,
        tabBarActiveTintColor: Colors.primary,
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {userRole === 'farmer' ? (
        <>
          <Tabs.Screen
            name="farmer"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color }) => <IconSymbol name="house" color={color} />,
            }}
          />
          <Tabs.Screen
            name="add-product"
            options={{
              title: 'Add Product',
              tabBarIcon: ({ color }) => <IconSymbol name="plus.circle" color={color} />,
            }}
          />
          <Tabs.Screen
            name="storage"
            options={{
              title: 'Storage',
              tabBarIcon: ({ color }) => <IconSymbol name="archivebox" color={color} />,
            }}
          />
          <Tabs.Screen
            name="add-volunteer"
            options={{
              title: 'Volunteer',
              tabBarIcon: ({ color }) => <IconSymbol name="person.badge.plus" color={color} />,
            }}
          />
          <Tabs.Screen
            name="orders"
            options={{
              title: 'Orders',
              tabBarIcon: ({ color }) => <IconSymbol name="bag" color={color} />,
            }}
          />
        </>
      ) : (
        <>
        <Tabs.Screen
            name="add-product"
            options={{
              title: 'Add Product',
              tabBarIcon: ({ color }) => <IconSymbol name="plus.circle" color={color} />,
            }}
          />
          <Tabs.Screen
            name="shop"
            options={{
              title: 'Shop',
              tabBarIcon: ({ color }) => <IconSymbol name="cart" color={color} />,
            }}
          />
          <Tabs.Screen
            name="orders"
            options={{
              title: 'Orders',
              tabBarIcon: ({ color }) => <IconSymbol name="bag" color={color} />,
            }}
          />
        </>
      )}
      <Tabs.Screen
        name="payment"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
