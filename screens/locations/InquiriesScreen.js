export function InquiriesScreen({ navigation }) {
  const [inquiries] = useState([
    {
      id: 1,
      title: 'Electronics Drop-off Hours',
      question: 'What are the specific hours for electronics drop-off at EcoCenter?',
      centerName: 'EcoCenter Recycling Facility',
      status: 'answered',
      response: 'Electronics can be dropped off during regular hours: Mon-Fri 8AM-6PM, Sat 9AM-4PM. We also offer free pickup for large electronic items.',
      createdAt: '2024-08-20',
      respondedAt: '2024-08-20'
    },
    {
      id: 2,
      title: 'Plastic Bag Collection',
      question: 'Do you accept plastic shopping bags for recycling?',
      centerName: 'Metro Glass Collection Point',
      status: 'pending',
      response: null,
      createdAt: '2024-08-22',
      respondedAt: null
    },
    {
      id: 3,
      title: 'Battery Disposal',
      question: 'Can I bring car batteries to your facility?',
      centerName: 'TechRecycle E-Waste Center',
      status: 'answered',
      response: 'Yes! We accept all types of batteries including car batteries, phone batteries, and laptop batteries. Car batteries require a $5 disposal fee.',
      createdAt: '2024-08-18',
      respondedAt: '2024-08-19'
    }
  ]);

  const getStatusColor = (status) => {
    return status === 'answered' ? '#4CAF50' : '#FF9800';
  };

  const renderInquiryCard = ({ item }) => (
    <View style={styles.inquiryCard}>
      <View style={styles.inquiryHeader}>
        <Text style={styles.inquiryTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.centerName}>{item.centerName}</Text>
      <Text style={styles.inquiryQuestion}>{item.question}</Text>
      
      {item.response && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>Response:</Text>
          <Text style={styles.responseText}>{item.response}</Text>
        </View>
      )}
      
      <View style={styles.inquiryFooter}>
        <Text style={styles.dateText}>Asked: {item.createdAt}</Text>
        {item.respondedAt && (
          <Text style={styles.dateText}>Answered: {item.respondedAt}</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💬 My Inquiries</Text>
        <Text style={styles.headerSubtitle}>Questions and responses</Text>
      </View>

      {/* Create New Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateInquiry')}
      >
        <MaterialIcons name="add" size={20} color="white" />
        <Text style={styles.createButtonText}>Ask New Question</Text>
      </TouchableOpacity>

      {/* Inquiries List */}
      <FlatList
        data={inquiries}
        renderItem={renderInquiryCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.inquiriesList}
      />
    </SafeAreaView>
  );
}