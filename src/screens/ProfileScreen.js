import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Colors, Typography } from '../constants/colors';
import Header from '../components/Header';
import { Feather as Icon } from '@expo/vector-icons';

// Profile and settings screen
const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hindiEnabled, setHindiEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  
  const userProfile = {
    name: 'किसान मित्र',
    village: 'ग्राम: सीकर',
    district: 'जिला: सीकर',
    state: 'राजस्थान',
    phone: 'संपर्क विवरण उपलब्ध नहीं',
    crops: ['गेहूं', 'चावल', 'सरसों'],
  };

  const menuItems = [
    { id: 1, title: 'मेरी जमीन', icon: 'map', screen: 'MyLand' },
    { id: 2, title: 'फसल इतिहास', icon: 'calendar', screen: 'CropHistory' },
    { id: 3, title: 'सहेजी गई सलाह', icon: 'bookmark', screen: 'SavedAdvice' },
    { id: 4, title: 'भुगतान विवरण', icon: 'credit-card', screen: 'Payments' },
    { id: 5, title: 'संदेश', icon: 'message-square', screen: 'Messages' },
    { id: 6, title: 'सहायता', icon: 'help-circle', screen: 'Help' },
  ];

  return (
    <View style={styles.container}>
      <Header title="प्रोफाइल" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitials}>रसी</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userProfile.name}</Text>
              <Text style={styles.profileDetails}>{userProfile.village}</Text>
              <Text style={styles.profileDetails}>{userProfile.district}, {userProfile.state}</Text>
              <Text style={styles.profilePhone}>{userProfile.phone}</Text>
            </View>
          </View>
          
          <View style={styles.cropsContainer}>
            <Text style={styles.cropsTitle}>मुख्य फसलें</Text>
            <View style={styles.cropsList}>
              {userProfile.crops.map((crop, index) => (
                <View key={index} style={styles.cropBadge}>
                  <Text style={styles.cropText}>{crop}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <TouchableOpacity style={styles.editButton} onPress={() => Alert.alert('जल्द आ रहा है', 'प्रोफाइल संपादन सुविधा जल्द उपलब्ध होगी।')}>
            <Icon name="edit-2" size={16} color={Colors.primaryGreen} />
            <Text style={styles.editButtonText}>प्रोफाइल संपादित करें</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => Alert.alert('जल्द आ रहा है', 'यह सुविधा जल्द उपलब्ध होगी।')}>
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={20} color={Colors.primaryGreen} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Icon name="chevron-right" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsTitle}>सेटिंग्स</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>नोटिफिकेशन</Text>
              <Text style={styles.settingDescription}>फसल अलर्ट और बाजार अपडेट</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.border, true: Colors.primaryGreen }}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>हिंदी इंटरफेस</Text>
              <Text style={styles.settingDescription}>ऐप की भाषा बदलें</Text>
            </View>
            <Switch
              value={hindiEnabled}
              onValueChange={() => {
                setHindiEnabled(true);
                Alert.alert('भाषा बदलें', 'मराठी, पंजाबी, तेलुगु जल्द उपलब्ध होगी।');
              }}
              trackColor={{ false: Colors.border, true: Colors.primaryGreen }}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>लोकेशन एक्सेस</Text>
              <Text style={styles.settingDescription}>स्थानीय मौसम और मंडी जानकारी</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: Colors.border, true: Colors.primaryGreen }}
            />
          </View>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('जल्द आ रहा है', 'यह सुविधा जल्द उपलब्ध होगी।')}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>डेटा उपयोग</Text>
              <Text style={styles.settingDescription}>ऐप डेटा प्रबंधन</Text>
            </View>
            <Icon name="chevron-right" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('जल्द आ रहा है', 'यह सुविधा जल्द उपलब्ध होगी।')}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingText}>गोपनीयता</Text>
              <Text style={styles.settingDescription}>डेटा सुरक्षा सेटिंग्स</Text>
            </View>
            <Icon name="chevron-right" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.supportContainer}>
          <Text style={styles.supportTitle}>सहायता</Text>
          
          <TouchableOpacity style={styles.supportItem} onPress={() => Alert.alert('कृषि हेल्पलाइन', 'कृषि हेल्पलाइन: 1551')}>
            <Icon name="phone" size={20} color={Colors.primaryGreen} />
            <Text style={styles.supportText}>कृषि हेल्पलाइन</Text>
            <Text style={styles.supportNumber}>1551</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem} onPress={() => Alert.alert('ईमेल सहायता', 'support@kisansevak.in')}>
            <Icon name="mail" size={20} color={Colors.primaryGreen} />
            <Text style={styles.supportText}>ईमेल सहायता</Text>
            <Text style={styles.supportEmail}>support@kisansevak.in</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem} onPress={() => Alert.alert('जल्द आ रहा है', 'यह सुविधा जल्द उपलब्ध होगी।')}>
            <Icon name="file-text" size={20} color={Colors.primaryGreen} />
            <Text style={styles.supportText}>उपयोग की शर्तें</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem} onPress={() => Alert.alert('जल्द आ रहा है', 'यह सुविधा जल्द उपलब्ध होगी।')}>
            <Icon name="shield" size={20} color={Colors.primaryGreen} />
            <Text style={styles.supportText}>गोपनीयता नीति</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out" size={20} color={Colors.errorRed} />
          <Text style={styles.logoutText}>लॉग आउट</Text>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>किसान सेवक v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 किसान सेवक. सभी अधिकार सुरक्षित</Text>
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
  profileCard: {
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitials: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.surfaceWhite,
    fontFamily: 'Noto Sans Devanagari',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: Typography.subtitle,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
    fontFamily: 'Noto Sans Devanagari',
  },
  profileDetails: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 2,
    fontFamily: 'Roboto',
  },
  profilePhone: {
    fontSize: Typography.caption,
    color: Colors.primaryGreen,
    fontWeight: '500',
    marginTop: 4,
  },
  cropsContainer: {
    marginBottom: 20,
  },
  cropsTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
    fontFamily: 'Noto Sans',
  },
  cropsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropBadge: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  cropText: {
    fontSize: Typography.caption,
    color: Colors.primaryGreen,
    fontWeight: '500',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.primaryGreen,
    borderRadius: 24,
  },
  editButtonText: {
    fontSize: Typography.body,
    color: Colors.primaryGreen,
    fontWeight: '500',
    marginLeft: 8,
    fontFamily: 'Noto Sans',
  },
  menuContainer: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    marginLeft: 16,
    fontFamily: 'Roboto',
  },
  settingsContainer: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingsTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    fontFamily: 'Noto Sans',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flex: 1,
  },
  settingText: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  settingDescription: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
  supportContainer: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  supportTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    fontFamily: 'Noto Sans',
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  supportText: {
    flex: 1,
    fontSize: Typography.body,
    color: Colors.textPrimary,
    marginLeft: 16,
    fontFamily: 'Roboto',
  },
  supportNumber: {
    fontSize: Typography.body,
    color: Colors.primaryGreen,
    fontWeight: '500',
  },
  supportEmail: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  logoutText: {
    fontSize: Typography.body,
    color: Colors.errorRed,
    fontWeight: '500',
    marginLeft: 12,
    fontFamily: 'Noto Sans',
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  versionText: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  copyrightText: {
    fontSize: Typography.label,
    color: Colors.textSecondary,
    fontFamily: 'Roboto',
  },
});

export default ProfileScreen;