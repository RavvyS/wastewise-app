// src/navigation/AppNavigator.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { initDatabase } from '../utils/database';

// Import your existing screens
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import EducationScreen from '../screens/EducationScreen';
import LogsScreen from '../screens/LogsScreen';
import AddLogScreen from '../screens/AddLogScreen';
import LogsListScreen from '../screens/LogsListScreen';

// Simple placeholder screens for missing ones
const WasteKnowledgeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>🧠 Waste Knowledge Hub</Text>
    <TouchableOpacity 
      style={{ backgroundColor: '#4CAF50', padding: 15, borderRadius: 10 }}
      onPress={() => navigation.navigate('Education')}
    >
      <Text style={{ color: 'white', fontSize: 16 }}>View Recycling Guide</Text>
    </TouchableOpacity>
  </View>
);

const RecyclingCentersScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>📍 Recycling Centers</Text>
    <Text style={{ textAlign: 'center', color: '#666' }}>
      Feature coming soon!{'\n\n'}
      This will show nearby recycling centers and their accepted materials.
    </Text>
  </View>
);

const UserProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>👤 User Profile</Text>
    <Text style={{ textAlign: 'center', color: '#666' }}>
      Profile management coming soon!
    </Text>
  </View>
);

const LearningHubScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>📚 Learning Hub</Text>
    <Text style={{ textAlign: 'center', color: '#666' }}>
      Interactive learning features coming soon!
    </Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigators for each main tab
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen}
        options={{ headerTitle: 'WasteLogger' }}
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen}
        options={{ headerTitle: 'Scan Item' }}
      />
    </Stack.Navigator>
  );
}

function KnowledgeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="KnowledgeMain" 
        component={WasteKnowledgeScreen}
        options={{ headerTitle: 'Waste Knowledge' }}
      />
      <Stack.Screen 
        name="Education" 
        component={EducationScreen}
        options={{ headerTitle: 'Recycling Guide' }}
      />
    </Stack.Navigator>
  );
}

function LearningStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="LearningMain" 
        component={LearningHubScreen}
        options={{ headerTitle: 'Learning Hub' }}
      />
    </Stack.Navigator>
  );
}

function LogsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="LogsList" 
        component={LogsListScreen}
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

function LocationsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="LocationsMain" 
        component={RecyclingCentersScreen}
        options={{ headerTitle: 'Recycling Centers' }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="ProfileMain" 
        component={UserProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Knowledge"
        component={KnowledgeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-books" size={size} color={color} />
          ),
          tabBarLabel: 'Knowledge',
        }}
      />
      <Tab.Screen
        name="Learning"
        component={LearningStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" size={size} color={color} />
          ),
          tabBarLabel: 'Learning',
        }}
      />
      <Tab.Screen
        name="Logs"
        component={LogsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" size={size} color={color} />
          ),
          tabBarLabel: 'Logs',
        }}
      />
      <Tab.Screen
        name="Locations"
        component={LocationsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="place" size={size} color={color} />
          ),
          tabBarLabel: 'Locations',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  useEffect(() => {
    initDatabase().catch(error => {
      console.error('Database initialization failed:', error);
    });
  }, []);

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}