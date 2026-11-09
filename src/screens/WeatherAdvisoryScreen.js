import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { demoData } from '../constants/demoData';
import Header from '../components/Header';
import WeatherCard from '../components/WeatherCard';
import { Feather as Icon } from '@expo/vector-icons';

// Weather advisory screen
const WeatherAdvisoryScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState('today');
  
  const forecastStart = new Date();
  const weatherData = demoData.weatherForecast.map((weather, index) => {
    const forecastDate = new Date(forecastStart);
    forecastDate.setDate(forecastStart.getDate() + index);

    return {
      ...weather,
      day: index === 0
        ? 'आज'
        : index === 1
          ? 'कल'
          : new Intl.DateTimeFormat('hi-IN', { weekday: 'short' }).format(forecastDate),
      date: new Intl.DateTimeFormat('hi-IN', {
        day: 'numeric',
        month: 'long',
      }).format(forecastDate),
    };
  });
  const todayWeather = weatherData[0];
  
  const advisories = [
    {
      id: 1,
      type: 'irrigation',
      title: 'सिंचाई सलाह',
      description: 'आज सुबह 10-12 बजे के बीच सिंचाई करना सबसे उपयुक्त रहेगा।',
      icon: 'droplet',
      color: Colors.primaryGreen,
    },
    {
      id: 2,
      type: 'pesticide',
      title: 'कीटनाशक सलाह',
      description: 'हवा की गति कम होने पर कीटनाशक का छिड़काव करें।',
      icon: 'shield',
      color: Colors.secondaryGreen,
    },
    {
      id: 3,
      type: 'harvest',
      title: 'कटाई सलाह',
      description: 'अगले 3 दिन कटाई के लिए उपयुक्त नहीं हैं।',
      icon: 'scissors',
      color: Colors.accentAmber,
    },
    {
      id: 4,
      type: 'fertilizer',
      title: 'खाद सलाह',
      description: 'बारिश से पहले नाइट्रोजनयुक्त खाद डालने से बचें।',
      icon: 'package',
      color: Colors.success,
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="मौसम सलाह" showBack onBackPress={() => navigation.goBack()} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.currentWeather}>
          <View style={styles.locationContainer}>
            <Icon name="map-pin" size={20} color={Colors.textSecondary} />
            <Text style={styles.locationText}>आपका गाँव, राजस्थान</Text>
          </View>
          
          <View style={styles.weatherMain}>
            <Icon name="sun" size={64} color={Colors.accentAmber} />
            <Text style={styles.temperature}>{todayWeather.temp}</Text>
            <Text style={styles.condition}>{todayWeather.condition}</Text>
          </View>
          
          <View style={styles.weatherDetails}>
            <View style={styles.detailItem}>
              <Icon name="wind" size={20} color={Colors.textSecondary} />
              <Text style={styles.detailValue}>12 km/h</Text>
              <Text style={styles.detailLabel}>हवा की गति</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="droplet" size={20} color={Colors.textSecondary} />
              <Text style={styles.detailValue}>45%</Text>
              <Text style={styles.detailLabel}>नमी</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="cloud" size={20} color={Colors.textSecondary} />
              <Text style={styles.detailValue}>10%</Text>
              <Text style={styles.detailLabel}>बादल</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>7 दिन का पूर्वानुमान</Text>
        
        {weatherData.map((weather, index) => (
          <WeatherCard
            key={index}
            day={weather.day}
            date={weather.date}
            temp={weather.temp}
            condition={weather.condition}
            icon={weather.icon}
            advice={weather.advice}
          />
        ))}
        
        <Text style={styles.sectionTitle}>कृषि सलाह</Text>
        
        {advisories.map((advisory) => (
          <View key={advisory.id} style={styles.advisoryCard}>
            <View style={[styles.advisoryIcon, { backgroundColor: advisory.color + '20' }]}>
              <Icon name={advisory.icon} size={20} color={advisory.color} />
            </View>
            <View style={styles.advisoryContent}>
              <Text style={styles.advisoryTitle}>{advisory.title}</Text>
              <Text style={styles.advisoryDescription}>{advisory.description}</Text>
            </View>
          </View>
        ))}
        
        <View style={styles.alertsContainer}>
          <View style={styles.alertHeader}>
            <Icon name="alert-triangle" size={20} color={Colors.errorRed} />
            <Text style={styles.alertTitle}>महत्वपूर्ण चेतावनी</Text>
          </View>
          <Text style={styles.alertText}>
            कल शाम से हल्की बारिश की संभावना है। फसल को ढकने और जल निकासी की व्यवस्था कर लें।
            कीटनाशक का छिड़काव आज ही पूरा कर लें।
          </Text>
        </View>
        
        <View style={styles.agriculturalInfo}>
          <Text style={styles.infoTitle}>कृषि कैलेंडर</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>मार्च के लिए सुझाव</Text>
            <Text style={styles.infoCardText}>
              • गेहूं की फसल में अंतिम सिंचाई करें{'\n'}
              • गन्ने की रोपाई शुरू करें{'\n'}
              • सब्जियों की नर्सरी तैयार करें{'\n'}
              • बागवानी फसलों में खाद डालें
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  currentWeather: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginLeft: 8,
    fontFamily: 'Roboto',
  },
  weatherMain: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginVertical: 8,
  },
  condition: {
    fontSize: Typography.subtitle,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailValue: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  sectionTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    fontFamily: 'Noto Sans',
  },
  advisoryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  advisoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  advisoryContent: {
    flex: 1,
  },
  advisoryTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
    fontFamily: 'Noto Sans',
  },
  advisoryDescription: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  alertsContainer: {
    backgroundColor: Colors.errorRed + '10',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.errorRed,
    marginLeft: 8,
    fontFamily: 'Noto Sans',
  },
  alertText: {
    fontSize: Typography.caption,
    color: Colors.textPrimary,
    lineHeight: 20,
    fontFamily: 'Roboto',
  },
  agriculturalInfo: {
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    fontFamily: 'Noto Sans',
  },
  infoCard: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 12,
    padding: 16,
  },
  infoCardTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.primaryGreen,
    marginBottom: 8,
    fontFamily: 'Noto Sans',
  },
  infoCardText: {
    fontSize: Typography.caption,
    color: Colors.textPrimary,
    lineHeight: 20,
    fontFamily: 'Roboto',
  },
});

export default WeatherAdvisoryScreen;