import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import Header from '../components/Header';
import Card from '../components/Card';
import Icon from '../components/AppIcon';
import { api } from '../services/api';

const cards = [
  { id: 'disease', title: 'फसल बीमारी जांच', subtitle: 'तस्वीर से पहचानें', icon: 'leaf', color: 'success', screen: 'CropDisease' },
  { id: 'mandi', title: 'मंडी भाव', subtitle: 'लाइव दाम देखें', icon: 'shopping-cart', color: 'amber', screen: 'MandiPrices' },
  { id: 'weather', title: 'मौसम सलाह', subtitle: 'वर्तमान मौसम देखें', icon: 'cloud', color: 'primary', screen: 'WeatherAdvisory' },
  { id: 'chat', title: 'AI सलाहकार', subtitle: 'प्रश्न पूछें', icon: 'message-circle', color: 'secondary', screen: 'AIChat' },
];

const HomeScreen = ({ navigation }) => {
  const [weather, setWeather] = useState(null);
  const [mandi, setMandi] = useState(null);
  useEffect(() => {
    api.getWeather({ city: 'Pune' }).then(setWeather).catch(() => {});
    api.getMandiPrices().then((result) => setMandi(result.prices[0])).catch(() => {});
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <Header title="किसान सेवक" />
      <ScrollView style={styles.content}>
        <Text style={styles.welcome}>नमस्ते, किसान जी!</Text>
        <Text style={styles.subtitle}>लाइव कृषि जानकारी</Text>
        <View style={styles.stats}>
          <View style={styles.stat}><Icon name="sun" size={22} color={Colors.accentAmber} /><Text style={styles.value}>{weather ? `${Math.round(weather.temperature)}°C` : '--'}</Text><Text>तापमान</Text></View>
          <View style={styles.stat}><Icon name="trending-up" size={22} color={Colors.success} /><Text style={styles.value}>{mandi?.marketPrice ? `₹${mandi.marketPrice}` : '--'}</Text><Text>मंडी भाव</Text></View>
          <View style={styles.stat}><Icon name="droplet" size={22} color={Colors.primaryGreen} /><Text style={styles.value}>{weather ? `${weather.humidity}%` : '--'}</Text><Text>नमी</Text></View>
        </View>
        <Text style={styles.section}>सेवाएं</Text>
        {cards.map((card) => <Card key={card.id} {...card} onPress={() => navigation.navigate(card.screen)} />)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  welcome: { fontSize: Typography.title, fontWeight: 'bold', color: Colors.textPrimary, marginTop: 20 },
  subtitle: { color: Colors.textSecondary, marginBottom: 20 },
  stats: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  stat: { flex: 1, alignItems: 'center', backgroundColor: Colors.surfaceWhite, borderRadius: 12, padding: 12 },
  value: { fontSize: 18, fontWeight: 'bold', marginVertical: 6, color: Colors.textPrimary },
  section: { fontSize: Typography.subtitle, fontWeight: '600', marginBottom: 12, color: Colors.textPrimary },
});

export default HomeScreen;
