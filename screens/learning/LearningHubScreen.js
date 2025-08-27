import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LearningHubScreen({ navigation }) {
  const [userProgress] = useState({
    level: 3,
    totalXP: 1250,
    nextLevelXP: 1500,
    streak: 7,
    completedQuizzes: 12,
    articlesRead: 18,
    voiceHours: 2.5
  });

  const featuredContent = [
    {
      id: 1,
      type: 'quiz',
      title: 'Plastic Types Master Quiz',
      description: 'Test your knowledge of all 7 plastic recycling codes',
      difficulty: 'Expert',
      duration: '5 min',
      xp: 100,
      icon: '🧩',
      color: '#FF6B6B'
    },
    {
      id: 2,
      type: 'article',
      title: 'The Journey of a Plastic Bottle',
      description: 'Follow a PET bottle from factory to recycling facility',
      readTime: '8 min',
      category: 'Recycling Process',
      icon: '📚',
      color: '#4ECDC4'
    },
    {
      id: 3,
      type: 'voice',
      title: 'Audio Learning: Composting 101',
      description: 'Listen while you walk - learn about organic waste',
      duration: '12 min',
      category: 'Organic Waste',
      icon: '🎧',
      color: '#45B7D1'
    }
  ];

  const categories = [
    { name: 'Plastic Recycling', icon: '♻️', color: '#4CAF50', count: 15 },
    { name: 'Composting', icon: '🌱', color: '#8BC34A', count: 8 },
    { name: 'E-Waste', icon: '📱', color: '#FF5722', count: 6 },
    { name: 'Glass & Metal', icon: '🥫', color: '#607D8B', count: 10 },
    { name: 'Paper & Cardboard', icon: '📄', color: '#FF9800', count: 12 },
    { name: 'Hazardous Waste', icon: '⚠️', color: '#F44336', count: 4 }
  ];

  const progressPercentage = (userProgress.totalXP / userProgress.nextLevelXP) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Progress */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>Keep Learning! 📚</Text>
              <Text style={styles.levelText}>Level {userProgress.level} • {userProgress.streak} day streak 🔥</Text>
            </View>
            <TouchableOpacity 
              style={styles.voiceButton}
              onPress={() => navigation.navigate('VoiceChat')}
            >
              <MaterialIcons name="mic" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {userProgress.totalXP} / {userProgress.nextLevelXP} XP
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProgress.completedQuizzes}</Text>
            <Text style={styles.statLabel}>Quizzes</Text>
            <Text style={styles.statIcon}>🧩</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProgress.articlesRead}</Text>
            <Text style={styles.statLabel}>Articles</Text>
            <Text style={styles.statIcon}>📖</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProgress.voiceHours}h</Text>
            <Text style={styles.statLabel}>Voice Time</Text>
            <Text style={styles.statIcon}>🎧</Text>
          </View>
        </View>

        {/* Featured Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Featured Today</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredContent.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.featuredCard, { borderLeftColor: item.color }]}
                onPress={() => {
                  if (item.type === 'quiz') navigation.navigate('QuizDetail', { quiz: item });
                  else if (item.type === 'article') navigation.navigate('ArticleDetail', { article: item });
                  else if (item.type === 'voice') navigation.navigate('VoiceChat', { content: item });
                }}
              >
                <View style={[styles.featuredIcon, { backgroundColor: `${item.color}20` }]}>
                  <Text style={[styles.featuredIconText, { color: item.color }]}>{item.icon}</Text>
                </View>
                <Text style={styles.featuredTitle}>{item.title}</Text>
                <Text style={styles.featuredDescription}>{item.description}</Text>
                <View style={styles.featuredMeta}>
                  {item.duration && <Text style={styles.metaText}>⏱️ {item.duration}</Text>}
                  {item.xp && <Text style={styles.xpText}>+{item.xp} XP</Text>}
                  {item.readTime && <Text style={styles.metaText}>📖 {item.readTime}</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📋 Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Quizzes')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryCard, { borderTopColor: category.color }]}
                onPress={() => navigation.navigate('Quizzes', { category: category.name })}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} items</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Quick Start</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Quizzes')}
            >
              <MaterialIcons name="quiz" size={24} color="white" />
              <Text style={styles.actionButtonText}>Take a Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
              onPress={() => navigation.navigate('Articles')}
            >
              <MaterialIcons name="article" size={24} color="white" />
              <Text style={styles.actionButtonText}>Read Articles</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}