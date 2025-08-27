import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Linking
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function RecyclingCentersScreen({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('distance');

  // Sample recycling centers data
  const [recyclingCenters] = useState([
    {
      id: 1,
      name: 'EcoCenter Recycling Facility',
      address: '123 Green Street, Downtown',
      distance: 0.5,
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
      rating: 4.8,
      acceptedItems: ['Plastic', 'Glass', 'Metal', 'Paper', 'Electronics'],
      specialServices: ['E-waste pickup', 'Document shredding'],
      coordinates: { lat: 40.7128, lng: -74.0060 },
      type: 'Full Service',
      verified: true
    },
    {
      id: 2,
      name: 'Metro Glass Collection Point',
      address: '456 Recycling Ave, Midtown',
      distance: 1.2,
      phone: '+1 (555) 234-5678',
      hours: '24/7 Drop-off Available',
      rating: 4.5,
      acceptedItems: ['Glass', 'Plastic Bottles'],
      specialServices: ['24/7 Access'],
      coordinates: { lat: 40.7589, lng: -73.9851 },
      type: 'Drop-off Only',
      verified: true
    },
    {
      id: 3,
      name: 'TechRecycle E-Waste Center',
      address: '789 Tech Blvd, Business District',
      distance: 2.3,
      phone: '+1 (555) 345-6789',
      hours: 'Mon-Sat: 10AM-7PM',
      rating: 4.9,
      acceptedItems: ['Electronics', 'Batteries', 'Cables'],
      specialServices: ['Data destruction', 'Corporate pickup', 'Rare metals recovery'],
      coordinates: { lat: 40.7505, lng: -73.9934 },
      type: 'E-waste Specialist',
      verified: true
    },
    {
      id: 4,
      name: 'Community Compost Hub',
      address: '321 Garden Way, Suburbs',
      distance: 3.1,
      phone: '+1 (555) 456-7890',
      hours: 'Daily: 6AM-8PM',
      rating: 4.6,
      acceptedItems: ['Organic Waste', 'Yard Trimmings', 'Food Scraps'],
      specialServices: ['Free compost', 'Gardening workshops'],
      coordinates: { lat: 40.7282, lng: -74.0776 },
      type: 'Organic Specialist',
      verified: false
    }
  ]);

  const filterOptions = ['All', 'Full Service', 'Drop-off Only', 'E-waste Specialist', 'Organic Specialist'];

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      } else {
        Alert.alert(
          'Location Permission',
          'Enable location access to find nearby recycling centers',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Location error:', error);
    }
  };

  const filteredCenters = selectedFilter === 'All' 
    ? recyclingCenters 
    : recyclingCenters.filter(center => center.type === selectedFilter);

  const sortedCenters = [...filteredCenters].sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const openDirections = (center) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.coordinates.lat},${center.coordinates.lng}`;
    Linking.openURL(url);
  };

  const callCenter = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderCenterCard = ({ item }) => (
    <TouchableOpacity
      style={styles.centerCard}
      onPress={() => navigation.navigate('CenterDetail', { center: item })}
    >
      {/* Header */}
      <View style={styles.centerHeader}>
        <View style={styles.centerTitleRow}>
          <Text style={styles.centerName}>{item.name}</Text>
          {item.verified && (
            <MaterialIcons name="verified" size={16} color="#4CAF50" />
          )}
        </View>
        <View style={styles.distanceContainer}>
          <MaterialIcons name="place" size={16} color="#666" />
          <Text style={styles.distanceText}>{item.distance} km</Text>
        </View>
      </View>

      {/* Address */}
      <Text style={styles.centerAddress}>{item.address}</Text>

      {/* Rating and Type */}
      <View style={styles.centerMeta}>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>

      {/* Hours */}
      <View style={styles.hoursContainer}>
        <MaterialIcons name="schedule" size={16} color="#666" />
        <Text style={styles.hoursText}>{item.hours}</Text>
      </View>

      {/* Accepted Items */}
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsLabel}>Accepts:</Text>
        <View style={styles.itemTags}>
          {item.acceptedItems.slice(0, 3).map((itemType, index) => (
            <View key={index} style={styles.itemTag}>
              <Text style={styles.itemTagText}>{itemType}</Text>
            </View>
          ))}
          {item.acceptedItems.length > 3 && (
            <Text style={styles.moreItemsText}>+{item.acceptedItems.length - 3} more</Text>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openDirections(item)}
        >
          <MaterialIcons name="directions" size={16} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => callCenter(item.phone)}
        >
          <MaterialIcons name="phone" size={16} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CenterDetail', { center: item })}
        >
          <MaterialIcons name="info" size={16} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const getTypeColor = (type) => {
    const colors = {
      'Full Service': '#4CAF50',
      'Drop-off Only': '#2196F3',
      'E-waste Specialist': '#FF9800',
      'Organic Specialist': '#8BC34A'
    };
    return colors[type] || '#666';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📍 Recycling Centers</Text>
        <Text style={styles.headerSubtitle}>
          {userLocation ? 'Centers near you' : 'Find recycling facilities'}
        </Text>
        <TouchableOpacity
          style={styles.inquiryButton}
          onPress={() => navigation.navigate('Inquiries')}
        >
          <MaterialIcons name="question-answer" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'distance' && styles.sortButtonActive]}
          onPress={() => setSortBy('distance')}
        >
          <Text style={styles.sortButtonText}>Distance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'rating' && styles.sortButtonActive]}
          onPress={() => setSortBy('rating')}
        >
          <Text style={styles.sortButtonText}>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}
          onPress={() => setSortBy('name')}
        >
          <Text style={styles.sortButtonText}>Name</Text>
        </TouchableOpacity>
      </View>

      {/* Centers List */}
      <FlatList
        data={sortedCenters}
        renderItem={renderCenterCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.centersList}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateInquiry')}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}