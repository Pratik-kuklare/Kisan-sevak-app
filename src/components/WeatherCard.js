import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { Feather as Icon } from '@expo/vector-icons';

// Weather card for forecast
const WeatherCard = ({ day, date, temp, condition, icon, advice }) => {
  const getIconName = () => {
    switch (icon) {
      case 'sun': return 'sun';
      case 'cloud': return 'cloud';
      case 'cloud-rain': return 'cloud-rain';
      case 'wind': return 'wind';
      default: return 'cloud';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.tempContainer}>
          <Icon name={getIconName()} size={24} color={Colors.primaryGreen} />
          <Text style={styles.temp}>{temp}</Text>
        </View>
      </View>
      <Text style={styles.condition}>{condition}</Text>
      <View style={styles.adviceContainer}>
        <Icon name="alert-circle" size={16} color={Colors.accentAmber} />
        <Text style={styles.advice}>{advice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  day: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
    fontFamily: 'Noto Sans',
  },
  date: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temp: {
    fontSize: Typography.subtitle,
    fontWeight: 'bold',
    color: Colors.primaryGreen,
    marginLeft: 8,
  },
  condition: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginBottom: 12,
    fontFamily: 'Roboto',
  },
  adviceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.accentAmber + '10',
    padding: 12,
    borderRadius: 8,
  },
  advice: {
    flex: 1,
    fontSize: Typography.caption,
    color: Colors.textPrimary,
    marginLeft: 8,
    fontFamily: 'Roboto',
  },
});

export default WeatherCard;