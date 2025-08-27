import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { getAllWasteLogs } from '../database'; // Your existing database functions

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({
    totalLogs: 0,
    thisWeek: 0,
    recyclableCount: 0
  });

  useEffect(() => {
    loadStats();
    const unsubscribe = navigation.addListener('focus', loadStats);
    return unsubscribe;
  }, [navigation]);

  const loadStats = async () => {
    try {
      const logs = await getAllWasteLogs();
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const thisWeekLogs = logs.filter(log => 
        new Date(log.created_at) >= weekAgo
      );

      const recyclableCount = logs.filter(log => 
        log.bin_type === 'Recycling Bin'
      ).length;

      setStats({
        totalLogs: logs.length,
        thisWeek: thisWeekLogs.length,
        recyclableCount
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const quickActions = [
    {
      title: '📷 Scan Item',
      subtitle: 'Use camera to identify recycling symbols',
      action: () => navigation.navigate('Camera'),
      color: '#4CAF50'
    },
    {
      title: '📝 Add Log',
      subtitle: 'Manually add a waste log entry',
      action: () => navigation.navigate('Logs', { screen: 'AddLog' }),
      color: '#2196F3'
    },
    {
      title: '📚 Learn',
      subtitle: 'Recycling education and tips',
      action: () => navigation.navigate('Learn'),
      color: '#FF9800'
    },
    {
      title: '📊 View Logs',
      subtitle: 'See your waste disposal history',
      action: () => navigation.navigate('Logs', { screen: 'LogsList' }),
      color: '#9C27B0'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>♻️ WasteLogger</Text>
          <Text style={styles.subtitle}>Smart waste disposal tracking</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalLogs}</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.thisWeek}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.recyclableCount}</Text>
            <Text style={styles.statLabel}>Recycled</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { borderLeftColor: action.color }]}
              onPress={action.action}
            >
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  actionsContainer: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  actionCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 15,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});