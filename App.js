import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import { ExerciseProvider } from './src/context/ExerciseContext';
import HomeScreen from './src/screens/HomeScreen';
import ExerciseDetailScreen from './src/screens/ExerciseDetailScreen';
import AddExerciseScreen from './src/screens/AddExerciseScreen';
import CompletedScreen from './src/screens/CompletedScreen';
import QuotesScreen from './src/screens/QuotesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ label, emoji, focused }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: focused ? 22 : 20 }}>{emoji}</Text>
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e0e0e0',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarActiveTintColor: '#1565C0',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Exercises',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏋️" focused={focused} label="Exercises" />
          ),
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={{
          tabBarLabel: 'Completed',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="✅" focused={focused} label="Completed" />
          ),
        }}
      />
      <Tab.Screen
        name="Quotes"
        component={QuotesScreen}
        options={{
          tabBarLabel: 'Motivation',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="💫" focused={focused} label="Motivation" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ExerciseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={HomeTabs} />
          <Stack.Screen
            name="ExerciseDetail"
            component={ExerciseDetailScreen}
            options={{
              presentation: 'card',
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="AddExercise"
            component={AddExerciseScreen}
            options={{
              presentation: 'modal',
              gestureEnabled: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExerciseProvider>
  );
}
