// screens/PlaceholderScreens.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export function CategoryDetailScreen({ route }) {
  const { category } = route.params || {};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{category?.name || 'Category Details'}</Text>
        <Text style={styles.description}>{category?.description}</Text>
        <Text style={styles.sectionTitle}>Items in this category:</Text>
        {category?.items?.map((item, index) => (
          <Text key={index} style={styles.item}>• {item}</Text>
        ))}
        <Text style={styles.placeholder}>
          🚧 Detailed category information coming soon! 🚧
          {'\n\n'}This will include:
          {'\n'}• Disposal instructions
          {'\n'}• Environmental impact
          {'\n'}• Recycling process details
          {'\n'}• Local facility recommendations
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export function ChatbotScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🤖 WasteBot Assistant</Text>
        <Text style={styles.placeholder}>
          AI chatbot interface coming soon! 
          {'\n\n'}Features will include:
          {'\n'}• Natural language waste disposal questions
          {'\n'}• Smart recommendations
          {'\n'}• Integration with scan results
          {'\n'}• Voice chat capability
        </Text>
      </View>
    </SafeAreaView>
  );
}

export function UserProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>👤 Your Profile</Text>
        <Text style={styles.placeholder}>
          User profile and statistics coming soon!
          {'\n\n'}Will include:
          {'\n'}• Personal waste disposal stats
          {'\n'}• Achievement badges
          {'\n'}• Learning progress
          {'\n'}• Environmental impact metrics
        </Text>
      </View>
    </SafeAreaView>
  );
}

export function LearningHubScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📚 Learning Hub</Text>
        <Text style={styles.placeholder}>
          Gamified learning interface coming soon!
          {'\n\n'}Features:
          {'\n'}• XP and level progression
          {'\n'}• Interactive quizzes
          {'\n'}• Educational articles
          {'\n'}• Achievement system
        </Text>
      </View>
    </SafeAreaView>
  );
}

export function QuizzesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🧩 Knowledge Quizzes</Text>
        <Text style={styles.placeholder}>
          Interactive quizzes coming soon!
          {'\n\n'}Will feature:
          {'\n'}• Multiple difficulty levels
          {'\n'}• Category-based questions
          {'\n'}• Real-time scoring
          {'\n'}• Progress tracking
        </Text>
      </View>
    </SafeAreaView>
  );
}

export function QuizDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🎯 Taking Quiz</Text>
        <Text style={styles.placeholder}>
          Quiz interface coming soon!
          {'\n\n'}Features:
          {'\n'}• Multiple choice questions
          {'\n'}• Timer functionality
          {'\n'}• Instant feedback
          {'\n'}• Detailed explanations
        </Text>
      </View>
    </SafeAreaView>
  );
}

export function RecyclingCentersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📍 Recycling Centers</Text>
        <Text style={styles.placeholder}>
          Location services coming soon!
          {'\n\n'}Will include:
          {'\n'}• Interactive map
          {'\n'}• Nearby center finder
          {'\n'}• Distance and directions
          {'\n'}• Center details and hours
        </Text>
      </View>
    </SafeAreaView>
  );
}

export function CenterDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🏢 Center Details</Text>
        <Text style={styles.placeholder}>
          Facility details coming soon!
          {'\n\n'}Will show:
          {'\n'}• Contact information
          {'\n'}• Accepted materials
          {'\n'}• Operating hours
          {'\n'}• User reviews and ratings
        </Text>
      </View>
    </SafeAreaView>
  );
}

export function InquiriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>💬 Your Inquiries</Text>
        <Text style={styles.placeholder}>
          Inquiry management coming soon!
          {'\n\n'}Features:
          {'\n'}• Question submission
          {'\n'}• Response tracking
          {'\n'}• Facility communication
          {'\n'}• History management
        </Text>
      </View>
    </SafeAreaView>
  );
}

export function CreateInquiryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>✍️ Ask a Question</Text>
        <Text style={styles.placeholder}>
          Question submission form coming soon!
          {'\n\n'}Will include:
          {'\n'}• Facility selection
          {'\n'}• Question categories
          {'\n'}• Contact preferences
          {'\n'}• Attachment support
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});