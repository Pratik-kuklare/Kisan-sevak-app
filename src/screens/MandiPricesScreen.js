import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { demoData } from '../constants/demoData';
import Header from '../components/Header';
import PriceCard from '../components/PriceCard';
import { Feather as Icon } from '@expo/vector-icons';

// Mandi prices screen
const MandiPricesScreen = ({ navigation }) => {
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState('सभी');

  const states = ['सभी', 'राजस्थान', 'उत्तर प्रदेश', 'महाराष्ट्र', 'मध्य प्रदेश', 'पंजाब'];
  const crops = ['सभी', 'गेहूं', 'चावल', 'कपास', 'सोयाबीन', 'गन्ना'];

  const filterByState = (state) => {
    if (state === 'all') return demoData.mandiPrices;
    return demoData.mandiPrices.filter(item => item.state.includes(state));
  };

  const filteredPrices = filterByState(selectedState).filter(
    item => selectedCrop === 'सभी' || item.crop === selectedCrop
  );
  const today = new Intl.DateTimeFormat('hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <View style={styles.container}>
      <Header title="मंडी भाव" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <View style={styles.dateContainer}>
            <Icon name="calendar" size={20} color={Colors.textSecondary} />
            <Text style={styles.dateText}>{today}</Text>
          </View>
          <Text style={styles.lastUpdate}>अंतिम अपडेट: 10:30 AM</Text>
        </View>

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {states.map((state, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterButton,
                  selectedState === (index === 0 ? 'all' : state) && styles.filterButtonActive
                ]}
                onPress={() => setSelectedState(index === 0 ? 'all' : state)}
              >
                <Text style={[
                  styles.filterText,
                  selectedState === (index === 0 ? 'all' : state) && styles.filterTextActive
                ]}>
                  {state}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.filterTitle}>फसल चुनें</Text>
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {crops.map((crop) => (
              <TouchableOpacity
                key={crop}
                style={[styles.filterButton, selectedCrop === crop && styles.filterButtonActive]}
                onPress={() => setSelectedCrop(crop)}
              >
                <Text style={[styles.filterText, selectedCrop === crop && styles.filterTextActive]}>
                  {crop}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹2,450</Text>
            <Text style={styles.statLabel}>औसत गेहूं दाम</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.success }]}>+2.1%</Text>
            <Text style={styles.statLabel}>साप्ताहिक बढ़त</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>सक्रिय मंडियाँ</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>आज के भाव</Text>

        {filteredPrices.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('MandiDetail', { item })}
          >
            <PriceCard
              crop={item.crop}
              price={item.price}
              change={item.change}
              market={item.market}
              state={item.state}
            />
          </TouchableOpacity>
        ))}

        <View style={styles.infoCard}>
          <Icon name="info" size={20} color={Colors.primaryGreen} />
          <Text style={styles.infoText}>
            भाव हर दिन सुबह 10:30 बजे अपडेट किए जाते हैं। ये दाम न्यूनतम समर्थन मूल्य से अधिक हो सकते हैं।
          </Text>
        </View>

        <View style={styles.trendsContainer}>
          <Text style={styles.trendsTitle}>बाजार के रुझान</Text>
          <View style={styles.trendCard}>
            <Icon name="trending-up" size={24} color={Colors.success} />
            <View style={styles.trendContent}>
              <Text style={styles.trendText}>गेहूं और चावल के दाम में बढ़ोतरी जारी</Text>
              <Text style={styles.trendSubtext}>मांग में वृद्धि के कारण</Text>
            </View>
          </View>
          <View style={styles.trendCard}>
            <Icon name="trending-down" size={24} color={Colors.errorRed} />
            <View style={styles.trendContent}>
              <Text style={styles.trendText}>कपास के दाम में मामूली गिरावट</Text>
              <Text style={styles.trendSubtext}>आपूर्ति में वृद्धि</Text>
            </View>
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
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginLeft: 8,
    fontFamily: 'Roboto',
  },
  lastUpdate: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.primaryGreen,
    borderColor: Colors.primaryGreen,
  },
  filterText: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  filterTextActive: {
    color: Colors.surfaceWhite,
    fontWeight: '500',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  sectionTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    fontFamily: 'Noto Sans',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGreen,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: Typography.caption,
    color: Colors.textPrimary,
    marginLeft: 12,
    fontFamily: 'Roboto',
  },
  trendsContainer: {
    marginBottom: 32,
  },
  trendsTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    fontFamily: 'Noto Sans',
  },
  trendCard: {
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
  trendContent: {
    flex: 1,
    marginLeft: 12,
  },
  trendText: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  trendSubtext: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
});

export default MandiPricesScreen;