// screens/learning/ArticleDetailScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Alert,
  Dimensions,
  StatusBar
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ArticleDetailScreen({ navigation, route }) {
  const { article } = route.params;
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked || false);
  const [isLiked, setIsLiked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Sample full article content
  const fullArticleContent = article.content || `
# ${article.title}

${article.excerpt}

## Introduction

In today's rapidly evolving world of environmental consciousness, understanding the intricacies of waste management has become more crucial than ever. This comprehensive guide will walk you through the essential concepts, practical applications, and future implications of sustainable waste practices.

## Key Concepts

### Understanding the Basics

The fundamental principles of waste management revolve around the concept of the circular economy. This approach emphasizes:

- **Reduce**: Minimizing waste generation at the source
- **Reuse**: Finding new purposes for items before disposal
- **Recycle**: Converting waste materials into new products
- **Recover**: Extracting energy or materials from waste streams

### Environmental Impact

The environmental implications of proper waste management cannot be overstated. When we implement effective waste strategies, we achieve:

1. **Reduced Landfill Pressure**: Less waste means decreased strain on landfill capacity
2. **Lower Carbon Emissions**: Proper processing reduces greenhouse gas emissions
3. **Resource Conservation**: Recycling preserves natural resources for future generations
4. **Ecosystem Protection**: Prevents contamination of soil, water, and air

## Practical Applications

### Home Implementation

Implementing these principles in your daily life is easier than you might think:

- Set up a comprehensive sorting system in your home
- Research local recycling programs and their specific requirements
- Invest in reusable alternatives for common single-use items
- Compost organic waste to create nutrient-rich soil

### Community Engagement

Getting your community involved amplifies the impact:

- Organize neighborhood cleanup events
- Advocate for better recycling infrastructure
- Share knowledge through workshops and presentations
- Partner with local schools for educational programs

## Technology and Innovation

The waste management industry is experiencing a technological revolution:

### Smart Sorting Systems

Advanced sorting technologies use artificial intelligence and machine learning to:
- Identify materials with unprecedented accuracy
- Separate contaminants from recyclable materials
- Optimize processing efficiency
- Reduce human error in sorting operations

### Blockchain Tracking

Emerging blockchain technologies enable:
- Complete traceability of waste streams
- Verification of recycling claims
- Transparent reporting of environmental impact
- Incentivized participation in recycling programs

## Challenges and Solutions

### Current Challenges

The industry faces several significant obstacles:

- **Contamination Issues**: Mixed materials reduce recycling effectiveness
- **Economic Viability**: Fluctuating market prices for recycled materials
- **Consumer Behavior**: Inconsistent participation in recycling programs
- **Infrastructure Limitations**: Inadequate processing facilities in many regions

### Innovative Solutions

Forward-thinking solutions are emerging:

- **Extended Producer Responsibility**: Manufacturers take responsibility for product lifecycle
- **Deposit Return Systems**: Financial incentives for proper disposal
- **Advanced Chemical Recycling**: Breaking down plastics to molecular level
- **Urban Mining**: Extracting materials from existing infrastructure

## Future Outlook

The future of waste management looks promising with several trends emerging:

### Circular Economy Integration

More businesses are adopting circular economy principles, creating closed-loop systems where waste from one process becomes input for another.

### Policy Developments

Governments worldwide are implementing stricter regulations and providing incentives for sustainable waste practices.

### Consumer Awareness

Growing environmental consciousness is driving demand for sustainable products and services.

## Conclusion

As we move forward, the importance of understanding and implementing proper waste management practices becomes increasingly critical. Each individual action contributes to a larger collective impact that can significantly improve our environmental future.

The journey toward sustainable waste management requires commitment from individuals, communities, businesses, and governments working together toward common environmental goals.

## Additional Resources

For more information on this topic, consider exploring:

- Local environmental agencies and their programs
- Industry publications and research papers
- Educational courses on environmental science
- Professional organizations in waste management

---

*This article is part of our comprehensive environmental education series. Stay tuned for more insights on sustainable living practices.*
  `;

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

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollPercent = contentOffset.y / (contentSize.height - layoutMeasurement.height);
    setReadingProgress(Math.max(0, Math.min(1, scrollPercent)));
    setScrollPosition(contentOffset.y);
  };

  const shareArticle = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${article.title}\n\n${article.excerpt}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In real app, this would update the backend
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // In real app, this would update the backend
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Reading Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${readingProgress * 100}%` }]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={shareArticle} style={styles.headerAction}>
            <MaterialIcons name="share" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleBookmark} style={styles.headerAction}>
            <MaterialIcons 
              name={isBookmarked ? "bookmark" : "bookmark-border"} 
              size={24} 
              color={isBookmarked ? "#4CAF50" : "#666"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Article Hero */}
        <View style={[styles.heroSection, { backgroundColor: getCategoryColor(article.category) + '20' }]}>
          <Text style={styles.heroEmoji}>{article.imageEmoji}</Text>
          
          {/* Article Meta */}
          <View style={styles.articleMeta}>
            <View style={styles.badgesContainer}>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(article.category) }]}>
                <Text style={styles.categoryBadgeText}>{article.category}</Text>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(article.difficulty) }]}>
                <Text style={styles.difficultyBadgeText}>{article.difficulty}</Text>
              </View>
            </View>
            
            <View style={styles.articleStats}>
              <View style={styles.statItem}>
                <MaterialIcons name="schedule" size={16} color="#666" />
                <Text style={styles.statText}>{article.estimatedReadTime}</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="visibility" size={16} color="#666" />
                <Text style={styles.statText}>{article.views}</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="favorite-border" size={16} color="#666" />
                <Text style={styles.statText}>{article.likes}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Article Content */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.articleTitle}>{article.title}</Text>
          
          {/* Author Info */}
          <View style={styles.authorSection}>
            <View style={styles.authorAvatar}>
              <MaterialIcons name="person" size={24} color="#666" />
            </View>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{article.author}</Text>
              <Text style={styles.authorTitle}>{article.authorTitle}</Text>
              <Text style={styles.publishDate}>
                Published {new Date(article.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {article.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>

          {/* Article Content */}
          <View style={styles.articleContent}>
            <Text style={styles.contentText}>{fullArticleContent}</Text>
          </View>

          {/* Engagement Actions */}
          <View style={styles.engagementSection}>
            <TouchableOpacity 
              style={[styles.engagementButton, isLiked && styles.engagementButtonActive]}
              onPress={toggleLike}
            >
              <MaterialIcons 
                name={isLiked ? "favorite" : "favorite-border"} 
                size={20} 
                color={isLiked ? "white" : "#666"} 
              />
              <Text style={[
                styles.engagementButtonText, 
                isLiked && styles.engagementButtonTextActive
              ]}>
                {isLiked ? 'Liked' : 'Like'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.engagementButton, isBookmarked && styles.engagementButtonActive]}
              onPress={toggleBookmark}
            >
              <MaterialIcons 
                name={isBookmarked ? "bookmark" : "bookmark-border"} 
                size={20} 
                color={isBookmarked ? "white" : "#666"} 
              />
              <Text style={[
                styles.engagementButtonText, 
                isBookmarked && styles.engagementButtonTextActive
              ]}>
                {isBookmarked ? 'Saved' : 'Save'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.engagementButton} onPress={shareArticle}>
              <MaterialIcons name="share" size={20} color="#666" />
              <Text style={styles.engagementButtonText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Related Articles */}
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>More in {article.category}</Text>
            <TouchableOpacity 
              style={styles.relatedItem}
              onPress={() => navigation.navigate('ArticleList', { category: article.category })}
            >
              <Text style={styles.relatedItemText}>Browse all {article.category} articles</Text>
              <MaterialIcons name="arrow-forward-ios" size={16} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Scroll to Top Button */}
      {scrollPosition > 500 && (
        <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
          <MaterialIcons name="keyboard-arrow-up" size={24} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  // Progress Bar
  progressBarContainer: {
    height: 3,
    backgroundColor: '#f0f0f0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    padding: 8,
    marginLeft: 8,
  },

  // Scroll Container
  scrollContainer: {
    flex: 1,
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  articleMeta: {
    width: '100%',
    alignItems: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  difficultyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  articleStats: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },

  // Content Container
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  articleTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 36,
    marginBottom: 20,
  },

  // Author Section
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 20,
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  authorTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  publishDate: {
    fontSize: 12,
    color: '#999',
  },

  // Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },

  // Article Content
  articleContent: {
    marginBottom: 30,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    textAlign: 'justify',
  },

  // Engagement Section
  engagementSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 30,
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    minWidth: 80,
    justifyContent: 'center',
  },
  engagementButtonActive: {
    backgroundColor: '#4CAF50',
  },
  engagementButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  engagementButtonTextActive: {
    color: 'white',
  },

  // Related Section
  relatedSection: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  relatedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  relatedItemText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },

  // Floating Button
  scrollToTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});