# Requirements Document

## Introduction

This document specifies the functional requirements for the Kisan Sevak (किसान सेवक) farming advisory app. The app targets Indian farmers using Android 8+ devices and is built with Expo-managed React Native + JavaScript. It provides crop disease detection, mandi price lookup, weather-based farming advisories, and a Hindi-language AI chat assistant. All user-facing text is in Hindi (Devanagari Unicode). The rebuild corrects broken Expo-incompatible dependencies and adds the features described below.

---

## Glossary

- **App**: The Kisan Sevak React Native / Expo application.
- **Navigator**: A `@react-navigation` stack or tab component that manages screen transitions.
- **RootStack**: The top-level `createStackNavigator` instance that hosts Splash, Main, and all detail screens.
- **MainTabs**: The `createBottomTabNavigator` instance mounted at the `Main` route with four tabs.
- **Screen**: A React Native component registered as a route in the Navigator.
- **DemoApi**: The `src/services/demoApi.js` module that returns `Promise.resolve(data)` shaped like real API responses.
- **Strings**: The `src/constants/strings.js` module that centralises all Hindi UI text.
- **Colors**: The `src/constants/colors.js` module that exports the design-system colour palette and typography scale.
- **PriceCard**: The reusable component that renders a single mandi price entry.
- **WeatherCard**: The reusable component that renders a single-day weather forecast entry.
- **Card**: The reusable dashboard feature tile component used on HomeScreen.
- **Header**: The reusable top-bar component shared across all screens.
- **CropFilter**: The horizontal chip row on MandiPricesScreen used to filter prices by crop.
- **SVGChart**: The `react-native-svg`-based line chart component rendered on MandiDetailScreen.
- **ImagePicker**: The `expo-image-picker` API used on CropDiseaseScreen.
- **expo-linear-gradient**: The Expo-compatible gradient library that replaces `react-native-linear-gradient`.
- **expo-image-picker**: The Expo-compatible image picker that replaces `react-native-image-picker`.
- **@expo/vector-icons**: The Expo-compatible icon library that replaces `react-native-vector-icons`.

---

## Requirements

### Requirement 1: Splash Screen

**User Story:** As a farmer launching the app, I want to see a branded loading screen, so that I know the app is starting and feel welcomed.

#### Acceptance Criteria

1. THE App SHALL render the SplashScreen as the initial route in the RootStack.
2. WHEN the SplashScreen mounts, THE App SHALL navigate to the `Main` route using `navigation.replace` after exactly 2 500 ms.
3. THE SplashScreen SHALL display a green linear gradient background using `expo-linear-gradient` with start colour `#1B5E20` and end colour `#4CAF50`.
4. THE SplashScreen SHALL display the app name "किसान सेवक" in white bold text at `fontSize: 32`.
5. THE SplashScreen SHALL display the tagline "आपका डिजिटल कृषि सहायक" in white text at `fontSize: 16`, `opacity: 0.9`.
6. THE SplashScreen SHALL display a white logo circle containing a wheat or leaf emoji.
7. THE SplashScreen SHALL display three animated loading dots at the bottom of the screen.

---

### Requirement 2: Home Screen Dashboard

**User Story:** As a farmer, I want a dashboard that surfaces key daily information and quick links to each feature, so that I can immediately access what I need.

#### Acceptance Criteria

1. THE HomeScreen SHALL display a greeting text "नमस्ते, किसान जी!" and subtitle "आज की ताजा जानकारी".
2. THE HomeScreen SHALL display a mini stats row containing three equal-width cards for temperature (28°C), wheat price (₹2,450), and humidity (45%).
3. THE HomeScreen SHALL display four feature tile `Card` components labelled "फसल बीमारी जांच", "मंडी भाव", "मौसम सलाह", and "AI सलाहकार".
4. WHEN a user taps a feature tile `Card`, THE HomeScreen SHALL navigate to the corresponding screen: `CropDisease`, `MandiPrices`, `WeatherAdvisory`, or `AIChat`.
5. THE HomeScreen SHALL display a "आज की टिप" card at the bottom with a farming tip in Hindi.
6. THE HomeScreen SHALL use `@expo/vector-icons` Feather icons throughout; it SHALL NOT import from `react-native-vector-icons`.

---

### Requirement 3: Crop Disease Detection Screen

**User Story:** As a farmer, I want to photograph a diseased crop and receive an AI diagnosis with remedy steps, so that I know how to treat my field.

#### Acceptance Criteria

1. THE CropDiseaseScreen SHALL display two buttons: "📷 कैमरा" and "🖼 गैलरी".
2. WHEN the user taps "📷 कैमरा", THE CropDiseaseScreen SHALL call `expo-image-picker` `launchCameraAsync` with `mediaTypes: 'Images'` and `quality: 0.8`.
3. WHEN the user taps "🖼 गैलरी", THE CropDiseaseScreen SHALL call `expo-image-picker` `launchImageLibraryAsync` with `mediaTypes: 'Images'` and `quality: 0.8`.
4. WHEN the user selects an image, THE CropDiseaseScreen SHALL display the selected image in a 200-height preview box using `<Image source={{ uri }}>`.
5. WHILE the analysis is running (2-second simulated delay), THE CropDiseaseScreen SHALL display an activity indicator and the text "विश्लेषण हो रहा है...".
6. WHEN analysis completes, THE CropDiseaseScreen SHALL display a result card showing the disease name "गेहूं का किट्ट रोग", a confidence badge of "94% मिलान", a Hindi description, and a numbered list of remedy steps.
7. IF the user denies camera or media library permission, THE CropDiseaseScreen SHALL display an `Alert` with the message "कैमरा अनुमति आवश्यक है।" and a "ठीक है" dismissal button; WHEN the alert is dismissed, THE CropDiseaseScreen SHALL allow the user to retry by tapping the camera or gallery button again, which SHALL re-trigger the permission prompt.
8. THE CropDiseaseScreen SHALL display a "आम बीमारियाँ" section below the result, listing diseases from `DemoApi.getCommonDiseases()`.

---

### Requirement 4: Mandi Prices Screen

**User Story:** As a farmer, I want to browse and filter today's market prices by crop type, so that I can decide where and when to sell my produce.

#### Acceptance Criteria

1. THE MandiPricesScreen SHALL display a `TextInput` search bar that filters the displayed `PriceCard` list by crop name as the user types.
2. THE MandiPricesScreen SHALL display a horizontal `CropFilter` chip row with the options: सभी, गेहूं, चावल, कपास, सोयाबीन.
3. WHEN a `CropFilter` chip is tapped, THE MandiPricesScreen SHALL update the active chip (green background, white text) and filter the `FlatList` to show only matching entries.
4. THE MandiPricesScreen SHALL render a `FlatList` of exactly 6 `PriceCard` components using data from `DemoApi.getMandiPrices()`.
5. WHEN a user taps a `PriceCard`, THE MandiPricesScreen SHALL navigate to `MandiDetail` screen passing the selected price entry as a navigation parameter.
6. THE PriceCard SHALL display the crop name, price per quintal in `Colors.primaryGreen`, market name, state, and a coloured trend arrow: green `trending-up` for positive change, red `trending-down` for negative change.
7. THE MandiPricesScreen SHALL display a summary stats card showing average wheat price, weekly change percentage, and active mandis count.

---

### Requirement 5: Weather Advisory Screen

**User Story:** As a farmer, I want to see today's weather details and a 7-day forecast with farming advice, so that I can plan irrigation, spraying, and harvesting.

#### Acceptance Criteria

1. THE WeatherAdvisoryScreen SHALL display a hero card for today showing temperature, weather condition, humidity, and wind speed sourced from `DemoApi.getWeatherData()`.
2. THE WeatherAdvisoryScreen SHALL display a horizontal `ScrollView` containing 7 `WeatherCard` components for the 7-day forecast.
3. THE WeatherAdvisoryScreen SHALL display four farming advisory cards: irrigation (सिंचाई), pesticide (कीटनाशक), harvest (कटाई), and fertilizer (खाद) with coloured icon circles.
4. THE WeatherAdvisoryScreen SHALL always display a static red warning strip with the text "महत्वपूर्ण चेतावनी" and a fixed advisory message regardless of the actual weather conditions returned by `DemoApi.getWeatherData()`.
5. THE WeatherAdvisoryScreen SHALL display an "Agricultural Calendar" card with Hindi farming tips for the current season.

---

### Requirement 6: AI Advisor Chat Screen

**User Story:** As a farmer, I want to ask farming questions in Hindi and receive instant replies, so that I can get personalised advice without calling a helpline.

#### Acceptance Criteria

1. THE AIChatScreen SHALL pre-load 4 demo messages (2 user, 2 bot) from `Strings.demoConversation` when the component first mounts.
2. THE AIChatScreen SHALL render messages in a `FlatList` that auto-scrolls to the bottom on mount and after each new message.
3. WHEN a user types text in the `TextInput` and taps the send button, THE AIChatScreen SHALL append the user message immediately and then append a bot reply after a 1-second delay using `DemoApi.getChatResponse()`.
4. THE AIChatScreen SHALL style user messages as right-aligned bubbles with `backgroundColor: Colors.primaryGreen` and white text; bot messages SHALL be left-aligned white cards with shadow.
5. THE AIChatScreen SHALL display a timestamp below each message bubble.
6. THE AIChatScreen SHALL display a horizontal row of quick-question chips that, when tapped, populate the `TextInput` with the chip text.
7. THE AIChatScreen SHALL use `KeyboardAvoidingView` with `behavior: Platform.OS === 'ios' ? 'padding' : 'height'`.

---

### Requirement 7: Mandi Detail Screen

**User Story:** As a farmer, I want to see a 7-day price history chart and nearby mandis for a selected crop, so that I can identify price trends and the best market to visit.

#### Acceptance Criteria

1. THE MandiDetailScreen SHALL receive a price entry object via `route.params.item` and display the crop name, market, state, current price, and change badge in a header card.
2. THE MandiDetailScreen SHALL render a `SVGChart` using `react-native-svg` that plots a 7-day price history as a polyline with data from `DemoApi.getMandiDetail(cropId)`.
3. WHEN rendering the `SVGChart`, THE MandiDetailScreen SHALL scale all data points so that X and Y coordinates remain within the chart viewport dimensions (300 × 140 px).
4. THE MandiDetailScreen SHALL display a 3-column stats strip showing the 7-day high, low, and average price.
5. THE MandiDetailScreen SHALL display a list of 4 nearby mandis with market name, distance, and current price from `DemoApi.getMandiDetail(cropId).nearbyMandis`.
6. THE MandiDetailScreen SHALL display a market analysis card with a Hindi commentary on the price trend.

---

### Requirement 8: Profile Screen

**User Story:** As a farmer, I want to manage my profile, set my preferred crops, choose my language, and configure notification preferences, so that the app experience is personalised to my needs.

#### Acceptance Criteria

1. THE ProfileScreen SHALL display a farmer avatar circle with initials "रक", name "राम किसान", and location "उत्तर प्रदेश".
2. THE ProfileScreen SHALL display a horizontal crop selector with chips for गेहूं, चावल, सरसों, and मक्का that support multi-selection; selected chips SHALL have `backgroundColor: Colors.primaryGreen` and white text.
3. THE ProfileScreen SHALL display three `Switch` rows labelled "मूल्य अलर्ट", "मौसम अलर्ट", and "बीमारी अलर्ट" that independently toggle each notification type.
4. WHEN a `Switch` is toggled, THE ProfileScreen SHALL update the corresponding local state value immediately so the `Switch` reflects the new position.
5. THE ProfileScreen SHALL display a language selector with two chips "हिंदी" and "English"; only one can be active at a time.
6. THE ProfileScreen SHALL display a version footer "किसान सेवक v1.0.0".

---

### Requirement 9: Navigation Structure

**User Story:** As a user, I want consistent and intuitive navigation, so that I can move between screens without confusion.

#### Acceptance Criteria

1. THE Navigator SHALL implement a RootStack using `@react-navigation/stack` with `initialRouteName: 'Splash'`.
2. THE Navigator SHALL implement MainTabs using `@react-navigation/bottom-tabs` with four tabs: होम (HomeScreen), स्कैन (CropDiseaseScreen), मंडी (MandiPricesScreen), प्रोफाइल (ProfileScreen).
3. THE Navigator SHALL register MandiDetailScreen, WeatherAdvisoryScreen, and AIChatScreen as stack screens in the RootStack (not as tabs).
4. THE Navigator SHALL use `@expo/vector-icons` Feather icons for all bottom tab icons; it SHALL NOT import from `react-native-vector-icons`.
5. THE Navigator SHALL set `headerShown: false` for all screens so the custom `Header` component is used instead.
6. THE Navigator SHALL set tab bar height to 60 px with `paddingBottom: 8` and `paddingTop: 8`.

---

### Requirement 10: Expo Dependency Compliance

**User Story:** As a developer, I want the app to run in Expo Go without native module errors, so that it can be developed and tested without an ejected build.

#### Acceptance Criteria

1. THE App SHALL replace `react-native-linear-gradient` with `expo-linear-gradient` in all source files and `package.json`.
2. THE App SHALL replace `react-native-vector-icons` with `@expo/vector-icons` in all source files and `package.json`.
3. THE App SHALL replace `react-native-image-picker` with `expo-image-picker` in all source files and `package.json`.
4. THE App SHALL remove `lottie-react-native` and `react-native-shimmer-placeholder` from `package.json` and all source files; loading states SHALL use React Native's built-in `ActivityIndicator` or simple `Animated` components instead.
5. THE `package.json` SHALL NOT contain any dependency that requires Expo to be ejected to bare workflow to function.

---

### Requirement 11: Constants and Strings

**User Story:** As a developer, I want all Hindi UI strings centralised in one file and all design tokens in another, so that the codebase is easy to maintain and localise.

#### Acceptance Criteria

1. THE App SHALL create `src/constants/strings.js` exporting a `Strings` object containing all Hindi UI text used across all 8 screens.
2. THE `Strings` object SHALL include: `appName`, `tagline`, `greeting`, `dashboardCards` (array of 4), `todayTip`, `demoConversation` (array of 4 messages), `cropFilters` (array of 5), and `advisories` (array of 4).
3. THE `src/constants/colors.js` file SHALL export the `Colors` palette and `Typography` scale as specified in the Design System section of the design document.
4. WHEN a screen or component needs a UI string, THE component SHALL import from `Strings` rather than defining the string inline.

---

### Requirement 12: Demo API Service

**User Story:** As a developer, I want a single `demoApi.js` service module with Promise-shaped functions, so that screens can be wired to real APIs later with minimal changes.

#### Acceptance Criteria

1. THE `src/services/demoApi.js` module SHALL export the following functions: `getWeatherData`, `getMandiPrices`, `getCommonDiseases`, `analyzeCropDisease`, `getChatResponse`, `getMandiDetail`, `getFarmerProfile`.
2. WHEN called, EACH function SHALL return a `Promise.resolve(data)` with a delay of 500–1 000 ms simulated via `setTimeout`.
3. THE `getMandiPrices` function SHALL return exactly 6 price entries.
4. THE `getWeatherData` function SHALL return a `current` object and a `forecast` array of exactly 7 entries.
5. THE `analyzeCropDisease` function SHALL accept an `imageUri` parameter and return a `DiseaseResult` object with `disease`, `confidence` (integer 0–100), `description`, and `remedies` (array of strings).
6. THE `getChatResponse` function SHALL accept a `message` string and return an object with `text` (a Hindi reply string) and `time` (formatted timestamp).
7. THE `getMandiDetail` function SHALL return an object containing a `priceHistory` array of exactly 7 entries and a `nearbyMandis` array of exactly 4 entries; parameter acceptance is an implementation detail and is not subject to independent verification.
