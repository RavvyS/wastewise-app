// screens/learning/QuizzesScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function QuizzesScreen({ navigation, route }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(route.params?.category || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const [quizzes] = useState([
    {
      id: 1,
      title: 'Plastic Recycling Basics',
      description: 'Learn about different plastic types and their recycling codes',
      category: 'Plastic',
      difficulty: 'Beginner',
      questions: 10,
      timeLimit: 5,
      points: 100,
      completionRate: 85,
      icon: '♻️',
      color: '#4CAF50',
      isCompleted: true,
      userBestScore: 90,
      tags: ['PET', 'HDPE', 'Recycling Codes'],
    },
    {
      id: 2,
      title: 'Advanced Plastic Processing',
      description: 'Deep dive into industrial plastic recycling methods',
      category: 'Plastic',
      difficulty: 'Advanced',
      questions: 20,
      timeLimit: 15,
      points: 250,
      completionRate: 45,
      icon: '🏭',
      color: '#4CAF50',
      isCompleted: false,
      userBestScore: null,
      tags: ['Industrial', 'Processing', 'Advanced'],
    },
    {
      id: 3,
      title: 'Paper & Cardboard Mastery',
      description: 'Everything about paper recycling and contamination prevention',
      category: 'Paper',
      difficulty: 'Intermediate',
      questions: 15,
      timeLimit: 10,
      points: 150,
      completionRate: 72,
      icon: '📄',
      color: '#FF9800',
      isCompleted: true,
      userBestScore: 85,
      tags: ['Cardboard', 'Contamination', 'Sorting'],
    },
    {
      id: 4,
      title: 'E-Waste Management',
      description: 'Safe disposal of electronics and batteries',
      category: 'Electronics',
      difficulty: 'Intermediate',
      questions: 12,
      timeLimit: 8,
      points: 120,
      completionRate: 63,
      icon: '📱',
      color: '#9C27B0',
      isCompleted: false,
      userBestScore: null,
      tags: ['Electronics', 'Batteries', 'Safety'],
    },
    {
      id: 5,
      title: 'Glass Recycling Expert',
      description: 'Color separation and glass processing knowledge',
      category: 'Glass',
      difficulty: 'Beginner',
      questions: 8,
      timeLimit: 6,
      points: 80,
      completionRate: 91,
      icon: '🍶',
      color: '#2196F3',
      isCompleted: true,
      userBestScore: 95,
      tags: ['Color Sorting', 'Processing', 'Quality'],
    },
    {
      id: 6,
      title: 'Composting & Organics',
      description: 'Home and industrial composting methods',
      category: 'Organic',
      difficulty: 'Beginner',
      questions: 10,
      timeLimit: 7,
      points: 100,
      completionRate: 88,
      icon: '🌱',
      color: '#8BC34A',
      isCompleted: false,
      userBestScore: null,
      tags: ['Composting', 'Organic', 'Home'],
    },
    {
      id: 7,
      title: 'Hazardous Waste Safety',
      description: 'Proper handling of dangerous materials',
      category: 'Hazardous',
      difficulty: 'Advanced',
      questions: 18,
      timeLimit: 12,
      points: 200,
      completionRate: 38,
      icon: '⚠️',
      color: '#F44336',
      isCompleted: false,
      userBestScore: null,
      tags: ['Safety', 'Hazardous', 'Handling'],
    },
    {
      id: 8,
      title: 'Metal Recycling Pro',
      description: 'Different metals and their recycling processes',
      category: 'Metal',
      difficulty: 'Intermediate',
      questions: 14,
      timeLimit: 9,
      points: 140,
      completionRate: 67,
      icon: '🥫',
      color: '#607D8B',
      isCompleted: true,
      userBestScore: 80,
      tags: ['Metals', 'Aluminum', 'Steel'],
    },
  ]);

  const categories = ['All', 'Plastic', 'Paper', 'Glass', 'Electronics', 'Organic', 'Hazardous', 'Metal'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#666';
    }
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const startQuiz = (quiz) => {
    if (quiz.isCompleted) {
      Alert.alert(
        'Retake Quiz? 🎯',
        `You've already completed "${quiz.title}" with a score of ${quiz.userBestScore}%. Would you like to try again to improve your score?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Retake Quiz', 
            onPress: () => navigation.navigate('QuizDetail', { quiz }),
            style: 'default'
          }
        ]
      );
    } else {
      navigation.navigate('QuizDetail', { quiz });
    }
  };

  const renderQuizCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.quizCard, item.isCompleted && styles.completedQuizCard]}
      onPress={() => startQuiz(item)}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.quizHeader}>
        <View style={[styles.quizIconContainer, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.quizIcon}>{item.icon}</Text>
          {item.isCompleted && (
            <View style={styles.completedBadge}>
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            </View>
          )}
        </View>
        
        <View style={styles.quizContent}>
          <Text style={styles.quizTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.quizDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        
        {item.isCompleted && (
          <View style={styles.scoreContainer}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.scoreValue}>{item.userBestScore}%</Text>
          </View>
        )}
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {item.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {item.tags.length > 3 && (
          <Text style={styles.moreTagsText}>+{item.tags.length - 3} more</Text>
        )}
      </View>

      {/* Quiz Meta */}
      <View style={styles.quizMeta}>
        <View style={styles.quizMetaItem}>
          <MaterialIcons name="help-outline" size={16} color="#666" />
          <Text style={styles.quizMetaText}>{item.questions} questions</Text>
        </View>
        <View style={styles.quizMetaItem}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.quizMetaText}>{item.timeLimit} mins</Text>
        </View>
        <View style={styles.quizMetaItem}>
          <MaterialIcons name="stars" size={16} color="#666" />
          <Text style={styles.quizMetaText}>{item.points} pts</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.quizFooter}>
        <View style={styles.badges}>
          <View style={[styles.categoryBadge, { backgroundColor: item.color + '20' }]}>
            <Text style={[styles.categoryBadgeText, { color: item.color }]}>
              {item.category}
            </Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) + '20' }]}>
            <Text style={[styles.difficultyBadgeText, { color: getDifficultyColor(item.difficulty) }]}>
              {item.difficulty}
            </Text>
          </View>
        </View>
        
        <View style={styles.completionInfo}>
          <Text style={styles.completionRate}>{item.completionRate}% users completed</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#ccc" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryFilter = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.filterChip,
        selectedCategory === category && styles.filterChipActive
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.filterChipText,
        selectedCategory === category && styles.filterChipTextActive
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderDifficultyFilter = (difficulty) => (
    <TouchableOpacity
      key={difficulty}
      style={[
        styles.filterChip,
        selectedDifficulty === difficulty && styles.filterChipActive
      ]}
      onPress={() => setSelectedDifficulty(difficulty)}
    >
      <Text style={[
        styles.filterChipText,
        selectedDifficulty === difficulty && styles.filterChipTextActive
      ]}>
        {difficulty}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Stats */}
      <View style={styles.statsHeader}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{quizzes.filter(q => q.isCompleted).length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {quizzes.filter(q => q.isCompleted).reduce((sum, q) => sum + q.points, 0)}
          </Text>
          <Text style={styles.statLabel}>Points Earned</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {quizzes.filter(q => q.isCompleted && q.userBestScore >= 90).length}
          </Text>
          <Text style={styles.statLabel}>Perfect Scores</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search quizzes, topics, or tags..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <MaterialIcons name="clear" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filters */}
      <View style={styles.filtersSection}>
        <Text style={styles.filterLabel}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {categories.map(renderCategoryFilter)}
        </ScrollView>
      </View>

      {/* Difficulty Filters */}
      <View style={styles.filtersSection}>
        <Text style={styles.filterLabel}>Difficulty</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {difficulties.map(renderDifficultyFilter)}
        </ScrollView>
      </View>

      {/* Results Summary */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'es' : ''} found
        </Text>
        {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
            }}
            style={styles.clearFiltersButton}
          >
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Quiz List */}
      {filteredQuizzes.length > 0 ? (
        <FlatList
          data={filteredQuizzes}
          renderItem={renderQuizCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="quiz" size={64} color="#ccc" />
          <Text style={styles.emptyStateTitle}>No quizzes found</Text>
          <Text style={styles.emptyStateText}>
            Try adjusting your search or filters to find more quizzes
          </Text>
          <TouchableOpacity
            style={styles.resetFiltersButton}
            onPress={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
            }}
          >
            <Text style={styles.resetFiltersButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  // Header Stats
  statsHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },

  // Filters
  filtersSection: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 15,
    marginBottom: 8,
  },
  filtersContainer: {
    paddingHorizontal: 15,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#4CAF50',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  filterChipTextActive: {
    color: 'white',
  },

  // Results Header
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  clearFiltersButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  clearFiltersText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },

  // Quiz Cards
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  quizCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  completedQuizCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  quizIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  quizIcon: {
    fontSize: 24,
  },
  completedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  quizContent: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  quizDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },

  // Tags
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  moreTagsText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },

  // Quiz Meta
  quizMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quizMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  quizMetaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },

  // Footer
  quizFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  completionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completionRate: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  resetFiltersButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  resetFiltersButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});