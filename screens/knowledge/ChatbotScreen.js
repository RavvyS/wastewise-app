export function ChatbotScreen({ route }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm WasteBot 🤖 I can help you with waste disposal questions. Try asking me something like 'Where do I throw a juice box?'",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with query from navigation params
  useEffect(() => {
    if (route.params?.initialQuery) {
      setInputText(route.params.initialQuery);
      setTimeout(() => handleSend(route.params.initialQuery), 500);
    }
  }, [route.params]);

  const handleSend = async (text = inputText) => {
    if (text.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text.trim());
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userText) => {
    const text = userText.toLowerCase();

    // Simple rule-based responses (in production, use AI API)
    if (text.includes('juice box') || text.includes('tetra pak')) {
      return "Juice boxes (Tetra Paks) should go in the 🗂️ **Recycling Bin**! \n\n💡 **Tips:**\n• Rinse out any remaining liquid\n• No need to remove the straw\n• Flatten to save space\n\nThese are made from multiple materials (paper + plastic + aluminum) and are recyclable at most facilities! 🌱";
    }

    if (text.includes('plastic') || text.includes('bottle')) {
      return "For plastic items, look for the ♻️ **recycling symbol** with a number 1-7!\n\n**Most common:**\n• **#1 PET** (water bottles) → Recycling Bin ✅\n• **#2 HDPE** (milk jugs) → Recycling Bin ✅\n• **#5 PP** (yogurt cups) → Recycling Bin ✅\n\n📷 **Tip:** Use the camera scanner in the app to identify the exact type!";
    }

    if (text.includes('food') || text.includes('organic')) {
      return "Food waste should go in the 🍎 **Organic Bin** for composting!\n\n✅ **Yes:** Fruit peels, vegetables, coffee grounds, eggshells\n❌ **No:** Meat, dairy, oils (check local guidelines)\n\n🌱 This becomes nutrient-rich compost for gardens!";
    }

    if (text.includes('battery') || text.includes('electronic')) {
      return "Electronics and batteries need special handling! 🔋\n\n📱 **Electronics** → E-Waste collection\n🔋 **Batteries** → Hazardous Waste collection\n\n⚠️ **Never** put these in regular bins - they contain toxic materials that need special processing.\n\n📍 Check the Locations tab to find nearby e-waste centers!";
    }

    if (text.includes('glass')) {
      return "Glass items are highly recyclable! 🍶\n\n✅ **Recycling Bin or Glass Collection:**\n• Bottles and jars\n• Food containers\n\n💡 **Tips:**\n• Remove lids and caps\n• Rinse clean\n• Separate by color if required locally\n\n♻️ Glass can be recycled infinitely without quality loss!";
    }

    // Default response
    return `I'd love to help with that! 🤖 \n\nFor specific disposal guidance, try:\n• Describing the item (e.g., "plastic water bottle")\n• Asking about materials (e.g., "where does glass go?")\n• Using the 📷 camera scanner for instant identification\n\nIs there a specific item you need help disposing of?`;
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isBot ? styles.botMessage : styles.userMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.isBot ? styles.botMessageText : styles.userMessageText
      ]}>
        {item.text}
      </Text>
      <Text style={styles.messageTime}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <Text style={styles.chatHeaderTitle}>🤖 WasteBot Assistant</Text>
        <Text style={styles.chatHeaderSubtitle}>Ask me anything about waste disposal!</Text>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Typing Indicator */}
      {isTyping && (
        <View style={[styles.messageContainer, styles.botMessage]}>
          <Text style={styles.typingText}>WasteBot is typing...</Text>
        </View>
      )}

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about waste disposal..."
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.5 }]}
          onPress={() => handleSend()}
          disabled={inputText.trim() === ''}
        >
          <MaterialIcons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}