import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { initDatabase } from './database';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import LogsScreen from './screens/LogsScreen';
import AddLogScreen from './screens/AddLogScreen'; // Your existing screen
import EducationScreen from './screens/EducationScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Logs tab (to include your existing AddLogScreen)
function LogsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="LogsList" 
        component={LogsScreen}
        options={{ headerTitle: 'Waste Logs' }}
      />
      <Stack.Screen 
        name="AddLog" 
        component={AddLogScreen}
        options={{ headerTitle: 'Add Waste Log' }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#666',
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          headerTitle: 'WasteLogger',
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="camera" size={size} color={color} />
          ),
          headerTitle: 'Scan Item',
        }}
      />
      <Tab.Screen
        name="Logs"
        component={LogsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" size={size} color={color} />
          ),
          headerShown: false, // Stack navigator handles headers
        }}
      />
      <Tab.Screen
        name="Learn"
        component={EducationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" size={size} color={color} />
          ),
          headerTitle: 'Recycling Guide',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    // Initialize your existing database
    initDatabase().catch(console.error);
  }, []);

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}