import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { Colors, Typography } from '../constants/colors';
import Header from '../components/Header';
import { Feather as Icon } from '@expo/vector-icons';

// AI Chat screen
const AIChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'नमस्ते! मैं किसान सेवक AI हूँ। आप कृषि से संबंधित कोई भी प्रश्न पूछ सकते हैं।', isUser: false, time: '10:00 AM' },
    { id: 2, text: 'गेहूं की फसल में पीले धब्बे क्यों आ रहे हैं?', isUser: true, time: '10:02 AM' },
    { id: 3, text: 'गेहूं में पीले धब्बे कई कारणों से हो सकते हैं: 1. पोषक तत्वों की कमी 2. फंगल रोग 3. कीटों का हमला। कृपया तस्वीर भेजकर सटीक निदान कराएं।', isUser: false, time: '10:03 AM' },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    const staticReplies = [
      'आपकी फसल के लिए प्रोपिकोनाजोल 25% का छिड़काव करें।',
      'मौसम के अनुसार अगले 3 दिन सिंचाई न करें।',
      'नाइट्रोजन खाद 2 सप्ताह बाद डालें।',
      'नजदीकी KVK से संपर्क करने की सलाह दी जाती है।',
    ];

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: staticReplies[Math.floor(Math.random() * staticReplies.length)],
        isUser: false,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const quickQuestions = [
    'गेहूं की सिंचाई कब करें?',
    'कीटनाशक का छिड़काव कैसे करें?',
    'सबसे अच्छी खाद कौन सी है?',
    'बारिश का पूर्वानुमान क्या है?',
    'गेहूं का बाजार भाव क्या है?',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title="AI सलाहकार" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView
        style={styles.chatContainer}
        ref={ref => ref?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeCard}>
          <Icon name="message-circle" size={32} color={Colors.primaryGreen} />
          <Text style={styles.welcomeTitle}>AI कृषि सलाहकार</Text>
          <Text style={styles.welcomeText}>
            फसल, मौसम, कीटनाशक, खाद, बाजार भाव - कोई भी प्रश्न पूछें। हिंदी में बात करें।
          </Text>
        </View>

        <Text style={styles.quickQuestionsTitle}>त्वरित प्रश्न</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickQuestionsContainer}>
          {quickQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickQuestionButton}
              onPress={() => setInputText(question)}
            >
              <Text style={styles.quickQuestionText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.aiMessage
            ]}
          >
            <View style={[
              styles.messageBubble,
              message.isUser ? styles.userBubble : styles.aiBubble
            ]}>
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userText : styles.aiText
              ]}>
                {message.text}
              </Text>
            </View>
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="अपना प्रश्न यहाँ टाइप करें..."
          placeholderTextColor={Colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={20} color={Colors.surfaceWhite} />
        </TouchableOpacity>
      </View>

      <View style={styles.featuresContainer}>
        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('CropDisease')}>
          <Icon name="camera" size={20} color={Colors.primaryGreen} />
          <Text style={styles.featureText}>तस्वीर भेजें</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('MandiPrices')}>
          <Icon name="shopping-cart" size={20} color={Colors.primaryGreen} />
          <Text style={styles.featureText}>बाजार भाव</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('WeatherAdvisory')}>
          <Icon name="cloud" size={20} color={Colors.primaryGreen} />
          <Text style={styles.featureText}>मौसम</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  welcomeCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
    fontFamily: 'Noto Sans',
  },
  welcomeText: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Roboto',
  },
  quickQuestionsTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    fontFamily: 'Noto Sans',
  },
  quickQuestionsContainer: {
    marginBottom: 20,
  },
  quickQuestionButton: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickQuestionText: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: Colors.primaryGreen,
  },
  aiBubble: {
    backgroundColor: Colors.surfaceWhite,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  messageText: {
    fontSize: Typography.body,
    lineHeight: 22,
    fontFamily: 'Roboto',
  },
  userText: {
    color: Colors.surfaceWhite,
  },
  aiText: {
    color: Colors.textPrimary,
  },
  messageTime: {
    fontSize: Typography.label,
    color: Colors.textSecondary,
    marginTop: 4,
    fontFamily: 'Roboto',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.surfaceWhite,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: Typography.body,
    color: Colors.textPrimary,
    fontFamily: 'Roboto',
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: Colors.surfaceWhite,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  featureButton: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: Typography.label,
    color: Colors.textSecondary,
    marginTop: 4,
    fontFamily: 'Roboto',
  },
});

export default AIChatScreen;