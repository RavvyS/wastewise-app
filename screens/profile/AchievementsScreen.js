// screens/profile/AchievementsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function AchievementsScreen() {
  const achievements = [
    {
      id: 1,
      title: 'First Scanner',
      description: 'Scanned your first recycling symbol',
      icon: '🔍',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Eco Warrior',
      description: 'Logged 50 waste items',
      icon: '♻️',
      earned: true,
      date: '2024-01-20'
    },
    {
      id: 3,
      title: 'Knowledge Seeker',
      description: 'Read 10 educational articles',
      icon: '📚',
      earned: false,
      progress: '7/10'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🏆 Your Achievements</Text>
        
        {achievements.map(achievement => (
          <View key={achievement.id} style={[
            styles.achievementCard,
            !achievement.earned && styles.lockedCard
          ]}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              {achievement.earned ? (
                <Text style={styles.earnedDate}>Earned: {achievement.date}</Text>
              ) : (
                <Text style={styles.progress}>Progress: {achievement.progress}</Text>
              )}
            </View>
            {achievement.earned && (
              <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  lockedCard: {
    opacity: 0.6,
    backgroundColor: '#f8f8f8',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  earnedDate: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  progress: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
  },
});

// screens/knowledge/RecyclingGuideScreen.js
export function RecyclingGuideScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>♻️ Recycling Guide</Text>
        <Text style={styles.subtitle}>Quick reference for proper disposal</Text>
        
        <View style={styles.guideSection}>
          <Text style={styles.sectionTitle}>Basic Rules</Text>
          <Text style={styles.rule}>• Clean containers before recycling</Text>
          <Text style={styles.rule}>• Remove caps and lids when required</Text>
          <Text style={styles.rule}>• Check local recycling guidelines</Text>
          <Text style={styles.rule}>• When in doubt, throw it out</Text>
        </View>

        <View style={styles.guideSection}>
          <Text style={styles.sectionTitle}>Bin Colors</Text>
          <View style={styles.binInfo}>
            <View style={[styles.binIndicator, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.binText}>Green: Recyclables</Text>
          </View>
          <View style={styles.binInfo}>
            <View style={[styles.binIndicator, { backgroundColor: '#8BC34A' }]} />
            <Text style={styles.binText}>Brown: Organic waste</Text>
          </View>
          <View style={styles.binInfo}>
            <View style={[styles.binIndicator, { backgroundColor: '#757575' }]} />
            <Text style={styles.binText}>Black: General waste</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// screens/chat/ChatbotScreen.js
export default function ChatbotScreen({ route, navigation }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm WasteBot 🤖 How can I help you with waste disposal today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simple bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: `Thanks for your question: "${inputText}". I'm still learning! For now, you can use the camera to scan items or check the knowledge section.`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>🤖 WasteBot</Text>
      </View>
      
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.isBot ? styles.botBubble : styles.userBubble
          ]}>
            <Text style={[
              styles.messageText,
              item.isBot ? styles.botText : styles.userText
            ]}>
              {item.text}
            </Text>
          </View>
        )}
        style={styles.messagesList}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about waste disposal..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}