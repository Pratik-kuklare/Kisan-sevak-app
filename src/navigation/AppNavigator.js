import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants/colors';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// Import all screens
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import CropDiseaseScreen from '../screens/CropDiseaseScreen';
import MandiPricesScreen from '../screens/MandiPricesScreen';
import WeatherAdvisoryScreen from '../screens/WeatherAdvisoryScreen';
import AIChatScreen from '../screens/AIChatScreen';
import MandiDetailScreen from '../screens/MandiDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.surfaceWhite,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primaryGreen,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Roboto',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'होम',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ScanTab"
        component={CropDiseaseScreen}
        options={{
          tabBarLabel: 'स्कैन',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name={focused ? 'camera' : 'camera-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MandiTab"
        component={MandiPricesScreen}
        options={{
          tabBarLabel: 'मंडी',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name={focused ? 'store' : 'store-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'प्रोफाइल',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name={focused ? 'account' : 'account-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main stack navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="CropDisease"
          component={CropDiseaseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MandiPrices"
          component={MandiPricesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WeatherAdvisory"
          component={WeatherAdvisoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AIChat"
          component={AIChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MandiDetail"
          component={MandiDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;