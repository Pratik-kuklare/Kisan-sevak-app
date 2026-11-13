import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import Header from '../components/Header';
import Icon from '../components/AppIcon';
import { api } from '../services/api';

const AIChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    const message = inputText.trim();
    if (!message || loading) return;
    setMessages((current) => [...current, { text: message, isUser: true }]);
    setInputText('');
    setLoading(true);
    setError('');
    try {
      const result = await api.sendChat(message);
      setMessages((current) => [...current, { text: result.response, isUser: false }]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header title="AI सलाहकार" showBack onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.chat}>
        {!messages.length ? <Text style={styles.empty}>कृषि से जुड़ा अपना प्रश्न पूछें।</Text> : null}
        {messages.map((message, index) => <View key={index} style={[styles.bubble, message.isUser ? styles.user : styles.ai]}><Text>{message.text}</Text></View>)}
        {loading ? <ActivityIndicator color={Colors.primaryGreen} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={inputText} onChangeText={setInputText} placeholder="अपना प्रश्न यहाँ लिखें..." multiline />
        <TouchableOpacity style={styles.send} onPress={sendMessage}><Icon name="send" size={20} color={Colors.surfaceWhite} /></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  chat: { flex: 1, padding: 16 },
  empty: { color: Colors.textSecondary, textAlign: 'center', marginTop: 30 },
  bubble: { padding: 14, borderRadius: 16, marginBottom: 12, maxWidth: '85%' },
  user: { alignSelf: 'flex-end', backgroundColor: '#D5EED7' },
  ai: { alignSelf: 'flex-start', backgroundColor: Colors.surfaceWhite },
  inputRow: { flexDirection: 'row', padding: 12, backgroundColor: Colors.surfaceWhite },
  input: { flex: 1, borderWidth: 1, borderColor: Colors.border, borderRadius: 20, paddingHorizontal: 16, maxHeight: 90 },
  send: { backgroundColor: Colors.primaryGreen, borderRadius: 24, width: 46, height: 46, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  error: { color: Colors.errorRed, marginTop: 12 },
});

export default AIChatScreen;
