# Kisan Sevak (किसान सेवक)

An AI-powered farming advisory app for Indian farmers built with React Native (Expo).

## App Features

### Core Features:
1. **Crop Disease Detection** - AI-powered image analysis for crop diseases
2. **Mandi Price Information** - Real-time market prices for agricultural produce
3. **Weather Advisory** - 7-day weather forecast with farming recommendations
4. **AI Chat Advisor** - Hindi language chatbot for farming queries
5. **Personal Profile** - Farmer profile with crop tracking

### Screens:
- Splash/Loading Screen
- Home Dashboard
- Crop Disease Detection
- Mandi Prices
- Weather Advisory
- AI Chat Advisor
- Mandi Detail
- Profile/Settings

## Technology Stack

- **Frontend**: React Native (Expo)
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Icons**: Expo Vector Icons
- **UI Components**: Custom built with design system
- **State Management**: Local state (no Redux/Context API)
- **Language**: Hindi (Devanagari) with English tech labels

## Design System

### Colors:
- Primary Green: #1B5E20
- Secondary Green: #4CAF50
- Accent Amber: #FF8F00
- Background: #F1F8E9
- Surface White: #FFFFFF

### Typography:
- Display/Headers: Noto Sans (Bold)
- Body: Roboto (Regular)
- Hindi Text: Noto Sans Devanagari

## Project Structure

```
src/
├── screens/           # 8 main screens
├── components/        # Reusable UI components
├── constants/         # Colors, demo data, typography
├── navigation/        # Navigation configuration
└── assets/           # Images, fonts, icons
```

## Installation

1. Install dependencies:
```bash
cd KisanSevak
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run on Android device/emulator:
```bash
npx expo start --android
```

## Dependencies

- @react-navigation/native
- @react-navigation/stack
- @react-navigation/bottom-tabs
- @expo/vector-icons
- expo-linear-gradient
- expo-image-picker
- react-native-svg
- lottie-react-native
- @react-native-async-storage/async-storage

## Features Implemented

✅ Complete Hindi language interface (Devanagari Unicode)  
✅ 8 fully functional screens  
✅ Bottom tab navigation with 4 main tabs  
✅ Stack navigation for detail screens  
✅ Premium agricultural green color theme  
✅ Pixel-perfect UI design  
✅ Demo data for all features  
✅ Camera and gallery photo selection with permissions  
✅ Crop filters, static AI replies, and profile action alerts  
✅ Reusable components (Header, Card, WeatherCard, PriceCard)  
✅ Responsive design for Android 8+  
✅ No iOS-specific code (Android only)  

## Usage Notes

- All data is currently hardcoded for demo purposes
- In production, integrate with real APIs for:
  - Weather data (OpenWeatherMap, IMD)
  - Mandi prices (Government APIs)
  - Crop disease detection (TensorFlow Lite)
  - AI chat (GPT/LLM APIs)
- Implement push notifications for price alerts

## Target Audience

- Rural Indian farmers
- Low-tech users
- Android 8+ devices
- Hindi speaking population

## License

© 2025 Kisan Sevak