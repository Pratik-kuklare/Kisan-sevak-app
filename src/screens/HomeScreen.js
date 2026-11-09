import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import { demoData } from '../constants/demoData';
import Header from '../components/Header';
import Card from '../components/Card';
import { Feather as Icon } from '@expo/vector-icons';

// Home screen dashboard
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <Header title="किसान सेवक" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>नमस्ते, किसान जी!</Text>
          <Text style={styles.subtitle}>आज की ताजा जानकारी</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="sun" size={24} color={Colors.accentAmber} />
            <Text style={styles.statValue}>28°C</Text>
            <Text style={styles.statLabel}>वर्तमान तापमान</Text>
          </View>

          <View style={styles.statCard}>
            <Icon name="trending-up" size={24} color={Colors.success} />
            <Text style={styles.statValue}>₹2,450</Text>
            <Text style={styles.statLabel}>गेहूं दाम</Text>
          </View>

          <View style={styles.statCard}>
            <Icon name="droplet" size={24} color={Colors.primaryGreen} />
            <Text style={styles.statValue}>45%</Text>
            <Text style={styles.statLabel}>नमी</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>त्वरित सेवाएं</Text>

        {demoData.dashboardCards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            color={card.color}
            onPress={() => navigation.navigate(card.screen)}
          />
        ))}

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>आज की टिप</Text>
          <View style={styles.tipCard}>
            <Icon name="lightbulb" size={20} color={Colors.accentAmber} />
            <Text style={styles.tipText}>
              इस समय गेहूं की फसल में खाद डालने का सबसे अच्छा समय है।
              संतुलित मात्रा में नाइट्रोजन और फॉस्फोरस का उपयोग करें।
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
  welcomeSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: Typography.title,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
    fontFamily: 'Noto Sans Devanagari',
  },
  subtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginVertical: 8,
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
  tipsContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    fontFamily: 'Noto Sans',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: Colors.accentAmber + '10',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    fontSize: Typography.body,
    color: Colors.textPrimary,
    marginLeft: 12,
    fontFamily: 'Roboto',
  },
});

export default HomeScreen;