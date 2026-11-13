const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();
const systemPrompt = 'You are Kisan Sevak, an expert AI farming assistant for Indian farmers. Always reply in the same language the farmer uses (Hindi, Marathi, Punjabi, Telugu, Bengali or English). Keep answers short, practical and easy to understand. Focus on: crop diseases, farming techniques, weather advice, government schemes, mandi prices, fertilizers, seeds, irrigation. Never give wrong advice about pesticides or chemicals.';

router.post('/', async (req, res, next) => {
  const { message, language } = req.body || {};
  if (typeof message !== 'string' || !message.trim()) return res.status(400).json({ error: 'message आवश्यक है' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'Gemini API key कॉन्फ़िगर नहीं है' });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_CHAT_MODEL || 'gemini-3.8-flash' });
    const languageHint = language ? `The farmer selected ${language}; respond in that language.` : '';
    const result = await model.generateContent(`${systemPrompt}\n${languageHint}\nFarmer question: ${message.trim()}`);
    res.json({ response: result.response.text() });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
