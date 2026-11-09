// Demo API service for Kisan Sevak app
// In production, replace with real API calls

export const demoApi = {
  // Simulate API delay
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Get weather data
  getWeather: async () => {
    await demoApi.delay(500);
    return {
      current: {
        temp: '28°C',
        condition: 'साफ',
        humidity: '45%',
        wind: '12 km/h',
      },
      forecast: [
        { day: 'आज', temp: '28°C', condition: 'साफ' },
        { day: 'कल', temp: '26°C', condition: 'हल्की बारिश' },
        { day: 'मंगल', temp: '24°C', condition: 'बारिश' },
      ],
    };
  },
  
  // Get mandi prices
  getMandiPrices: async () => {
    await demoApi.delay(500);
    return [
      { crop: 'गेहूं', price: '₹2,450/क्विंटल', change: '+2.5%' },
      { crop: 'चावल', price: '₹3,150/क्विंटल', change: '+1.8%' },
      { crop: 'कपास', price: '₹6,820/क्विंटल', change: '-0.5%' },
    ];
  },
  
  // Analyze crop disease
  analyzeCropDisease: async (imageUri) => {
    await demoApi.delay(1000);
    return {
      disease: 'गेहूं का किट्ट रोग',
      confidence: '92%',
      treatment: 'प्रोपिकोनाजोल 25% का छिड़काव',
      description: 'फंगल रोग जो पत्तों पर भूरे धब्बे बनाता है',
    };
  },
  
  // Get AI chat response
  getAIResponse: async (question) => {
    await demoApi.delay(800);
    return `आपके प्रश्न "${question}" का उत्तर: यह फसल प्रबंधन के लिए महत्वपूर्ण है। विस्तृत जानकारी के लिए कृषि विभाग से संपर्क करें।`;
  },
};