import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import Header from '../components/Header';

const MandiDetailScreen = ({ route, navigation }) => {
  const { item } = route.params || {};
  return (
    <View style={styles.container}>
      <Header title="लाइव मंडी विवरण" showBack onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        {!item ? <Text style={styles.error}>मंडी रिकॉर्ड उपलब्ध नहीं है।</Text> : (
          <View style={styles.card}>
            <Text style={styles.title}>{item.nameHindi}</Text>
            <Text style={styles.price}>₹{item.marketPrice}/क्विंटल</Text>
            <Text>मंडी: {item.market || 'उपलब्ध नहीं'}</Text>
            <Text>जिला: {item.district || 'उपलब्ध नहीं'}</Text>
            <Text>राज्य: {item.state || 'उपलब्ध नहीं'}</Text>
            <Text>न्यूनतम भाव: ₹{item.minPrice ?? 'उपलब्ध नहीं'}</Text>
            <Text>अधिकतम भाव: ₹{item.maxPrice ?? 'उपलब्ध नहीं'}</Text>
            <Text>MSP तुलना: {item.mspComparison}</Text>
            <Text>आवक तारीख: {item.arrivalDate || 'उपलब्ध नहीं'}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  card: { backgroundColor: Colors.surfaceWhite, borderRadius: 14, padding: 20, gap: 12 },
  title: { color: Colors.textPrimary, fontSize: Typography.title, fontWeight: 'bold' },
  price: { color: Colors.primaryGreen, fontSize: 28, fontWeight: 'bold' },
  error: { color: Colors.errorRed },
});

export default MandiDetailScreen;
