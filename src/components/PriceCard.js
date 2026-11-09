import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { Feather as Icon } from '@expo/vector-icons';

// Price card for mandi prices
const PriceCard = ({ crop, price, change, market, state }) => {
  const isPositive = change.startsWith('+');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.cropName}>{crop}</Text>
          <Text style={styles.market}>{market}, {state}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
          <View style={[styles.changeBadge, { backgroundColor: isPositive ? Colors.success + '20' : Colors.errorRed + '20' }]}>
            <Icon
              name={isPositive ? 'trending-up' : 'trending-down'}
              size={12}
              color={isPositive ? Colors.success : Colors.errorRed}
            />
            <Text style={[styles.changeText, { color: isPositive ? Colors.success : Colors.errorRed }]}>
              {change}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.updateText}>आखिरी अपडेट: आज सुबह 10:30</Text>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>विवरण देखें</Text>
        </TouchableOpacity>
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cropName: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
    fontFamily: 'Noto Sans',
  },
  market: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: Typography.subtitle,
    fontWeight: 'bold',
    color: Colors.primaryGreen,
    marginBottom: 4,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    fontSize: Typography.label,
    fontWeight: '500',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  updateText: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  detailButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.lightGreen,
    borderRadius: 16,
  },
  detailButtonText: {
    fontSize: Typography.label,
    color: Colors.primaryGreen,
    fontWeight: '500',
  },
});

export default PriceCard;