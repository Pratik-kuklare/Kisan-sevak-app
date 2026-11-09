import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

// Splash screen with gradient background
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to home after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={[Colors.primaryGreen, Colors.secondaryGreen]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryGreen} />

      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>KS</Text>
        </View>
      </View>

      <Text style={styles.appName}>किसान सेवक</Text>
      <Text style={styles.tagline}>आपका डिजिटल कृषि सहायक</Text>

      <View style={styles.loadingContainer}>
        <View style={styles.loadingDot} />
        <View style={styles.loadingDot} />
        <View style={styles.loadingDot} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surfaceWhite,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.accentAmber,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.surfaceWhite,
    marginBottom: 8,
    fontFamily: 'Noto Sans Devanagari',
  },
  tagline: {
    fontSize: 16,
    color: Colors.surfaceWhite,
    opacity: 0.9,
    fontFamily: 'Noto Sans Devanagari',
  },
  loadingContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 48,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.surfaceWhite,
    marginHorizontal: 4,
    opacity: 0.6,
  },
});

export default SplashScreen;