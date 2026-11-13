import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import Header from '../components/Header';
import PriceCard from '../components/PriceCard';
import { api } from '../services/api';

const MandiPricesScreen = ({ navigation }) => {
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getMandiPrices().then((result) => setPrices(result.prices)).catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <View style={styles.container}>
      <Header title="लाइव मंडी भाव" showBack onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>संदर्भ मंडी भाव (लाइव अपडेट उपलब्ध नहीं)</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {!prices.length && !error ? <ActivityIndicator color={Colors.primaryGreen} /> : null}
        {prices.map((item, index) => (
          <TouchableOpacity key={`${item.crop}-${item.market}-${index}`} onPress={() => navigation.navigate('MandiDetail', { item })}>
            <PriceCard
              crop={item.hindi}
              price={item.price ? `₹${item.price}/क्विंटल` : 'उपलब्ध नहीं'}
              change={item.mspComparison}
              market={item.mandi}
              state={item.state === 'national' ? 'राष्ट्रीय औसत' : item.state}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  subtitle: { color: Colors.textSecondary, marginBottom: 18 },
  error: { color: Colors.errorRed, backgroundColor: Colors.surfaceWhite, padding: 16, borderRadius: 10, marginBottom: 16 },
});

export default MandiPricesScreen;
