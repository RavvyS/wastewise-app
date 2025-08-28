// screens/KnowledgeHubScreen.js - Knowledge Hub Screen
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Import utilities and styles
import { colors, globalStyles, spacing } from '../styles/globalStyles';

export default function KnowledgeHubScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample data - in a real app this would come from a database or API
  const categories = [
    { 
      id: 1, 
      name: 'Plastic Items', 
      icon: '♻️', 
      color: '#4CAF50', 
      count: 7,
      description: 'Learn about plastic recycling codes #1-7'
    },
    { 
      id: 2, 
      name: 'Paper & Cardboard', 
      icon: '📄', 
      color: '#FF9800', 
      count: 12,
      description: 'Newspapers, magazines, packaging materials'
    },
    { 
      id: 3, 
      name: 'Glass Items', 
      icon: '🍶', 
      color: '#2196F3', 
      count: 8,
      description: 'Bottles, jars, and glass containers'
    },
    { 
      id: 4, 
      name: 'Electronics', 
      icon: '🔌', 
      color: '#9C27B0', 
      count: 15,
      description: 'E-waste and electronic devices'
    },
    { 
      id: 5, 
      name: 'Hazardous Waste', 
      icon: '⚠️', 
      color: '#F44336', 
      count: 6,
      description: 'Batteries, chemicals, dangerous materials'
    },
    { 
      id: 6, 
      name: 'Organic Waste', 
      icon: '🍎', 
      color: '#8BC34A', 
      count: 9,
      description: 'Food scraps and compostable materials'
    },
  ];

  const recyclingCodes = [
    { code: '1', name: 'PET', recyclable: true, description: 'Water bottles, soda bottles' },
    { code: '2', name: 'HDPE', recyclable: true, description: 'Milk jugs, detergent bottles' },
    { code: '3', name: 'PVC', recyclable: false, description: 'Pipes, credit cards' },
    { code: '4', name: 'LDPE', recyclable: false, description: 'Plastic bags, squeeze bottles' },
    { code: '5', name: 'PP', recyclable: true, description: 'Yogurt containers, bottle caps' },
    { code: '6', name: 'PS', recyclable: false, description: 'Styrofoam, disposable cups' },
    { code: '7', name: 'OTHER', recyclable: false, description: 'Mixed materials, other plastics' },
  ];

  const filteredCategories = categories.filter(category =>
    selectedCategory === 'All' || category.name === selectedCategory
  );

  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { borderTopColor: item.color }]}
      onPress={() => {
        // Navigate to category details - for now just show an alert
        alert(`Opening ${item.name} details...`);
      }}
    >
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryDescription}>{item.description}</Text>
        </View>
        <View style={styles.categoryMeta}>
          <Text style={styles.categoryCount}>{item.count} items</Text>
          <MaterialIcons name="chevron-right" size={24} color={colors.gray} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRecyclingCode = (code) => (
    <View key={code.code} style={styles.recyclingCodeCard}>
      <View style={[
        styles.recyclingCodeNumber,
        { backgroundColor: code.recyclable ? colors.success : colors.error }
      ]}>
        <Text style={styles.recyclingCodeText}>#{code.code}</Text>
      </View>
      <View style={styles.recyclingCodeInfo}>
        <Text style={styles.recyclingCodeName}>{code.name}</Text>
        <Text style={styles.recyclingCodeDesc}>{code.description}</Text>
        <View style={[
          styles.recyclableStatus,
          { backgroundColor: code.recyclable ? colors.successOpacity : colors.errorOpacity }
        ]}>
          <MaterialIcons 
            name={code.recyclable ? 'recycling' : 'block'} 
            size={14} 
            color={code.recyclable ? colors.success : colors.error}
          />
          <Text style={[
            styles.recyclableStatusText,
            { color: code.recyclable ? colors.success : colors.error }
          ]}>
            {code.recyclable ? 'Recyclable' : 'Not Recyclable'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📚 Knowledge Hub</Text>
          <Text style={styles.headerSubtitle}>
            Learn about proper waste disposal and recycling
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color={colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{categories.length}</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Plastic Codes</Text>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🗂️ Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={filteredCategories}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Recycling Codes Quick Reference */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>♻️ Recycling Codes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recyclingCodesGrid}>
            {recyclingCodes.map(renderRecyclingCode)}
          </View>
        </View>

        {/* Quick Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Quick Tips</Text>
          
          <View style={styles.tipsContainer}>
            <View style={styles.tipCard}>
              <MaterialIcons name="local-drink" size={24} color={colors.primary} />
              <Text style={styles.tipText}>
                Always rinse containers before recycling to prevent contamination
              </Text>
            </View>
            
            <View style={styles.tipCard}>
              <MaterialIcons name="remove-circle" size={24} color={colors.accent} />
              <Text style={styles.tipText}>
                Remove caps and lids as they may be made from different materials
              </Text>
            </View>
            
            <View style={styles.tipCard}>
              <MaterialIcons name="search" size={24} color={colors.secondary} />
              <Text style={styles.tipText}>
                When in doubt, use the camera scanner to identify recycling symbols
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Camera')}
          >
            <MaterialIcons name="camera" size={20} color="white" />
            <Text style={styles.actionButtonText}>Scan Item</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.secondary }]}
            onPress={() => alert('Opening recycling guide...')}
          >
            <MaterialIcons name="book" size={20} color="white" />
            <Text style={styles.actionButtonText}>Full Guide</Text>
          </TouchableOpacity>
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

  // Header
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  
  headerTitle: {
    ...globalStyles.textTitle,
    marginBottom: spacing.xs,
  },
  
  headerSubtitle: {
    ...globalStyles.textBodySecondary,
    textAlign: 'center',
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 25,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...globalStyles.card,
    marginBottom: spacing.sm,
  },
  
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.textPrimary,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    ...globalStyles.card,
  },
  
  statNumber: {
    ...globalStyles.textHeading,
    color: colors.primary,
  },
  
  statLabel: {
    ...globalStyles.textSmall,
    marginTop: spacing.xs,
  },

  // Sections
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  sectionTitle: {
    ...globalStyles.textSubheading,
  },
  
  seeAllText: {
    ...globalStyles.textCaption,
    color: colors.primary,
    fontWeight: '600',
  },

  // Categories
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderTopWidth: 4,
    ...globalStyles.card,
  },
  
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  categoryIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  
  categoryInfo: {
    flex: 1,
  },
  
  categoryName: {
    ...globalStyles.textBody,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  
  categoryDescription: {
    ...globalStyles.textCaption,
  },
  
  categoryMeta: {
    alignItems: 'flex-end',
  },
  
  categoryCount: {
    ...globalStyles.textSmall,
    color: colors.primary,
    fontWeight: '500',
  },

  // Recycling Codes
  recyclingCodesGrid: {
    gap: spacing.sm,
  },
  
  recyclingCodeCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...globalStyles.card,
  },
  
  recyclingCodeNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  
  recyclingCodeText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  recyclingCodeInfo: {
    flex: 1,
  },
  
  recyclingCodeName: {
    ...globalStyles.textBody,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  
  recyclingCodeDesc: {
    ...globalStyles.textCaption,
    marginBottom: spacing.sm,
  },
  
  recyclableStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  
  recyclableStatusText: {
    ...globalStyles.textSmall,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },

  // Tips
  tipsContainer: {
    gap: spacing.sm,
  },
  
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    ...globalStyles.card,
  },
  
  tipText: {
    ...globalStyles.textBody,
    flex: 1,
    marginLeft: spacing.md,
    lineHeight: 20,
  },

  // Action Buttons
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 25,
    gap: spacing.xs,
  },
  
  actionButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});