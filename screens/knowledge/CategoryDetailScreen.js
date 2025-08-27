export function CategoryDetailScreen({ route, navigation }) {
  const { category } = route.params;

  const renderItemCard = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name || item.fullName}</Text>
        <View style={[
          styles.recyclableIndicator,
          { backgroundColor: item.recyclable ? '#4CAF50' : '#F44336' }
        ]}>
          <Text style={styles.recyclableText}>
            {item.recyclable ? '♻️' : '❌'}
          </Text>
        </View>
      </View>
      <Text style={styles.itemBin}>🗂️ {item.binType}</Text>
      {item.description && (
        <Text style={styles.itemDescription}>{item.description}</Text>
      )}
      {item.tips && (
        <View style={styles.itemTips}>
          <Text style={styles.tipsTitle}>💡 Tips:</Text>
          {item.tips.slice(0, 2).map((tip, index) => (
            <Text key={index} style={styles.tipText}>• {tip}</Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Category Header */}
      <View style={[styles.categoryDetailHeader, { borderBottomColor: category.color }]}>
        <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
          <Text style={[styles.categoryIconText, { color: category.color }]}>
            {category.icon}
          </Text>
        </View>
        <View style={styles.categoryDetailInfo}>
          <Text style={styles.categoryDetailName}>{category.name}</Text>
          <Text style={styles.categoryDetailDescription}>{category.description}</Text>
          <Text style={styles.categoryDetailCount}>
            {category.itemCount} items in this category
          </Text>
        </View>
      </View>

      {/* Items List */}
      <FlatList
        data={category.items}
        renderItem={renderItemCard}
        keyExtractor={(item, index) => `${item.name || item.fullName}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.itemsList}
      />

      {/* Action Button */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.askButton}
          onPress={() => navigation.navigate('Chatbot', { 
            initialQuery: `How do I dispose of ${category.name.toLowerCase()}?` 
          })}
        >
          <MaterialIcons name="chat" size={20} color="white" />
          <Text style={styles.askButtonText}>Ask About This Category</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}