// screens/ProfileScreen.js - User Profile Screen
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

// Import utilities and styles
import { getUserStats, getAllWasteLogs } from '../utils/database';
import { colors, globalStyles, spacing } from '../styles/globalStyles';

export default function ProfileScreen({ navigation }) {
  const [userStats, setUserStats] = useState({
    total_scans: 0,
    questions_asked: 0,
    categories_learned: 0,
    eco_score: 0,
    level: 'Eco Beginner',
    achievements: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const stats = await getUserStats();
      const logs = await getAllWasteLogs();
      
      // Calculate additional stats from logs
      const recyclableCount = logs.filter(log => log.recyclable).length;
      const todayLogs = logs.filter(log => {
        const today = new Date().toISOString().split('T')[0];
        return log.created_at && log.created_at.startsWith(today);
      }).length;

      setUserStats({
        ...stats,
        totalLogs: logs.length,
        recyclableCount,
        todayLogs,
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const getEcoLevel = (score) => {
    if (score < 100) return 'Eco Beginner';
    if (score < 300) return 'Eco Warrior';
    if (score < 500) return 'Eco Champion';
    if (score < 1000) return 'Eco Master';
    return 'Eco Legend';
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Eco Beginner': return colors.gray;
      case 'Eco Warrior': return colors.secondary;
      case 'Eco Champion': return colors.accent;
      case 'Eco Master': return colors.primary;
      case 'Eco Legend': return colors.error;
      default: return colors.gray;
    }
  };

  const achievements = [
    {
      id: 'first_scan',
      title: 'First Scanner',
      description: 'Scanned your first recycling symbol',
      icon: 'camera',
      unlocked: userStats.total_scans > 0,
    },
    {
      id: 'eco_warrior',
      title: 'Eco Warrior',
      description: 'Logged 50+ waste items',
      icon: 'eco',
      unlocked: userStats.totalLogs >= 50,
    },
    {
      id: 'recycling_champion',
      title: 'Recycling Champion',
      description: 'Recycled 75% of your waste',
      icon: 'recycling',
      unlocked: userStats.totalLogs > 0 && (userStats.recyclableCount / userStats.totalLogs) >= 0.75,
    },
    {
      id: 'knowledge_seeker',
      title: 'Knowledge Seeker',
      description: 'Explored 5+ waste categories',
      icon: 'school',
      unlocked: userStats.categories_learned >= 5,
    },
    {
      id: 'daily_tracker',
      title: 'Daily Tracker',
      description: 'Logged waste 7 days in a row',
      icon: 'today',
      unlocked: false, // This would need more complex tracking
    },
    {
      id: 'eco_master',
      title: 'Eco Master',
      description: 'Reached 1000 eco points',
      icon: 'emoji-events',
      unlocked: userStats.eco_score >= 1000,
    },
  ];

  const settingsOptions = [
    { 
      id: 'notifications', 
      title: 'Notifications', 
      subtitle: 'Manage app notifications',
      icon: 'notifications',
      onPress: () => Alert.alert('Notifications', 'Notification settings coming soon!')
    },
    { 
      id: 'privacy', 
      title: 'Privacy & Security', 
      subtitle: 'Control your data and privacy',
      icon: 'security',
      onPress: () => Alert.alert('Privacy', 'Privacy settings coming soon!')
    },
    { 
      id: 'language', 
      title: 'Language', 
      subtitle: 'English',
      icon: 'language',
      onPress: () => Alert.alert('Language', 'Language selection coming soon!')
    },
    { 
      id: 'help', 
      title: 'Help & Support', 
      subtitle: 'Get help and contact support',
      icon: 'help',
      onPress: () => Alert.alert('Help', 'Help center coming soon!')
    },
    { 
      id: 'about', 
      title: 'About', 
      subtitle: 'App version and information',
      icon: 'info',
      onPress: () => Alert.alert('About', 'WasteLogger v1.0.0\nBuilt with ♻️ for the environment')
    },
  ];

  const currentLevel = getEcoLevel(userStats.eco_score);
  const nextLevelThreshold = userStats.eco_score < 100 ? 100 : 
                            userStats.eco_score < 300 ? 300 :
                            userStats.eco_score < 500 ? 500 :
                            userStats.eco_score < 1000 ? 1000 : 1000;
  const progressPercentage = Math.min((userStats.eco_score / nextLevelThreshold) * 100, 100);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <MaterialIcons name="person" size={48} color={colors.primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={48} color={colors.primary} />
          </View>
          <Text style={styles.profileName}>Eco Warrior</Text>
          <Text style={styles.profileEmail}>user@wastelogger.app</Text>
          <View style={[
            styles.levelBadge,
            { backgroundColor: getLevelColor(currentLevel) }
          ]}>
            <Text style={styles.levelText}>{currentLevel}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressLabel}>Progress to next level</Text>
              <Text style={styles.progressScore}>
                {userStats.eco_score}/{nextLevelThreshold} points
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${progressPercentage}%` }
                ]}
              />
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>📊 Your Impact</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <MaterialIcons name="eco" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>{userStats.totalLogs || 0}</Text>
              <Text style={styles.statLabel}>Items Logged</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="recycling" size={24} color={colors.success} />
              <Text style={styles.statNumber}>{userStats.recyclableCount || 0}</Text>
              <Text style={styles.statLabel}>Recycled</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="camera" size={24} color={colors.secondary} />
              <Text style={styles.statNumber}>{userStats.total_scans}</Text>
              <Text style={styles.statLabel}>Scans</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="emoji-events" size={24} color={colors.accent} />
              <Text style={styles.statNumber}>{userStats.eco_score}</Text>
              <Text style={styles.statLabel}>Eco Score</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏆 Achievements</Text>
            <Text style={styles.achievementCount}>
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsList}
          >
            {achievements.map((achievement) => (
              <View 
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementCardLocked
                ]}
              >
                <View style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.unlocked ? colors.primaryOpacity : colors.lightGray }
                ]}>
                  <MaterialIcons 
                    name={achievement.icon} 
                    size={24} 
                    color={achievement.unlocked ? colors.primary : colors.gray}
                  />
                </View>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.achievementTitleLocked
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDesc}>
                  {achievement.description}
                </Text>
                {achievement.unlocked && (
                  <MaterialIcons 
                    name="check-circle" 
                    size={16} 
                    color={colors.success}
                    style={styles.achievementCheck}
                  />
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>⚙️ Settings</Text>
          <View style={styles.settingsList}>
            {settingsOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.settingItem}
                onPress={option.onPress}
              >
                <View style={styles.settingIcon}>
                  <MaterialIcons name={option.icon} size={24} color={colors.primary} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{option.title}</Text>
                  <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={colors.gray} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('Export Data', 'Data export feature coming soon!')}
          >
            <MaterialIcons name="file-download" size={20} color={colors.secondary} />
            <Text style={[styles.actionButtonText, { color: colors.secondary }]}>
              Export My Data
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.signOutButton]}
            onPress={() => {
              Alert.alert(
                'Sign Out',
                'Are you sure you want to sign out?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Sign Out', style: 'destructive', onPress: () => {
                    Alert.alert('Signed Out', 'You have been signed out successfully');
                  }}
                ]
              );
            }}
          >
            <MaterialIcons name="logout" size={20} color={colors.error} />
            <Text style={[styles.actionButtonText, { color: colors.error }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ♻️ for a better planet
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    ...globalStyles.textBodySecondary,
    marginTop: spacing.md,
  },

  // Profile header
  profileHeader: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.md,
  },
  
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryOpacity,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  
  profileName: {
    ...globalStyles.textTitle,
    marginBottom: spacing.xs,
  },
  
  profileEmail: {
    ...globalStyles.textBodySecondary,
    marginBottom: spacing.md,
  },
  
  levelBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    marginBottom: spacing.lg,
  },
  
  levelText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },

  // Progress
  progressContainer: {
    width: '80%',
    alignItems: 'center',
  },
  
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.sm,
  },
  
  progressLabel: {
    ...globalStyles.textCaption,
  },
  
  progressScore: {
    ...globalStyles.textCaption,
    fontWeight: '600',
    color: colors.primary,
  },
  
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },

  // Sections
  sectionTitle: {
    ...globalStyles.textSubheading,
    marginBottom: spacing.md,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  // Stats
  statsSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    ...globalStyles.card,
  },
  
  statNumber: {
    ...globalStyles.textHeading,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  
  statLabel: {
    ...globalStyles.textSmall,
    textAlign: 'center',
    marginTop: spacing.xs,
  },

  // Achievements
  achievementsSection: {
    marginBottom: spacing.lg,
  },
  
  achievementCount: {
    ...globalStyles.textCaption,
    color: colors.primary,
    fontWeight: '600',
  },
  
  achievementsList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  
  achievementCard: {
    width: 120,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    ...globalStyles.card,
    position: 'relative',
  },
  
  achievementCardLocked: {
    opacity: 0.6,
  },
  
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  
  achievementTitle: {
    ...globalStyles.textCaption,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  achievementTitleLocked: {
    color: colors.textSecondary,
  },
  
  achievementDesc: {
    ...globalStyles.textSmall,
    textAlign: 'center',
    lineHeight: 14,
  },
  
  achievementCheck: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
  },

  // Settings
  settingsSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  
  settingsList: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    ...globalStyles.card,
  },
  
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryOpacity,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  
  settingContent: {
    flex: 1,
  },
  
  settingTitle: {
    ...globalStyles.textBody,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  
  settingSubtitle: {
    ...globalStyles.textCaption,
  },

  // Actions
  actionSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
  },
  
  signOutButton: {
    borderWidth: 1,
    borderColor: colors.errorOpacity,
  },
  
  actionButtonText: {
    ...globalStyles.textBody,
    fontWeight: '500',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  
  footerText: {
    ...globalStyles.textCaption,
    marginBottom: spacing.xs,
  },
  
  versionText: {
    ...globalStyles.textSmall,
  },
});