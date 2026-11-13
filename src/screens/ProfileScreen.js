import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import Header from '../components/Header';

const ProfileScreen = () => (
  <View style={styles.container}>
    <Header title="प्रोफाइल" />
    <ScrollView style={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>किसान प्रोफाइल</Text>
        <Text style={styles.text}>अपनी प्रोफाइल बनाने के लिए backend API पर POST /api/profile का उपयोग करें।</Text>
        <Text style={styles.text}>प्रोफाइल फोन नंबर से GET /api/profile/:phone पर उपलब्ध होगी।</Text>
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  card: { backgroundColor: Colors.surfaceWhite, borderRadius: 14, padding: 20 },
  title: { color: Colors.textPrimary, fontSize: Typography.title, fontWeight: 'bold', marginBottom: 16 },
  text: { color: Colors.textSecondary, lineHeight: 24, marginBottom: 10 },
});

export default ProfileScreen;
