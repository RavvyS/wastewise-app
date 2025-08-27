import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAllRecyclingInfo } from '../../utils/detection/recyclingData';

export default function WasteKnowledgeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const wasteCategories = [
    {
      id: 1,
      name: 'Plastic Items',
      icon: '♻️',
      color: '#4CAF50',
      description: 'All plastic containers and bottles',
      itemCount: 7,
      items: getAllRecyclingInfo()
    },
    {
      id: 2,
      name: 'Paper & Cardboard',
      icon: '📄',
      color: '#FF9800',
      description: 'Newspapers, magazines, boxes',
      itemCount: 12,
      items: [
        { name: 'Newspaper', binType: 'Recycling Bin', recyclable: true },
        { name: 'Cardboard Box', binType: 'Recycling Bin', recyclable: true },
        { name: 'Magazine', binType: 'Recycling Bin', recyclable: true },
      ]
    },
    {
      id: 3,
      name: 'Glass Items',
      icon: '🍶',
      color: '#2196F3',
      description: 'Bottles, jars, containers',
      itemCount: 8,
      items: [
        { name: 'Glass Bottle', binType: 'Glass Recycling', recyclable: true },
        { name: 'Glass Jar', binType: 'Glass Recycling', recyclable: true },
      ]
    },
    {
      id: 4,
      name: 'Metal Items',
      icon: '🥫',
      color: '#9C27B0',
      description: 'Cans, foil, metal containers',
      itemCount: 6,
      items: [
        { name: 'Aluminum Can', binType: 'Recycling Bin', recyclable: true },
        { name: 'Steel Can', binType: 'Recycling Bin', recyclable: true },
      ]
    },
    {
      id: 5,
      name: 'Organic Waste',
      icon: '🍎',
      color: '#8BC34A',
      description: 'Food scraps, garden waste',
      itemCount: 15,
      items: [
        { name: 'Food Scraps', binType: 'Organic Bin', recyclable: true },
        { name: 'Garden Waste', binType: 'Organic Bin', recyclable: true },
      ]
    },
    {
      id: 6,
      name: 'Electronics',
      icon: '📱',
      color: '#FF5722',
      description: 'Phones, computers, batteries',
      itemCount: 10,
      items: [
        { name: 'Old Phone', binType: 'E-Waste', recyclable: true },
        { name: 'Batteries', binType: 'Hazardous Waste', recyclable: true },
      ]
    }
  ];

  useEffect(() => {
    setCategories(wasteCategories);
    setFilteredCategories(wasteCategories);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { borderLeftColor: item.color }]}
      onPress={() => navigation.navigate('CategoryDetail', { category: item })}
    >
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: `${item.color}20` }]}>
          <Text style={[styles.categoryIconText, { color: item.color }]}>
            {item.icon}
          </Text>
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryDescription}>{item.description}</Text>
          <Text style={styles.categoryCount}>{item.itemCount} items</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🧠 Waste Knowledge</Text>
        <Text style={styles.headerSubtitle}>
          Learn about proper waste disposal
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search waste categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.chatbotButton}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <MaterialIcons name="chat" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <Text style={styles.quickActionIcon}>🤖</Text>
          <Text style={styles.quickActionText}>Ask WasteBot</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <Text style={styles.quickActionIcon}>👤</Text>
          <Text style={styles.quickActionText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionIcon}>📊</Text>
          <Text style={styles.quickActionText}>My Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Text style={styles.quickActionIcon}>🏆</Text>
          <Text style={styles.quickActionText}>Achievements</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Categories List */}
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
    </SafeAreaView>
  );
}