// screens/LocationsScreen.js - Recycling Centers Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Import utilities and styles
import { getRecyclingCenters } from '../utils/database';
import { colors, globalStyles, spacing } from '../styles/globalStyles';

export default function LocationsScreen({ navigation }) {
  const [centers, setCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('distance');

  const filterOptions = ['All', 'Plastic', 'Paper', 'Glass', 'Electronics', 'Hazardous'];

  useEffect(() => {
    loadRecyclingCenters();
  }, []);

  const loadRecyclingCenters = async () => {
    try {
      setIsLoading(true);
      const centersData = await getRecyclingCenters();
      setCenters(centersData);
    } catch (error) {
      console.error('Error loading recycling centers:', error);
      Alert.alert('Error', 'Failed to load recycling centers');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAndSortedCenters = centers
    .filter(center => {
      if (selectedFilter === 'All') return true;
      return center.services.includes(selectedFilter);
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleCall = (phone) => {
    Alert.alert(
      'Call Center',
      `Would you like to call ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => alert(`Calling ${phone}...`) }
      ]
    );
  };

  const handleDirections = (name, address) => {
    Alert.alert(
      'Get Directions',
      `Opening directions to ${name}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Maps', onPress: () => alert(`Opening maps for ${address}...`) }
      ]
    );
  };

  const renderCenterCard = ({ item }) => (
    <View style={styles.centerCard}>
      <View style={styles.centerHeader}>
        <View style={styles.centerInfo}>
          <Text style={styles.centerName}>{item.name}</Text>
          <Text style={styles.centerAddress}>{item.address}</Text>
        </View>
        <View style={styles.centerMeta}>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color={colors.accent} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.distanceText}>{item.distance} miles</Text>
        </View>
      </View>

      {/* Services */}
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesLabel}>Services:</Text>
        <View style={styles.servicesTags}>
          {item.services.map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Text style={styles.serviceTagText}>{service}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Hours */}
      <View style={styles.hoursContainer}>
        <MaterialIcons name="access-time" size={16} color={colors.gray} />
        <Text style={styles.hoursText}>{item.hours}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleCall(item.phone)}
        >
          <MaterialIcons name="phone" size={18} color={colors.primary} />
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleDirections(item.name, item.address)}
        >
          <MaterialIcons name="directions" size={18} color={colors.secondary} />
          <Text style={[styles.actionButtonText, { color: colors.secondary }]}>Directions</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => alert('Opening website...')}
        >
          <MaterialIcons name="language" size={18} color={colors.accent} />
          <Text style={[styles.actionButtonText, { color: colors.accent }]}>Website</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="location-off" size={64} color={colors.lightGray} />
      <Text style={styles.emptyTitle}>No centers found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your filters or check back later
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <MaterialIcons name="place" size={48} color={colors.primary} />
          <Text style={styles.loadingText}>Finding recycling centers...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>📍 Recycling Centers</Text>
          <Text style={styles.headerSubtitle}>
            {centers.length} centers found near you
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => alert('Add new center feature coming soon!')}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipActive
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterChipText,
              selectedFilter === filter && styles.filterChipTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.sortButtons}>
          {[
            { key: 'distance', label: 'Distance', icon: 'near-me' },
            { key: 'rating', label: 'Rating', icon: 'star' },
            { key: 'name', label: 'Name', icon: 'sort-by-alpha' }
          ].map((sort) => (
            <TouchableOpacity
              key={sort.key}
              style={[
                styles.sortButton,
                sortBy === sort.key && styles.sortButtonActive
              ]}
              onPress={() => setSortBy(sort.key)}
            >
              <MaterialIcons 
                name={sort.icon} 
                size={16} 
                color={sortBy === sort.key ? colors.white : colors.gray} 
              />
              <Text style={[
                styles.sortButtonText,
                sortBy === sort.key && styles.sortButtonTextActive
              ]}>
                {sort.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Centers List */}
      <FlatList
        data={filteredAndSortedCenters}
        renderItem={renderCenterCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.centersList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  
  headerContent: {
    flex: 1,
  },
  
  headerTitle: {
    ...globalStyles.textSubheading,
    marginBottom: spacing.xs,
  },
  
  headerSubtitle: {
    ...globalStyles.textCaption,
  },
  
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Filters
  filterContainer: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  
  filterContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    marginRight: spacing.sm,
  },
  
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  
  filterChipText: {
    ...globalStyles.textCaption,
    fontWeight: '500',
  },
  
  filterChipTextActive: {
    color: colors.white,
  },

  // Sort
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  
  sortLabel: {
    ...globalStyles.textCaption,
    marginRight: spacing.md,
  },
  
  sortButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
    gap: spacing.xs,
  },
  
  sortButtonActive: {
    backgroundColor: colors.primary,
  },
  
  sortButtonText: {
    ...globalStyles.textSmall,
    fontWeight: '500',
  },
  
  sortButtonTextActive: {
    color: colors.white,
  },

  // Centers list
  centersList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  // Center card
  centerCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...globalStyles.card,
  },
  
  centerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  
  centerInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  
  centerName: {
    ...globalStyles.textBody,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  
  centerAddress: {
    ...globalStyles.textCaption,
    lineHeight: 16,
  },
  
  centerMeta: {
    alignItems: 'flex-end',
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  
  ratingText: {
    ...globalStyles.textCaption,
    fontWeight: '500',
  },
  
  distanceText: {
    ...globalStyles.textSmall,
    color: colors.primary,
    fontWeight: '500',
  },

  // Services
  servicesContainer: {
    marginBottom: spacing.md,
  },
  
  servicesLabel: {
    ...globalStyles.textCaption,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  
  servicesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  
  serviceTag: {
    backgroundColor: colors.primaryOpacity,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  
  serviceTagText: {
    ...globalStyles.textSmall,
    color: colors.primary,
    fontWeight: '500',
  },

  // Hours
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  
  hoursText: {
    ...globalStyles.textCaption,
  },

  // Action buttons
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: spacing.md,
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  
  actionButtonText: {
    ...globalStyles.textCaption,
    color: colors.primary,
    fontWeight: '500',
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  
  emptyTitle: {
    ...globalStyles.textSubheading,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  
  emptySubtitle: {
    ...globalStyles.textBodySecondary,
    textAlign: 'center',
  },
});