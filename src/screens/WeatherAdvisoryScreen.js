import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Colors, Typography } from '../constants/colors';
import Header from '../components/Header';
import Icon from '../components/AppIcon';
import { api } from '../services/api';

const WeatherAdvisoryScreen = ({ navigation }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) throw new Error('स्थानीय मौसम के लिए लोकेशन अनुमति आवश्यक है');
      const position = await Location.getCurrentPositionAsync({});
      return api.getWeather({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    })().then(setWeather).catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <View style={styles.container}>
      <Header title="मौसम सलाह" showBack onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {!weather && !error ? <ActivityIndicator color={Colors.primaryGreen} /> : null}
        {weather ? (
          <>
            <View style={styles.card}>
              <Text style={styles.location}>📍 {weather.city}</Text>
              <Text style={styles.temperature}>{Math.round(weather.temperature)}°C</Text>
              <Text style={styles.condition}>{weather.description}</Text>
              <View style={styles.details}>
                <Text>💧 नमी: {weather.humidity}%</Text>
                <Text>💨 हवा: {weather.windSpeed} m/s</Text>
                <Text>🌧 बारिश: {weather.rainForecast.millimeters} mm</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>कृषि सलाह</Text>
            {weather.farmingAdvice.map((advice) => (
              <View key={advice} style={styles.advice}><Icon name="leaf" size={20} color={Colors.primaryGreen} /><Text style={styles.adviceText}>{advice}</Text></View>
            ))}
            <Text style={styles.sectionTitle}>7 दिन का पूर्वानुमान</Text>
            {weather.forecast.map((day) => (
              <View key={day.date} style={styles.forecast}>
                <Text style={styles.forecastDate}>{day.date}</Text>
                <Text>{Math.round(day.minTemperature)}° - {Math.round(day.maxTemperature)}°C</Text>
                <Text>बारिश: {day.rainProbability}% ({day.rainMillimeters} mm)</Text>
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  card: { backgroundColor: Colors.surfaceWhite, borderRadius: 16, padding: 24, alignItems: 'center' },
  location: { color: Colors.textSecondary, fontSize: Typography.body },
  temperature: { color: Colors.textPrimary, fontSize: 48, fontWeight: 'bold', marginVertical: 12 },
  condition: { color: Colors.textSecondary, fontSize: Typography.subtitle },
  details: { width: '100%', gap: 12, marginTop: 24 },
  sectionTitle: { color: Colors.textPrimary, fontSize: Typography.subtitle, fontWeight: '600', marginVertical: 20 },
  advice: { backgroundColor: Colors.surfaceWhite, borderRadius: 12, padding: 16, flexDirection: 'row', marginBottom: 10 },
  adviceText: { flex: 1, color: Colors.textPrimary, marginLeft: 12, lineHeight: 22 },
  forecast: { backgroundColor: Colors.surfaceWhite, borderRadius: 10, padding: 14, marginBottom: 8, gap: 5 },
  forecastDate: { color: Colors.primaryGreen, fontWeight: '600' },
  error: { color: Colors.errorRed, padding: 16 },
});

export default WeatherAdvisoryScreen;
