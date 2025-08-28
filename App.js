// App.js - Main Application Entry Point
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';

// Import screens
import HomeScreen from './screens/home/HomeScreen';
import WasteLogsScreen from './screens/logs/WasteLogsScreen';
import KnowledgeHubScreen from './screens/knowledge/KnowledgeHubScreen';
import LocationsScreen from './screens/locations/LocationsScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import CameraScreen from './screens/camera/CameraScreen';
import AddLogScreen from './screens/logs/AddLogScreen';

// Import utilities
import { initDatabase } from './utils/database';
import { colors } from './styles/globalStyles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Logs (includes AddLog screen)
function LogsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="WasteLogsList" 
        component={WasteLogsScreen}
        options={{ 
          headerTitle: '📊 Waste Logs',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
      <Stack.Screen 
        name="AddLog" 
        component={AddLogScreen}
        options={{ 
          headerTitle: '📝 Add Waste Log',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
    </Stack.Navigator>
  );
}

// Stack navigator for Camera (includes result screens)
function CameraStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CameraMain" 
        component={CameraScreen}
        options={{ 
          headerTitle: '📷 Scan Item',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Knowledge':
              iconName = 'book';
              break;
            case 'Camera':
              iconName = 'camera-alt';
              break;
            case 'Logs':
              iconName = 'insert-chart';
              break;
            case 'Locations':
              iconName = 'place';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }
          
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#666',
        headerStyle: { 
          backgroundColor: colors.primary,
          elevation: 4,
          shadowOpacity: 0.3,
        },
        headerTintColor: 'white',
        headerTitleStyle: { 
          fontWeight: 'bold',
          fontSize: 18,
        },
        tabBarStyle: {
          elevation: 8,
          shadowOpacity: 0.1,
          backgroundColor: 'white',
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          headerTitle: '♻️ WasteLogger',
          tabBarLabel: 'Home',
        }}
      />
      
      <Tab.Screen 
        name="Knowledge" 
        component={KnowledgeHubScreen}
        options={{ 
          headerTitle: '📚 Knowledge Hub',
          tabBarLabel: 'Knowledge',
        }}
      />
      
      <Tab.Screen 
        name="Camera" 
        component={CameraStack}
        options={{ 
          headerShown: false,
          tabBarLabel: 'Scan',
        }}
      />
      
      <Tab.Screen 
        name="Logs" 
        component={LogsStack}
        options={{ 
          headerShown: false,
          tabBarLabel: 'Logs',
        }}
      />
      
      <Tab.Screen 
        name="Locations" 
        component={LocationsScreen}
        options={{ 
          headerTitle: '📍 Recycling Centers',
          tabBarLabel: 'Locations',
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          headerTitle: '👤 Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize database and app setup
    const setupApp = async () => {
      try {
        // Initialize SQLite database
        await initDatabase();
        
        // Add any other initialization here
        // (e.g., load user preferences, check permissions)
        
        // Simulate loading time for splash screen effect
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsLoading(false);
      }
    };

    setupApp();
  }, []);

  // Loading screen while app initializes
  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
      }}>
        <View style={{ alignItems: 'center' }}>
          <MaterialIcons name="recycling" size={80} color="white" />
          <View style={{ 
            fontSize: 32, 
            fontWeight: 'bold', 
            color: 'white', 
            marginTop: 20,
            textAlign: 'center',
          }}>
            WasteLogger
          </View>
          <View style={{ 
            fontSize: 16, 
            color: 'rgba(255,255,255,0.8)', 
            marginTop: 8,
            textAlign: 'center',
          }}>
            Smart Waste Disposal Tracking
          </View>
          <ActivityIndicator 
            size="large" 
            color="white" 
            style={{ marginTop: 30 }} 
          />
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={colors.primary} />
      <MainTabs />
    </NavigationContainer>
  );
}