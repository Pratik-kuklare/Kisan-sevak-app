import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import Header from '../components/Header';
import { Feather as Icon } from '@expo/vector-icons';

// Mandi detail screen
const MandiDetailScreen = ({ route, navigation }) => {
  const { item } = route.params || {
    crop: 'गेहूं',
    price: '₹2,450/क्विंटल',
    change: '+2.5%',
    market: 'अजमेर मंडी',
    state: 'राजस्थान',
  };

  const priceHistory = [
    { day: 'आज', price: '₹2,450', change: '+2.5%' },
    { day: 'कल', price: '₹2,390', change: '+1.8%' },
    { day: '2 दिन', price: '₹2,350', change: '-0.5%' },
    { day: '3 दिन', price: '₹2,360', change: '+0.4%' },
    { day: '4 दिन', price: '₹2,340', change: '-0.8%' },
    { day: '5 दिन', price: '₹2,370', change: '+1.3%' },
    { day: '6 दिन', price: '₹2,340', change: '-1.2%' },
  ];

  const nearbyMarkets = [
    { name: 'जयपुर मंडी', price: '₹2,480', distance: '150 किमी' },
    { name: 'कोटा मंडी', price: '₹2,430', distance: '180 किमी' },
    { name: 'उदयपुर मंडी', price: '₹2,460', distance: '200 किमी' },
    { name: 'बीकानेर मंडी', price: '₹2,420', distance: '250 किमी' },
  ];

  const isPositive = item.change.startsWith('+');

  return (
    <View style={styles.container}>
      <Header title="मंडी विवरण" showBack onBackPress={() => navigation.goBack()} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.cropHeader}>
            <View style={styles.cropIcon}>
              <Icon name="shopping-cart" size={32} color={Colors.surfaceWhite} />
            </View>
            <View style={styles.cropInfo}>
              <Text style={styles.cropName}>{item.crop}</Text>
              <Text style={styles.marketName}>{item.market}, {item.state}</Text>
            </View>
          </View>
          
          <View style={styles.priceSection}>
            <Text style={styles.currentPrice}>{item.price}</Text>
            <View style={[styles.changeBadge, { backgroundColor: isPositive ? Colors.success + '20' : Colors.errorRed + '20' }]}>
              <Icon 
                name={isPositive ? 'trending-up' : 'trending-down'} 
                size={16} 
                color={isPositive ? Colors.success : Colors.errorRed} 
              />
              <Text style={[styles.changeText, { color: isPositive ? Colors.success : Colors.errorRed }]}>
                {item.change}
              </Text>
            </View>
          </View>
          
          <Text style={styles.lastUpdate}>अंतिम अपडेट: आज सुबह 10:30 बजे</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹2,550</Text>
            <Text style={styles.statLabel}>सबसे ऊँचा दाम</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹2,350</Text>
            <Text style={styles.statLabel}>सबसे नीचा दाम</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹2,450</Text>
            <Text style={styles.statLabel}>औसत दाम</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>7 दिन का रुझान</Text>
        
        <View style={styles.historyContainer}>
          {priceHistory.map((history, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyDay}>{history.day}</Text>
              <Text style={styles.historyPrice}>{history.price}</Text>
              <Text style={[
                styles.historyChange,
                { color: history.change.startsWith('+') ? Colors.success : Colors.errorRed }
              ]}>
                {history.change}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.analysisCard}>
          <Icon name="bar-chart-2" size={20} color={Colors.primaryGreen} />
          <View style={styles.analysisContent}>
            <Text style={styles.analysisTitle}>बाजार विश्लेषण</Text>
            <Text style={styles.analysisText}>
              गेहूं के दाम में पिछले सप्ताह से निरंतर बढ़ोतरी देखी जा रही है। 
              मांग में वृद्धि और स्टॉक में कमी के कारण दाम बढ़े हैं। 
              अगले सप्ताह भी यही रुझान बना रह सकता है।
            </Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>आस-पास की मंडियाँ</Text>
        
        {nearbyMarkets.map((market, index) => (
          <View key={index} style={styles.nearbyMarketCard}>
            <View style={styles.marketInfo}>
              <Text style={styles.marketName}>{market.name}</Text>
              <Text style={styles.marketDistance}>{market.distance}</Text>
            </View>
            <Text style={styles.marketPrice}>{market.price}</Text>
          </View>
        ))}
        
        <View style={styles.infoContainer}>
          <Icon name="info" size={20} color={Colors.primaryGreen} />
          <Text style={styles.infoText}>
            ये दाम न्यूनतम समर्थन मूल्य (MSP) से अधिक हैं। 
            बेहतर दाम के लिए स्थानीय कृषि विपणन समिति से संपर्क करें।
          </Text>
        </View>
        
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>संपर्क जानकारी</Text>
          <View style={styles.contactItem}>
            <Icon name="phone" size={16} color={Colors.textSecondary} />
            <Text style={styles.contactText}>मंडी अधिकारी: 0145-2223456</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="map-pin" size={16} color={Colors.textSecondary} />
            <Text style={styles.contactText}>अजमेर मंडी, राजस्थान हाईवे</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="clock" size={16} color={Colors.textSecondary} />
            <Text style={styles.contactText}>समय: सुबह 8:00 से शाम 6:00</Text>
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
  headerCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cropHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cropIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: Typography.subtitle,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
    fontFamily: 'Noto Sans',
  },
  marketName: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primaryGreen,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changeText: {
    fontSize: Typography.body,
    fontWeight: '500',
    marginLeft: 8,
  },
  lastUpdate: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  statsContainer: {
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
    fontSize: 18,
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
  sectionTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    fontFamily: 'Noto Sans',
  },
  historyContainer: {
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
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  historyDay: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    width: 60,
    fontFamily: 'Roboto',
  },
  historyPrice: {
    fontSize: Typography.body,
    fontWeight: '500',
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  historyChange: {
    fontSize: Typography.body,
    fontWeight: '500',
    width: 80,
    textAlign: 'right',
  },
  analysisCard: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGreen,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  analysisContent: {
    flex: 1,
    marginLeft: 12,
  },
  analysisTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.primaryGreen,
    marginBottom: 8,
    fontFamily: 'Noto Sans',
  },
  analysisText: {
    fontSize: Typography.caption,
    color: Colors.textPrimary,
    lineHeight: 20,
    fontFamily: 'Roboto',
  },
  nearbyMarketCard: {
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
  marketInfo: {
    flex: 1,
  },
  marketName: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  marketDistance: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  marketPrice: {
    fontSize: Typography.body,
    fontWeight: '500',
    color: Colors.primaryGreen,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.accentAmber + '10',
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
  contactCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contactTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
    fontFamily: 'Noto Sans',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 12,
    fontFamily: 'Roboto',
  },
});

export default MandiDetailScreen;