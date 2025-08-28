// screens/learning/ArticleListScreen.js
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
  Image,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ArticleListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent'); // recent, popular, alphabetical

  const [articles] = useState([
    {
      id: 1,
      title: 'The Future of Plastic Recycling Technology',
      excerpt: 'Discover cutting-edge innovations in plastic processing that could revolutionize waste management worldwide.',
      content: 'Full article content here...',
      category: 'Technology',
      author: 'Dr. Sarah Green',
      authorTitle: 'Environmental Scientist',
      publishDate: '2024-01-15',
      readTime: 5,
      difficulty: 'Advanced',
      tags: ['Innovation', 'Plastic', 'Technology', 'Future'],
      imageEmoji: '🥫',
      views: 1345,
      likes: 98,
      isBookmarked: true,
      estimatedReadTime: '5 min read',
    },
    {
      id: 8,
      title: 'Microplastics: The Hidden Environmental Threat',
      excerpt: 'Understanding the source, impact, and solutions for microplastic pollution in our environment.',
      content: 'Full article content here...',
      category: 'Environment',
      author: 'Dr. Maria Rodriguez',
      authorTitle: 'Marine Biologist',
      publishDate: '2023-12-28',
      readTime: 8,
      difficulty: 'Advanced',
      tags: ['Microplastics', 'Ocean', 'Pollution', 'Research'],
      imageEmoji: '🌊',
      views: 2240,
      likes: 187,
      isBookmarked: false,
      estimatedReadTime: '8 min read',
    },
  ]);

  const categories = ['All', 'Technology', 'DIY', 'E-waste', 'Recycling', 'Safety', 'Environment'];
  const sortOptions = [
    { key: 'recent', label: 'Most Recent' },
    { key: 'popular', label: 'Most Popular' },
    { key: 'alphabetical', label: 'A-Z' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#666';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': '#9C27B0',
      'DIY': '#4CAF50',
      'E-waste': '#FF5722',
      'Recycling': '#2196F3',
      'Safety': '#F44336',
      'Environment': '#8BC34A'
    };
    return colors[category] || '#666';
  };

  const filteredAndSortedArticles = () => {
    let filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           article.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.publishDate) - new Date(a.publishDate);
        case 'popular':
          return b.views - a.views;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const toggleBookmark = (articleId) => {
    // In real app, this would update the backend
    console.log('Toggle bookmark for article:', articleId);
  };

  const renderArticleCard = ({ item }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => navigation.navigate('ArticleDetail', { article: item })}
      activeOpacity={0.7}
    >
      {/* Article Image/Emoji */}
      <View style={[styles.articleImageContainer, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
        <Text style={styles.articleEmoji}>{item.imageEmoji}</Text>
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => toggleBookmark(item.id)}
        >
          <MaterialIcons 
            name={item.isBookmarked ? "bookmark" : "bookmark-border"} 
            size={20} 
            color={item.isBookmarked ? "#4CAF50" : "#999"} 
          />
        </TouchableOpacity>
      </View>

      {/* Article Content */}
      <View style={styles.articleContent}>
        {/* Header */}
        <View style={styles.articleHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
            <Text style={[styles.categoryBadgeText, { color: getCategoryColor(item.category) }]}>
              {item.category}
            </Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) + '20' }]}>
            <Text style={[styles.difficultyBadgeText, { color: getDifficultyColor(item.difficulty) }]}>
              {item.difficulty}
            </Text>
          </View>
        </View>

        {/* Title and Excerpt */}
        <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.articleExcerpt} numberOfLines={3}>{item.excerpt}</Text>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {item.tags.length > 3 && (
            <Text style={styles.moreTagsText}>+{item.tags.length - 3}</Text>
          )}
        </View>

        {/* Article Meta */}
        <View style={styles.articleMeta}>
          <View style={styles.authorInfo}>
            <MaterialIcons name="person" size={16} color="#666" />
            <Text style={styles.authorText}>{item.author}</Text>
          </View>
          <View style={styles.articleStats}>
            <View style={styles.statItem}>
              <MaterialIcons name="schedule" size={14} color="#666" />
              <Text style={styles.statText}>{item.estimatedReadTime}</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="visibility" size={14} color="#666" />
              <Text style={styles.statText}>{item.views}</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="favorite-border" size={14} color="#666" />
              <Text style={styles.statText}>{item.likes}</Text>
            </View>
          </View>
        </View>

        {/* Date */}
        <Text style={styles.publishDate}>
          Published {new Date(item.publishDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </Text>
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

  const filteredArticles = filteredAndSortedArticles();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Stats */}
      <View style={styles.statsHeader}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{articles.length}</Text>
          <Text style={styles.statLabel}>Articles</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{articles.filter(a => a.isBookmarked).length}</Text>
          <Text style={styles.statLabel}>Bookmarked</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{Math.round(articles.reduce((sum, a) => sum + a.readTime, 0) / 60)}</Text>
          <Text style={styles.statLabel}>Hours Content</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles, authors, or topics..."
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

      {/* Filters and Sort */}
      <View style={styles.filtersRow}>
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
          style={styles.categoriesScroll}
        >
          {categories.map(renderCategoryFilter)}
        </ScrollView>

        {/* Sort Dropdown */}
        <TouchableOpacity style={styles.sortButton}>
          <MaterialIcons name="sort" size={20} color="#666" />
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Results Summary */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
        </Text>
        {(selectedCategory !== 'All' || searchQuery) && (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            style={styles.clearFiltersButton}
          >
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Articles List */}
      {filteredArticles.length > 0 ? (
        <FlatList
          data={filteredArticles}
          renderItem={renderArticleCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="article" size={64} color="#ccc" />
          <Text style={styles.emptyStateTitle}>No articles found</Text>
          <Text style={styles.emptyStateText}>
            Try adjusting your search or browse different categories
          </Text>
          <TouchableOpacity
            style={styles.resetFiltersButton}
            onPress={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          >
            <Text style={styles.resetFiltersButtonText}>Show All Articles</Text>
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

  // Filters and Sort
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  categoriesScroll: {
    flex: 1,
  },
  filtersContainer: {
    paddingRight: 15,
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
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 1,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
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

  // Article Cards
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  articleCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  articleImageContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  articleEmoji: {
    fontSize: 48,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleContent: {
    padding: 16,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  articleExcerpt: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
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
    fontSize: 11,
    color: '#666',
  },
  moreTagsText: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  articleStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  statText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 2,
  },
  publishDate: {
    fontSize: 11,
    color: '#999',
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
}); '🔬',
      views: 1240,
      likes: 89,
      isBookmarked: false,
      estimatedReadTime: '5 min read',
    },
    {
      id: 2,
      title: 'Starting Your Home Composting Journey',
      excerpt: 'A beginner-friendly guide to turning kitchen scraps into nutrient-rich soil for your garden.',
      content: 'Full article content here...',
      category: 'DIY',
      author: 'Mike Johnson',
      authorTitle: 'Sustainable Living Expert',
      publishDate: '2024-01-12',
      readTime: 3,
      difficulty: 'Beginner',
      tags: ['Composting', 'Home', 'Organic', 'Garden'],
      imageEmoji: '🌱',
      views: 2100,
      likes: 156,
      isBookmarked: true,
      estimatedReadTime: '3 min read',
    },
    {
      id: 3,
      title: 'Electronics Disposal: A Complete Guide',
      excerpt: 'Learn how to safely dispose of your old electronics while protecting both the environment and your personal data.',
      content: 'Full article content here...',
      category: 'E-waste',
      author: 'Tech Green Team',
      authorTitle: 'E-waste Specialists',
      publishDate: '2024-01-10',
      readTime: 7,
      difficulty: 'Intermediate',
      tags: ['Electronics', 'E-waste', 'Safety', 'Privacy'],
      imageEmoji: '📱',
      views: 890,
      likes: 67,
      isBookmarked: false,
      estimatedReadTime: '7 min read',
    },
    {
      id: 4,
      title: 'Understanding Glass Recycling Processes',
      excerpt: 'From color sorting to melting: the fascinating journey of glass from your bin to new products.',
      content: 'Full article content here...',
      category: 'Recycling',
      author: 'Emma Wilson',
      authorTitle: 'Recycling Industry Analyst',
      publishDate: '2024-01-08',
      readTime: 4,
      difficulty: 'Intermediate',
      tags: ['Glass', 'Process', 'Manufacturing', 'Recycling'],
      imageEmoji: '🍶',
      views: 1560,
      likes: 92,
      isBookmarked: true,
      estimatedReadTime: '4 min read',
    },
    {
      id: 5,
      title: 'Hazardous Waste: What You Need to Know',
      excerpt: 'Identifying and safely disposing of household hazardous materials to protect your family and community.',
      content: 'Full article content here...',
      category: 'Safety',
      author: 'Dr. Robert Chen',
      authorTitle: 'Environmental Health Expert',
      publishDate: '2024-01-05',
      readTime: 6,
      difficulty: 'Advanced',
      tags: ['Hazardous', 'Safety', 'Health', 'Disposal'],
      imageEmoji: '⚠️',
      views: 743,
      likes: 54,
      isBookmarked: false,
      estimatedReadTime: '6 min read',
    },
    {
      id: 6,
      title: 'Paper vs Digital: Environmental Impact',
      excerpt: 'Comparing the carbon footprint of paper and digital documents to make more sustainable choices.',
      content: 'Full article content here...',
      category: 'Environment',
      author: 'Lisa Park',
      authorTitle: 'Carbon Footprint Researcher',
      publishDate: '2024-01-03',
      readTime: 4,
      difficulty: 'Intermediate',
      tags: ['Paper', 'Digital', 'Carbon', 'Environment'],
      imageEmoji: '🌍',
      views: 1890,
      likes: 134,
      isBookmarked: false,
      estimatedReadTime: '4 min read',
    },
    {
      id: 7,
      title: 'Metal Recycling: More Valuable Than You Think',
      excerpt: 'Discover why metal recycling is one of the most profitable and environmentally beneficial waste streams.',
      content: 'Full article content here...',
      category: 'Recycling',
      author: 'James Mitchell',
      authorTitle: 'Materials Recovery Expert',
      publishDate: '2024-01-01',
      readTime: 5,
      difficulty: 'Beginner',
      tags: ['Metal', 'Value', 'Economics', 'Recycling'],
      imageEmoji:
        },
});