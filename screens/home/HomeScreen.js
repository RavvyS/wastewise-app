// screens/home/HomeScreen.js - Main Dashboard Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

// Import utilities and styles
import { getAllWasteLogs, getUserStats } from '../../utils/database';
import { colors, globalStyles } from '../../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({
    totalLogs: 0,
    thisWeek: 0,
    recyclableCount: 0,
    ecoScore: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load stats when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadStats();
    }, [])
  );

  const loadStats = async () => {
    try {
      setIsLoading(true);
      
      // Get all waste logs
      const logs = await getAllWasteLogs();
      
      // Calculate this week's logs
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const thisWeekLogs = logs.filter(log => 
        new Date(log.created_at) >= weekAgo
      );

      // Count recyclable items
      const recyclableCount = logs.filter(log => log.recyclable).length;

      // Calculate eco score (simple algorithm)
      const ecoScore = (recyclableCount * 10) + (logs.length * 5);

      setStats({
        totalLogs: logs.length,
        thisWeek: thisWeekLogs.length,
        recyclableCount,
        ecoScore,
      });
      
    } catch (error) {
      console.error('Error loading stats:', error);
      Alert.alert('Error', 'Failed to load statistics');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick action definitions
  const quickActions = [
    {
      id: 1,
      title: '📷 Scan Item',
      subtitle: 'Use AI to identify recycling symbols',
      action: () => navigation.navigate('Camera'),
      color: colors.success,
      icon: 'camera',
    },
    {
      id: 2,
      title: '📝 Add Log',
      subtitle: 'Manually record waste disposal',
      action: () => navigation.navigate('Logs', { screen: 'AddLog' }),
      color: colors.secondary,
      icon: 'add-circle',
    },
    {
      id: 3,
      title: '📊 View Logs',
      subtitle: 'Check your disposal history',
      action: () => navigation.navigate('Logs'),
      color: colors.accent,
      icon: 'bar-chart',
    },
    {
      id: 4,
      title: '📍 Find Centers',
      subtitle: 'Locate recycling facilities nearby',
      action: () => navigation.navigate('Locations'),
      color: '#9C27B0',
      icon: 'place',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Header */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome back! 👋</Text>
          <Text style={styles.welcomeSubtitle}>
            Continue your eco-friendly journey
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsHeader}>
            <Text style={styles.sectionTitle}>📈 Your Impact</Text>
            <TouchableOpacity onPress={loadStats}>
              <MaterialIcons name="refresh" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { borderLeftColor: colors.secondary }]}>
              <MaterialIcons name="eco" size={24} color={colors.secondary} />
              <Text style={styles.statNumber}>{stats.totalLogs}</Text>
              <Text style={styles.statLabel}>Total Items</Text>
            </View>
            
            <View style={[styles.statCard, { borderLeftColor: colors.success }]}>
              <MaterialIcons name="recycling" size={24} color={colors.success} />
              <Text style={styles.statNumber}>{stats.recyclableCount}</Text>
              <Text style={styles.statLabel}>Recycled</Text>
            </View>
            
            <View style={[styles.statCard, { borderLeftColor: colors.accent }]}>
              <MaterialIcons name="today" size={24} color={colors.accent} />
              <Text style={styles.statNumber}>{stats.thisWeek}</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
          </View>

          {/* Eco Score */}
          <View style={styles.ecoScoreCard}>
            <View style={styles.ecoScoreHeader}>
              <MaterialIcons name="emoji-events" size={32} color={colors.accent} />
              <View style={styles.ecoScoreText}>
                <Text style={styles.ecoScoreNumber}>{stats.ecoScore}</Text>
                <Text style={styles.ecoScoreLabel}>Eco Score</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min((stats.ecoScore / 500) * 100, 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {stats.ecoScore < 100 ? 'Eco Beginner' :
               stats.ecoScore < 300 ? 'Eco Warrior' :
               stats.ecoScore < 500 ? 'Eco Champion' : 'Eco Master'}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>🚀 Quick Actions</Text>
          
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { borderLeftColor: action.color }]}
              onPress={action.action}
              activeOpacity={0.7}
            >
              <View style={styles.actionContent}>
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                  <MaterialIcons name={action.icon} size={28} color={action.color} />
                </View>
                <View style={styles.actionText}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.gray} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity Preview */}
        {stats.totalLogs > 0 && (
          <View style={styles.recentActivity}>
            <View style={styles.recentHeader}>
              <Text style={styles.sectionTitle}>⏱️ Recent Activity</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Logs')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activityPreview}>
              <MaterialIcons name="history" size={48} color={colors.primary} />
              <Text style={styles.activityText}>
                {stats.totalLogs} items logged • {stats.recyclableCount} recycled
              </Text>
              <TouchableOpacity 
                style={styles.viewLogsButton}
                onPress={() => navigation.navigate('Logs')}
              >
                <Text style={styles.viewLogsButtonText}>View All Logs</Text>
                <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Quick Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>💡 Eco Tip of the Day</Text>
          <View style={styles.tipCard}>
            <MaterialIcons name="lightbulb" size={24} color={colors.accent} />
            <Text style={styles.tipText}>
              Rinse containers before recycling to prevent contamination and improve recycling quality!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  
  scrollContent: {
    paddingBottom: 20,
  },

  // ... keep existing styles from original file beyond shown excerpt
});