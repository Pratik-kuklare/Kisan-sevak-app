import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { Feather as Icon } from '@expo/vector-icons';

// Card component for dashboard items
const Card = ({ title, subtitle, icon, color, onPress }) => {
  const getColor = () => {
    switch (color) {
      case 'primary': return Colors.primaryGreen;
      case 'secondary': return Colors.secondaryGreen;
      case 'amber': return Colors.accentAmber;
      case 'success': return Colors.success;
      default: return Colors.primaryGreen;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: getColor() + '20' }]}>
        <Icon name={icon} size={24} color={getColor()} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Icon name="chevron-right" size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
    fontFamily: 'Noto Sans',
  },
  subtitle: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
});

export default Card;