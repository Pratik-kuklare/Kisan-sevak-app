const express = require('express');
const axios = require('axios');

const router = express.Router();
const cropNames = {
  wheat: 'गेहूं', rice: 'चावल', tomato: 'टमाटर', onion: 'प्याज', potato: 'आलू',
  soybean: 'सोयाबीन', mustard: 'सरसों', cotton: 'कपास', maize: 'मक्का', chickpea: 'चना',
};
const cropAliases = {
  wheat: ['wheat', 'गेहूं', 'गेहूँ'],
  rice: ['rice', 'paddy', 'चावल', 'धान'],
  tomato: ['tomato', 'टमाटर'],
  onion: ['onion', 'प्याज'],
  potato: ['potato', 'आलू'],
  soybean: ['soybean', 'सोयाबीन'],
  mustard: ['mustard', 'सरसों'],
  cotton: ['cotton', 'कपास'],
  maize: ['maize', 'corn', 'मक्का'],
  chickpea: ['chickpea', 'gram', 'चना'],
};
const msp = { wheat: 2425, rice: 2300, soybean: 4892, mustard: 5950, cotton: 7521, maize: 2225, chickpea: 5650 };

function number(value) {
  const parsed = Number(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function normalize(record) {
  const commodity = `${record.commodity || ''} ${record.crop || ''}`.toLowerCase();
  const crop = Object.entries(cropAliases).find(([, aliases]) =>
    aliases.some((alias) => commodity.includes(alias)),
  )?.[0] || commodity.trim();
  const modalPrice = number(record.modal_price || record.modalPrice || record.price);
  return {
    crop,
    nameHindi: cropNames[crop] || record.commodity || record.crop,
    marketPrice: modalPrice,
    minPrice: number(record.min_price || record.minPrice),
    maxPrice: number(record.max_price || record.maxPrice),
    market: record.market || record.mandi || '',
    state: record.state || '',
    district: record.district || '',
    arrivalDate: record.arrival_date || record.arrivalDate || null,
    msp: msp[crop] || null,
    unit: 'रुपये प्रति क्विंटल',
    mspComparison: msp[crop] && modalPrice ? (modalPrice >= msp[crop] ? 'MSP से ऊपर' : 'MSP से नीचे') : 'MSP उपलब्ध नहीं है',
  };
}

async function fetchLivePrices(crop) {
  const apiKey = process.env.DATA_GOV_IN_API_KEY;
  if (!apiKey) throw Object.assign(new Error('लाइव मंडी API key कॉन्फ़िगर नहीं है'), { status: 503 });
  const resourceId = process.env.MANDI_RESOURCE_ID || '9ef84268-d588-465a-a308-a864a43d0070';
  const params = { 'api-key': apiKey, format: 'json', limit: 100 };
  if (crop) params['filters[commodity]'] = cropNames[crop] || crop;
  const response = await axios.get(`https://api.data.gov.in/resource/${resourceId}`, {
    params,
    timeout: 15000,
  });
  return (response.data.records || []).map(normalize).filter((item) => item.marketPrice !== null);
}

router.get('/', async (req, res, next) => {
  const crop = typeof req.query.crop === 'string' ? req.query.crop.trim().toLowerCase() : '';
  if (!crop) return res.status(400).json({ error: 'crop आवश्यक है' });
  try {
    const prices = await fetchLivePrices(crop);
    if (!prices.length) return res.status(404).json({ error: 'लाइव मंडी भाव उपलब्ध नहीं है' });
    res.json({ crop: prices[0].crop, prices });
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return res.status(502).json({ error: 'लाइव मंडी API key अमान्य है' });
    }
    if (['EHOSTUNREACH', 'ECONNREFUSED', 'ETIMEDOUT', 'ECONNABORTED'].includes(error.code)) {
      return res.status(503).json({ error: 'लाइव मंडी सेवा इस समय नेटवर्क से उपलब्ध नहीं है, कृपया कुछ देर बाद फिर प्रयास करें' });
    }
    next(error);
  }
});

router.get('/all', async (req, res, next) => {
  try {
    res.json({ prices: await fetchLivePrices() });
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return res.status(502).json({ error: 'लाइव मंडी API key अमान्य है' });
    }
    if (['EHOSTUNREACH', 'ECONNREFUSED', 'ETIMEDOUT', 'ECONNABORTED'].includes(error.code)) {
      return res.status(503).json({ error: 'लाइव मंडी सेवा इस समय नेटवर्क से उपलब्ध नहीं है, कृपया कुछ देर बाद फिर प्रयास करें' });
    }
    next(error);
  }
});

module.exports = router;
