import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Colors, Typography } from '../constants/colors';
import Header from '../components/Header';
import Icon from '../components/AppIcon';
import { api } from '../services/api';

const CropDiseaseScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [pendingUri, setPendingUri] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeImage = async () => {
    if (!pendingUri || loading) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const base64 = await FileSystem.readAsStringAsync(pendingUri, { encoding: FileSystem.EncodingType.Base64 });
      setResult(await api.analyzeDisease(`data:image/jpeg;base64,${base64}`));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async (source) => {
    const permission = source === 'camera'
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('अनुमति आवश्यक', 'तस्वीर चुनने के लिए अनुमति दें।');
      return;
    }
    const pickerResult = source === 'camera'
      ? await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!pickerResult.canceled) {
      const uri = pickerResult.assets[0].uri;
      setSelectedImage(uri);
      setPendingUri(uri);
      setResult(null);
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="फसल बीमारी जांच" showBack onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <Text style={styles.instruction}>फसल की साफ तस्वीर चुनें। Gemini Vision API तस्वीर का विश्लेषण करेगा।</Text>
        <TouchableOpacity style={styles.picker} onPress={() => pickImage('gallery')}>
          {selectedImage ? <Image source={{ uri: selectedImage }} style={styles.image} /> : <Icon name="upload" size={48} color={Colors.textSecondary} />}
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={() => pickImage('camera')}><Text style={styles.buttonText}>कैमरा</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondary]} onPress={() => pickImage('gallery')}><Text style={styles.secondaryText}>गैलरी</Text></TouchableOpacity>
        </View>
        {pendingUri ? <TouchableOpacity style={styles.sendButton} onPress={analyzeImage}><Text style={styles.buttonText}>तस्वीर भेजें और जांचें</Text></TouchableOpacity> : null}
        {loading ? <ActivityIndicator color={Colors.primaryGreen} /> : null}
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.error}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={analyzeImage}><Text style={styles.secondaryText}>फिर कोशिश करें</Text></TouchableOpacity>
          </View>
        ) : null}
        {result ? (
          <View style={styles.result}>
            <Text style={styles.title}>{result.healthy ? 'फसल स्वस्थ है' : result.diseaseName}</Text>
            <Text style={styles.label}>लक्षण</Text><Text>{result.symptoms}</Text>
            <Text style={styles.label}>सलाह</Text><Text>{result.treatment}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  instruction: { color: Colors.textSecondary, textAlign: 'center', marginBottom: 18, lineHeight: 22 },
  picker: { height: 220, backgroundColor: Colors.surfaceWhite, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%', borderRadius: 14 },
  actions: { flexDirection: 'row', gap: 12, marginVertical: 16 },
  button: { flex: 1, backgroundColor: Colors.primaryGreen, borderRadius: 10, padding: 14, alignItems: 'center' },
  buttonText: { color: Colors.surfaceWhite, fontWeight: '600' },
  secondary: { backgroundColor: Colors.surfaceWhite, borderWidth: 1, borderColor: Colors.primaryGreen },
  secondaryText: { color: Colors.primaryGreen, fontWeight: '600' },
  sendButton: { backgroundColor: Colors.primaryGreen, borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 16 },
  errorBox: { backgroundColor: '#FDECEC', borderRadius: 10, padding: 14, marginBottom: 16 },
  error: { color: Colors.errorRed, marginBottom: 10 },
  retryButton: { backgroundColor: Colors.surfaceWhite, borderRadius: 8, padding: 10, alignItems: 'center' },
  result: { backgroundColor: Colors.surfaceWhite, borderRadius: 14, padding: 18 },
  title: { color: Colors.primaryGreen, fontSize: Typography.subtitle, fontWeight: 'bold', marginBottom: 16 },
  label: { color: Colors.textPrimary, fontWeight: '600', marginTop: 12, marginBottom: 4 },
});

export default CropDiseaseScreen;
