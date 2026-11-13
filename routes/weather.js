const express = require('express');
const axios = require('axios');

const router = express.Router();
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

function farmingAdvice(weather, rainMillimeters) {
  const advice = [];
  if (rainMillimeters > 0) advice.push('आज बारिश की संभावना है, कीटनाशक छिड़काव न करें');
  if (weather.main.temp > 35) advice.push('अधिक गर्मी है, सुबह जल्दी सिंचाई करें');
  if (weather.main.humidity > 80) advice.push('अधिक नमी से फसल में फफूंद रोग हो सकता है');
  if (weather.wind.speed * 3.6 > 20) advice.push('तेज हवा है, छिड़काव न करें');
  return advice.length ? advice : ['मौसम अनुकूल है, खेत की नियमित निगरानी करें'];
}

router.get('/', async (req, res, next) => {
  const city = typeof req.query.city === 'string' ? req.query.city.trim() : '';
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!city) return res.status(400).json({ error: 'city आवश्यक है' });
  if (!apiKey) return res.status(503).json({ error: 'मौसम सेवा की API key कॉन्फ़िगर नहीं है' });

  try {
    const params = { q: city, appid: apiKey, units: 'metric', lang: 'hi' };
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(weatherUrl, { params }),
      axios.get(forecastUrl, { params }),
    ]);
    const weather = currentResponse.data;
    const rainForecast = forecastResponse.data.list
      .slice(0, 8)
      .reduce((total, item) => total + (item.rain?.['3h'] || 0), 0);
    const rainNow = weather.rain?.['1h'] || weather.rain?.['3h'] || 0;
    const rainMillimeters = rainNow + rainForecast;

    res.json({
      city: weather.name,
      temperature: weather.main.temp,
      temperatureUnit: '°C',
      humidity: weather.main.humidity,
      windSpeed: weather.wind.speed,
      windSpeedUnit: 'm/s',
      description: weather.weather[0]?.description || 'मौसम उपलब्ध नहीं है',
      rainForecast: { millimeters: Number(rainMillimeters.toFixed(1)), next24Hours: rainMillimeters > 0 },
      farmingAdvice: farmingAdvice(weather, rainMillimeters),
    });
  } catch (error) {
    if (error.response?.status === 404) return res.status(404).json({ error: 'शहर नहीं मिला' });
    if (error.response?.status === 401) return res.status(502).json({ error: 'मौसम API key अमान्य है' });
    next(error);
  }
});

module.exports = router;
