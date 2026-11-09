// Demo data for Kisan Sevak app
export const demoData = {
  // Home screen data
  dashboardCards: [
    {
      id: 1,
      title: 'फसल बीमारी जांच',
      subtitle: 'तस्वीर से पहचानें',
      icon: 'leaf',
      color: 'success',
      screen: 'CropDisease',
    },
    {
      id: 2,
      title: 'मंडी भाव',
      subtitle: 'आज के दाम देखें',
      icon: 'shopping-cart',
      color: 'amber',
      screen: 'MandiPrices',
    },
    {
      id: 3,
      title: 'मौसम सलाह',
      subtitle: '7 दिन का पूर्वानुमान',
      icon: 'cloud',
      color: 'primary',
      screen: 'WeatherAdvisory',
    },
    {
      id: 4,
      title: 'AI सलाहकार',
      subtitle: 'प्रश्न पूछें',
      icon: 'message-circle',
      color: 'secondary',
      screen: 'AIChat',
    },
  ],

  // Mandi prices data
  mandiPrices: [
    {
      id: 1,
      crop: 'गेहूं',
      price: '₹2,450/क्विंटल',
      change: '+2.5%',
      market: 'अजमेर मंडी',
      state: 'राजस्थान',
    },
    {
      id: 2,
      crop: 'चावल',
      price: '₹3,150/क्विंटल',
      change: '+1.8%',
      market: 'कानपुर मंडी',
      state: 'उत्तर प्रदेश',
    },
    {
      id: 3,
      crop: 'कपास',
      price: '₹6,820/क्विंटल',
      change: '-0.5%',
      market: 'विदर्भ मंडी',
      state: 'महाराष्ट्र',
    },
    {
      id: 4,
      crop: 'सोयाबीन',
      price: '₹4,250/क्विंटल',
      change: '+3.2%',
      market: 'इंदौर मंडी',
      state: 'मध्य प्रदेश',
    },
    {
      id: 5,
      crop: 'गन्ना',
      price: '₹320/क्विंटल',
      change: '+1.2%',
      market: 'मेरठ मंडी',
      state: 'उत्तर प्रदेश',
    },
  ],

  // Weather data
  weatherForecast: [
    {
      day: 'आज',
      date: '25 मार्च',
      temp: '28°C',
      condition: 'साफ',
      icon: 'sun',
      advice: 'खेत की सिंचाई के लिए अच्छा दिन',
    },
    {
      day: 'कल',
      date: '26 मार्च',
      temp: '26°C',
      condition: 'हल्की बारिश',
      icon: 'cloud-rain',
      advice: 'फसल की सुरक्षा के लिए तैयार रहें',
    },
    {
      day: 'मंगल',
      date: '27 मार्च',
      temp: '24°C',
      condition: 'बारिश',
      icon: 'cloud-rain',
      advice: 'खेत में जल निकासी की व्यवस्था करें',
    },
    {
      day: 'बुध',
      date: '28 मार्च',
      temp: '27°C',
      condition: 'साफ',
      icon: 'sun',
      advice: 'खाद डालने के लिए उपयुक्त दिन',
    },
  ],

  // Crop diseases data
  commonDiseases: [
    {
      id: 1,
      name: 'गेहूं का किट्ट रोग',
      crop: 'गेहूं',
      symptoms: 'पत्तों पर भूरे धब्बे, पौधों की वृद्धि रुकना',
      treatment: 'प्रोपिकोनाजोल 25% का छिड़काव',
    },
    {
      id: 2,
      name: 'चावल का ब्लास्ट रोग',
      crop: 'चावल',
      symptoms: 'पत्तों पर हीरे के आकार के धब्बे',
      treatment: 'कार्बेन्डाजिम का छिड़काव',
    },
    {
      id: 3,
      name: 'कपास का विल्ट रोग',
      crop: 'कपास',
      symptoms: 'पत्तों का मुरझाना, पौधे का सूखना',
      treatment: 'कार्बोफ्यूरान का उपयोग',
    },
  ],
};