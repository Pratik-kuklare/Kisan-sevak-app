import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Typography } from '../constants/colors';
import { demoData } from '../constants/demoData';
import Header from '../components/Header';
import { Feather as Icon } from '@expo/vector-icons';

// Crop disease detection screen
const CropDiseaseScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async (source) => {
    const requestPermission = source === 'camera'
      ? ImagePicker.requestCameraPermissionsAsync
      : ImagePicker.requestMediaLibraryPermissionsAsync;
    const permission = await requestPermission();

    if (!permission.granted) {
      Alert.alert('अनुमति आवश्यक', source === 'camera'
        ? 'फोटो लेने के लिए कैमरा अनुमति दें।'
        : 'तस्वीर चुनने के लिए गैलरी अनुमति दें।');
      return;
    }

    try {
      const result = source === 'camera'
        ? await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        })
        : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('तस्वीर नहीं खुल सकी', 'कृपया दोबारा प्रयास करें।');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="फसल बीमारी जांच" showBack onBackPress={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.instructionContainer}>
          <Icon name="camera" size={32} color={Colors.primaryGreen} />
          <Text style={styles.instructionTitle}>फसल की तस्वीर लें</Text>
          <Text style={styles.instructionText}>
            बीमार पौधे या पत्ते की साफ तस्वीर लें। AI आपकी फसल की बीमारी का विश्लेषण करेगा।
          </Text>
        </View>

        <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('gallery')}>
          {selectedImage ? (
            <View style={styles.imagePreview}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              <Text style={styles.imagePreviewText}>तस्वीर चयनित</Text>
              <Text style={styles.analyzingText}>विश्लेषण के लिए तैयार</Text>
            </View>
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="upload" size={48} color={Colors.textSecondary} />
              <Text style={styles.placeholderText}>तस्वीर चुनने के लिए टैप करें</Text>
              <Text style={styles.placeholderSubtext}>या कैमरे का उपयोग करें</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.imageActions}>
          <TouchableOpacity style={styles.imageActionButton} onPress={() => pickImage('camera')}>
            <Icon name="camera" size={18} color={Colors.surfaceWhite} />
            <Text style={styles.imageActionText}>📷 कैमरा</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.imageActionButton, styles.galleryButton]} onPress={() => pickImage('gallery')}>
            <Icon name="image" size={18} color={Colors.primaryGreen} />
            <Text style={[styles.imageActionText, styles.galleryButtonText]}>🖼️ गैलरी</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.sectionTitle}>विश्लेषण परिणाम</Text>
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>गेहूं का किट्ट रोग</Text>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>92% मिलान</Text>
              </View>
            </View>
            <Text style={styles.resultDescription}>
              यह फंगल रोग पत्तों पर भूरे धब्बे बनाता है और पौधे की वृद्धि रोकता है।
            </Text>

            <View style={styles.recommendationSection}>
              <Text style={styles.recommendationTitle}>उपचार सलाह:</Text>
              <Text style={styles.recommendation}>
                1. प्रोपिकोनाजोल 25% का 1ml प्रति लीटर पानी में घोलकर छिड़काव करें{'\n'}
                2. 10 दिन के अंतराल पर 2-3 बार छिड़काव करें{'\n'}
                3. खेत की सफाई रखें, संक्रमित पौधों को हटा दें
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>आम बीमारियाँ</Text>

        {demoData.commonDiseases.map((disease) => (
          <View key={disease.id} style={styles.diseaseCard}>
            <View style={styles.diseaseHeader}>
              <Text style={styles.diseaseName}>{disease.name}</Text>
              <Text style={styles.diseaseCrop}>{disease.crop}</Text>
            </View>
            <Text style={styles.diseaseSymptoms}>{disease.symptoms}</Text>
            <Text style={styles.diseaseTreatment}>{disease.treatment}</Text>
          </View>
        ))}

        <View style={styles.emergencySection}>
          <Icon name="alert-triangle" size={24} color={Colors.errorRed} />
          <Text style={styles.emergencyText}>
            अगर फसल में गंभीर संक्रमण दिखे, तो नजदीकी कृषि विभाग कार्यालय से संपर्क करें।
          </Text>
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
  instructionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  instructionTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Noto Sans',
  },
  instructionText: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'Roboto',
    lineHeight: 22,
  },
  imagePicker: {
    height: 200,
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginTop: 16,
    fontFamily: 'Roboto',
  },
  placeholderSubtext: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
    fontFamily: 'Roboto',
  },
  imagePreview: {
    alignItems: 'center',
  },
  selectedImage: {
    width: 140,
    height: 110,
    borderRadius: 10,
  },
  imagePreviewText: {
    fontSize: Typography.body,
    color: Colors.success,
    marginTop: 16,
    fontFamily: 'Roboto',
  },
  analyzingText: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
    fontFamily: 'Roboto',
  },
  imageActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  imageActionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 10,
    paddingVertical: 13,
  },
  galleryButton: {
    backgroundColor: Colors.surfaceWhite,
    borderWidth: 1,
    borderColor: Colors.primaryGreen,
  },
  imageActionText: {
    color: Colors.surfaceWhite,
    fontSize: Typography.button,
    fontWeight: '600',
  },
  galleryButtonText: {
    color: Colors.primaryGreen,
  },
  resultContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
    fontFamily: 'Noto Sans',
  },
  resultCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    fontFamily: 'Noto Sans',
  },
  confidenceBadge: {
    backgroundColor: Colors.success + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  confidenceText: {
    fontSize: Typography.caption,
    color: Colors.success,
    fontWeight: '500',
  },
  resultDescription: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
    fontFamily: 'Roboto',
  },
  recommendationSection: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 8,
    padding: 12,
  },
  recommendationTitle: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.primaryGreen,
    marginBottom: 8,
    fontFamily: 'Noto Sans',
  },
  recommendation: {
    fontSize: Typography.caption,
    color: Colors.textPrimary,
    lineHeight: 20,
    fontFamily: 'Roboto',
  },
  diseaseCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  diseaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diseaseName: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    fontFamily: 'Noto Sans',
  },
  diseaseCrop: {
    fontSize: Typography.caption,
    color: Colors.primaryGreen,
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  diseaseSymptoms: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontFamily: 'Roboto',
  },
  diseaseTreatment: {
    fontSize: Typography.caption,
    color: Colors.success,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  emergencySection: {
    flexDirection: 'row',
    backgroundColor: Colors.errorRed + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  emergencyText: {
    flex: 1,
    fontSize: Typography.caption,
    color: Colors.errorRed,
    marginLeft: 12,
    fontFamily: 'Roboto',
  },
});

export default CropDiseaseScreen;