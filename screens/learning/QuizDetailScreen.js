export function QuizDetailScreen({ route, navigation }) {
  const { quiz } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);

  // Sample quiz questions (in production, these would come from your database)
  const questions = [
    {
      id: 1,
      question: "Which recycling code represents PET plastic?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 0,
      explanation: "PET (Polyethylene Terephthalate) is represented by recycling code #1 and is commonly found in water bottles."
    },
    {
      id: 2,
      question: "What should you do before recycling a plastic container?",
      options: ["Leave food residue", "Rinse it clean", "Remove all labels", "Break it into pieces"],
      correctAnswer: 1,
      explanation: "Rinsing containers clean helps prevent contamination in the recycling process."
    },
    {
      id: 3,
      question: "Which plastic type is NOT commonly accepted in curbside recycling?",
      options: ["PET bottles", "HDPE containers", "Plastic bags (LDPE)", "Milk jugs"],
      correctAnswer: 2,
      explanation: "Plastic bags should be taken to special collection points at stores, not put in curbside recycling."
    }
  ];

  useEffect(() => {
    let timer;
    if (isQuizStarted && !isQuizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsQuizCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizStarted, isQuizCompleted, timeLeft]);

  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isQuizStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.quizPreview}>
          <View style={styles.quizPreviewHeader}>
            <Text style={styles.quizPreviewIcon}>{quiz.icon}</Text>
            <Text style={styles.quizPreviewTitle}>{quiz.title}</Text>
            <Text style={styles.quizPreviewDescription}>{quiz.description}</Text>
          </View>

          <View style={styles.quizStats}>
            <View style={styles.statItem}>
              <MaterialIcons name="quiz" size={24} color="#4CAF50" />
              <Text style={styles.statNumber}>{questions.length}</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="timer" size={24} color="#FF9800" />
              <Text style={styles.statNumber}>{Math.floor(quiz.timeLimit / 60)}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="star" size={24} color="#FFD700" />
              <Text style={styles.statNumber}>{quiz.xp}</Text>
              <Text style={styles.statLabel}>XP Reward</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
            <Text style={styles.startButtonText}>Start Quiz 🚀</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (isQuizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const xpEarned = Math.round((percentage / 100) * quiz.xp);
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Quiz Complete! 🎉</Text>
          
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreText}>{score}/{questions.length} correct</Text>
          </View>

          <View style={styles.resultsStats}>
            <View style={styles.resultStat}>
              <Text style={styles.resultStatNumber}>+{xpEarned}</Text>
              <Text style={styles.resultStatLabel}>XP Earned</Text>
            </View>
            <View style={styles.resultStat}>
              <Text style={styles.resultStatNumber}>{formatTime(quiz.timeLimit - timeLeft)}</Text>
              <Text style={styles.resultStatLabel}>Time Taken</Text>
            </View>
          </View>

          <View style={styles.resultsButtons}>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => {
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setScore(0);
                setIsQuizCompleted(false);
                setTimeLeft(quiz.timeLimit);
              }}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.continueButtonText}>Continue Learning</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      {/* Quiz Header */}
      <View style={styles.quizHeader}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill, 
              { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
            ]} />
          </View>
        </View>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQ.question}</Text>
      </View>

      {/* Answer Options */}
      <View style={styles.optionsContainer}>
        {currentQ.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && styles.selectedOption
            ]}
            onPress={() => selectAnswer(index)}
          >
            <View style={styles.optionContent}>
              <View style={[
                styles.optionCircle,
                selectedAnswer === index && styles.selectedCircle
              ]}>
                <Text style={styles.optionLetter}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={[
                styles.optionText,
                selectedAnswer === index && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            { opacity: selectedAnswer !== null ? 1 : 0.5 }
          ]}
          onPress={nextQuestion}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  // Learning Hub Styles
  header: {
    padding: 20,
    backgroundColor: 'white',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  levelText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  voiceButton: {
    backgroundColor: '#4CAF50',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statIcon: {
    fontSize: 16,
    marginTop: 4,
  },
  section: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  featuredCard: {
    backgroundColor: 'white',
    width: width * 0.8,
    marginRight: 15,
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  featuredIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  featuredIconText: {
    fontSize: 24,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  xpText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderTopWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // Quiz Styles
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  filterContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  quizzesList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  quizCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  quizIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  quizIcon: {
    fontSize: 24,
  },
  quizInfo: {
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
    lineHeight: 18,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  quizMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  xpContainer: {
    marginLeft: 'auto',
  },
  completedBy: {
    fontSize: 12,
    color: '#999',
  },

  // Quiz Detail Styles
  quizPreview: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  quizPreviewHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  quizPreviewIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  quizPreviewTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  quizPreviewDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  quizStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Quiz Active Styles
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  questionContainer: {
    padding: 30,
    backgroundColor: 'white',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 28,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    padding: 20,
  },
  optionButton: {
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  optionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  selectedCircle: {
    backgroundColor: '#4CAF50',
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedOptionText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  nextButtonContainer: {
    padding: 20,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Results Styles
  resultsContainer: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    borderWidth: 8,
    borderColor: '#4CAF50',
  },
  scorePercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  scoreText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  resultsStats: {
    flexDirection: 'row',
    marginBottom: 40,
    gap: 40,
  },
  resultStat: {
    alignItems: 'center',
  },
  resultStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  resultStatLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  resultsButtons: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
  retryButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  retryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});