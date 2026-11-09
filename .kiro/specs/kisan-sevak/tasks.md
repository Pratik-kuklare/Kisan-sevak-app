# Implementation Plan: Kisan Sevak

## Overview

This plan rebuilds the Kisan Sevak app from its current broken state into a fully working Expo-managed React Native app. Tasks proceed in dependency order: package fixes first, then constants/services, then shared components, then navigation, then screens from simplest to most complex, and finally App.js wiring. Each task references the relevant requirement numbers.

---

## Tasks

- [ ] 1. Fix package.json — replace Expo-incompatible dependencies
  - Remove `react-native-linear-gradient`, `react-native-vector-icons`, `react-native-image-picker`, `lottie-react-native`, `react-native-shimmer-placeholder` from `dependencies`
  - Add `expo-linear-gradient`, `expo-image-picker`, `@expo/vector-icons` with pinned versions compatible with Expo SDK 52
  - Retain all other existing dependencies unchanged
  - Update `app.json` to add `expo.plugins: ["expo-image-picker"]` and Android camera/media permissions
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 2. Create/update constants files
  - [x] 2.1 Overwrite `src/constants/colors.js`
    - Export `Colors` object with all palette values exactly as specified in the design document
    - Export `Typography` scale (title 24, subtitle 18, body 14, caption 12, label 11, button 15)
    - _Requirements: 11.3_
  - [x] 2.2 Create `src/constants/strings.js`
    - Export `Strings` object with `appName`, `tagline`, `greeting`, `subtitle`, `dashboardCards` (4 entries with id/title/subtitle/icon/color/screen), `todayTip` (title + text), `demoConversation` (4 messages with id/text/isUser/time), `cropFilters` (5 strings), `advisories` (4 objects), and all other UI strings used across screens
    - All string values in Hindi (Devanagari Unicode)
    - _Requirements: 11.1, 11.2, 11.4_

- [x] 3. Create `src/services/demoApi.js`
  - [x] 3.1 Implement all 7 exported functions with Promise-shaped return values
    - `getWeatherData()` → `{ current: { temp, condition, humidity, wind }, forecast: [...7 WeatherEntry] }`
    - `getMandiPrices(crop?)` → array of exactly 6 MandiPriceEntry objects; if `crop` is provided and not 'सभी', return filtered subset
    - `getCommonDiseases()` → array of 3 disease objects
    - `analyzeCropDisease(imageUri)` → `{ disease, confidence: 94, description, remedies: [...strings] }`
    - `getChatResponse(message)` → `{ text: string, time: string }`
    - `getMandiDetail(cropId)` → `{ priceHistory: [...7], nearbyMandis: [...4] }`
    - `getFarmerProfile()` → `{ name, location, crops, settings }`
    - Each function simulates latency with `setTimeout` inside a `Promise` (500–1000 ms)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

- [ ] 4. Update shared components
  - [-] 4.1 Overwrite `src/components/Header.js`
    - Replace `react-native-vector-icons/Feather` import with `@expo/vector-icons` Feather
    - Back button uses Feather `arrow-left` icon instead of text "←"
    - All existing props (title, showBack, onBackPress) remain unchanged
    - _Requirements: 9.4, 10.2_
  - [-] 4.2 Overwrite `src/components/Card.js`
    - Replace `react-native-vector-icons/Feather` import with `@expo/vector-icons` Feather
    - Upgrade `borderRadius` on container to 16 (was 12)
    - All existing props remain unchanged
    - _Requirements: 2.3, 10.2_
  - [-] 4.3 Overwrite `src/components/PriceCard.js`
    - Replace `react-native-vector-icons/Feather` import with `@expo/vector-icons` Feather
    - Upgrade container `borderRadius` to 16
    - Ensure change badge uses `trending-up` (green) vs `trending-down` (red) based on `change.startsWith('+')`
    - _Requirements: 4.6, 10.2_
  - [-] 4.4 Overwrite `src/components/WeatherCard.js`
    - Replace `react-native-vector-icons/Feather` import with `@expo/vector-icons` Feather
    - Upgrade container `borderRadius` to 16
    - All existing props remain unchanged
    - _Requirements: 5.2, 10.2_

- [~] 5. Update `src/navigation/AppNavigator.js`
  - Replace `react-native-vector-icons/Feather` import with `@expo/vector-icons` Feather
  - Ensure RootStack has `initialRouteName: 'Splash'` and registers Splash, Main, WeatherAdvisory, AIChat, MandiDetail, CropDisease, MandiPrices as routes
  - Ensure MainTabs has four tabs: HomeTab (HomeScreen, home icon), ScanTab (CropDiseaseScreen, camera icon), MandiTab (MandiPricesScreen, shopping-cart icon), ProfileTab (ProfileScreen, user icon)
  - Set `headerShown: false` for all screens
  - Set tab bar `height: 60`, `paddingBottom: 8`, `paddingTop: 8`
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [~] 6. Rewrite `src/screens/SplashScreen.js`
  - Replace `react-native-linear-gradient` import with `expo-linear-gradient`
  - Change `navigation.replace('Home')` to `navigation.replace('Main')`
  - Change timer delay from 2000 ms to 2500 ms
  - Display wheat emoji 🌾 inside white logo circle (remove "KS" text approach or keep either)
  - Display app name "किसान सेवक" and tagline from `Strings`
  - Display three animated loading dots using React Native `Animated` API (opacity pulse)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [~] 7. Rewrite `src/screens/HomeScreen.js`
  - Replace `react-native-vector-icons/Feather` import with `@expo/vector-icons` Feather
  - Import greeting and dashboard data from `Strings` instead of `demoData`
  - Import `Card` component; use `Strings.dashboardCards` for the four feature tiles
  - Ensure each `Card` `onPress` calls `navigation.navigate(card.screen)`
  - Today's tip card uses `Strings.todayTip`
  - Mini stats row hard-codes 28°C, ₹2,450, 45%
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [~] 8. Rewrite `src/screens/CropDiseaseScreen.js`
  - Replace single image picker button with two separate `TouchableOpacity` buttons: "📷 कैमरा" (calls `launchCameraAsync`) and "🖼 गैलरी" (calls `launchImageLibraryAsync`)
  - Import `expo-image-picker`; remove old `react-native-image-picker` import
  - Add `isAnalyzing` state; after image selection, set `isAnalyzing = true`, call `demoApi.analyzeCropDisease(uri)`, then set `isAnalyzing = false` and show result
  - While analyzing: render `ActivityIndicator` + "विश्लेषण हो रहा है..." text
  - After analysis: render result card with disease name, "94% मिलान" badge, description, numbered remedies list
  - On permission denied: call `Alert.alert('अनुमति आवश्यक', 'कैमरा अनुमति आवश्यक है।')`
  - Common diseases section uses `demoApi.getCommonDiseases()`
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [~] 9. Rewrite `src/screens/MandiPricesScreen.js`
  - Replace `react-native-vector-icons/Feather` with `@expo/vector-icons` Feather
  - Add `searchText` state and a `TextInput` search bar at top; filter FlatList by `crop.includes(searchText)`
  - Replace state filter chips with crop-type chips from `Strings.cropFilters`; update active chip to filter FlatList by crop name
  - Replace `ScrollView` price list with `FlatList` using `keyExtractor={item => item.id.toString()}`
  - Prices sourced from `demoApi.getMandiPrices()` called in `useEffect`
  - Each `PriceCard` wrapped in `TouchableOpacity` → `navigation.navigate('MandiDetail', { item })`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [~] 10. Rewrite `src/screens/WeatherAdvisoryScreen.js`
  - Replace `react-native-vector-icons/Feather` with `@expo/vector-icons` Feather
  - Hero card data sourced from `demoApi.getWeatherData().current`
  - 7-day forecast rendered from `demoApi.getWeatherData().forecast` in a horizontal `ScrollView`
  - Four advisory cards use `Strings.advisories`
  - Warning strip and agricultural calendar remain as static content from `Strings`
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [~] 11. Rewrite `src/screens/AIChatScreen.js`
  - Replace `react-native-vector-icons/Feather` with `@expo/vector-icons` Feather
  - Initialise `messages` state with `Strings.demoConversation` (4 pre-loaded messages)
  - Replace manual `ScrollView` with `FlatList` with a `ref`; call `flatListRef.current.scrollToEnd` on new message
  - `sendMessage`: append user message → call `demoApi.getChatResponse(text)` → append bot reply; clear `TextInput`
  - User bubbles: right-aligned, `backgroundColor: Colors.primaryGreen`, white text
  - Bot bubbles: left-aligned, white card with shadow, `Colors.textPrimary`
  - Timestamp rendered below each bubble
  - Quick-question chips from `Strings.quickQuestions`; tap sets `inputText`
  - Add mic icon (Feather `mic`) to left of `TextInput` (non-functional, visual only)
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [~] 12. Rewrite `src/screens/MandiDetailScreen.js`
  - Replace `react-native-vector-icons/Feather` with `@expo/vector-icons` Feather
  - Load detail data from `demoApi.getMandiDetail(item.id)` in `useEffect`
  - Replace the plain `historyContainer` list with an `SVGChart` component:
    - Create a local `SVGChart` function component (or inline) using `react-native-svg` `Svg`, `Polyline`, `Line`, `Text` (svg) elements
    - Chart dimensions: `width: 300`, `height: 140`
    - Compute X positions as evenly-spaced across width; compute Y positions by linear scaling of price values to [10, 130] range so all points are within viewport
    - Draw a `Polyline` with `stroke={Colors.primaryGreen}`, `strokeWidth={2}`, `fill="none"`
    - Draw small circles at each data point using `Circle` element, `r={4}`, `fill={Colors.primaryGreen}`
    - Draw date labels along X-axis using svg `Text` elements
  - Nearby mandis list and analysis card remain; data from `demoApi.getMandiDetail`
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [~] 13. Rewrite `src/screens/ProfileScreen.js`
  - Replace `react-native-vector-icons/Feather` with `@expo/vector-icons` Feather
  - Fix all syntax errors (mismatched quote styles `"` vs `}` on `Text style` props in existing file)
  - Avatar: green circle with initials "रक"; name "राम किसान"; location "उत्तर प्रदेश"
  - Multi-select crop chips: `selectedCrops` state (Set or array); tapping a chip toggles membership; active chips use `backgroundColor: Colors.primaryGreen` and white text
  - Language selector: `selectedLanguage` state ('hindi' | 'english'); single-select chips
  - Three `Switch` rows: `priceAlerts`, `weatherAlerts`, `diseaseAlerts` — each with its own state variable; `onValueChange` updates state immediately
  - Version footer "किसान सेवक v1.0.0"
  - Remove non-functional menu items (MyLand, CropHistory, etc.) or keep as non-navigable rows
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [~] 14. Update `App.js` and final wiring
  - Ensure `App.js` imports `SafeAreaProvider` from `react-native-safe-area-context` and `AppNavigator` from `./src/navigation/AppNavigator`
  - Verify no remaining imports of removed packages (`react-native-linear-gradient`, `react-native-vector-icons`, `react-native-image-picker`, `lottie-react-native`, `react-native-shimmer-placeholder`) exist anywhere in `src/`
  - Run a search across all files for the old package names and confirm zero remaining references
  - Ensure `app.json` includes `expo.plugins: [["expo-image-picker", { "photosPermission": "फसल की तस्वीर लेने के लिए अनुमति दें।" }]]`
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 9.1_

- [~] 15. Final checkpoint — Ensure all screens run without errors
  - Ensure all tests pass, ask the user if questions arise.
  - Verify the app starts in Expo Go without red screen errors.
  - Confirm SplashScreen navigates to Main (not Home) after 2.5 s.
  - Confirm bottom tabs all render their screens.
  - Confirm MandiPricesScreen → MandiDetailScreen navigation passes params correctly.
  - Confirm CropDiseaseScreen image picker buttons are separate and functional.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Tasks 1–5 are pure file edits; no running app needed until Task 6+
- The SVG chart in Task 12 is the highest-complexity item — the scaling math must ensure no point has y < 0 or y > chartHeight
- After Task 1 is done, run `npx expo install` to sync Expo-managed package versions correctly
- The existing `demoData.js` can be kept as-is for backward compatibility; new screens import from `demoApi.js` and `strings.js` instead

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "2.2", "3.1"] },
    { "id": 1, "tasks": ["4.1", "4.2", "4.3", "4.4"] },
    { "id": 2, "tasks": ["5"] },
    { "id": 3, "tasks": ["6", "7", "9", "10"] },
    { "id": 4, "tasks": ["8", "11", "12", "13"] },
    { "id": 5, "tasks": ["14"] }
  ]
}
```
