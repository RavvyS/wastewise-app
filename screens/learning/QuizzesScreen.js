export function QuizzesScreen({ route, navigation }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Expert'];
  
  const quizzes = [
    {
      id: 1,
      title: 'Plastic Basics',
      description: 'Learn about common plastic types and their recycling codes',
      difficulty: 'Beginner',
      questions: 10,
      timeLimit: 300, // 5 minutes
      xp: 50,
      completedBy: 1245,
      rating: 4.8,
      icon: '♻️'
    },
    {
      id: 2,
      title: 'Composting Mastery',
      description: 'Advanced composting techniques and organic waste management',
      difficulty: 'Expert',
      questions: 15,
      timeLimit: 600,
      xp: 150,
      completedBy: 432,
      rating: 4.9,
      icon: '🌱'
    },
    {
      id: 3,
      title: 'E-Waste Disposal',
      description: 'Proper handling of electronic waste and precious metals',
      difficulty: 'Intermediate',
      questions: 12,
      timeLimit: 480,
      xp: 100,
      completedBy: 876,
      rating: 4.7,
      icon: '📱'
    },
    {
      id: 4,
      title: 'Glass Recycling',
      description: 'Understanding glass types and recycling processes',
      difficulty: 'Beginner',
      questions: 8,
      timeLimit: 240,
      xp: 40,
      completedBy: 2134,
      rating: 4.6,
      icon: '🍶'
    },
    {
      id: 5,
      title: 'Hazardous Materials',
      description: 'Identifying and safely disposing of dangerous waste',
      difficulty: 'Expert',
      questions: 20,
      timeLimit: 900,
      xp: 200,
      completedBy: 234,
      rating: 4.9,
      icon: '⚠️'
    }
  ];

  const filteredQuizzes = selectedDifficulty === 'All' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Expert': return '#F44336';
      default: return '#666';
    }
  };

  const renderQuizCard = (quiz) => (
    <TouchableOpacity
      key={quiz.id}
      style={styles.quizCard}
      onPress={() => navigation.navigate('QuizDetail', { quiz })}
    >
      <View style={styles.quizHeader}>
        <View style={styles.quizIconContainer}>
          <Text style={styles.quizIcon}>{quiz.icon}</Text>
        </View>
        <View style={styles.quizInfo}>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          <Text style={styles.quizDescription}>{quiz.description}</Text>
        </View>
        <View style={[
          styles.difficultyBadge,
          { backgroundColor: getDifficultyColor(quiz.difficulty) }
        ]}>
          <Text style={styles.difficultyText}>{quiz.difficulty}</Text>
        </View>
      </View>
      
      <View style={styles.quizMeta}>
        <View style={styles.metaItem}>
          <MaterialIcons name="quiz" size={16} color="#666" />
          <Text style={styles.metaText}>{quiz.questions} questions</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialIcons name="timer" size={16} color="#666" />
          <Text style={styles.metaText}>{Math.floor(quiz.timeLimit / 60)} min</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.metaText}>{quiz.rating}</Text>
        </View>
        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>+{quiz.xp} XP</Text>
        </View>
      </View>
      
      <Text style={styles.completedBy}>
        Completed by {quiz.completedBy.toLocaleString()} learners
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🧩 Knowledge Quizzes</Text>
        <Text style={styles.headerSubtitle}>Test your waste management knowledge</Text>
      </View>

      {/* Difficulty Filter */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={[
                styles.filterButton,
                selectedDifficulty === difficulty && styles.filterButtonActive
              ]}
              onPress={() => setSelectedDifficulty(difficulty)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedDifficulty === difficulty && styles.filterButtonTextActive
              ]}>
                {difficulty}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quizzes List */}
      <ScrollView style={styles.quizzesList} showsVerticalScrollIndicator={false}>
        {filteredQuizzes.map(renderQuizCard)}
      </ScrollView>
    </SafeAreaView>
  );
}