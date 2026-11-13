const express = require('express');
const { generateWithRetry } = require('./gemini');

const router = express.Router();
const systemPrompt = 'You are Kisan Sevak, an expert AI farming assistant for Indian farmers. Always reply in the same language the farmer uses (Hindi, Marathi, Punjabi, Telugu, Bengali or English). Keep answers short, practical and easy to understand. Focus on: crop diseases, farming techniques, weather advice, government schemes, mandi prices, fertilizers, seeds, irrigation. Never give wrong advice about pesticides or chemicals.';

router.post('/', async (req, res, next) => {
  const { message, language } = req.body || {};
  if (typeof message !== 'string' || !message.trim()) return res.status(400).json({ error: 'message आवश्यक है' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'Gemini API key कॉन्फ़िगर नहीं है' });

  try {
    const languageHint = language ? `The farmer selected ${language}; respond in that language.` : '';
    const result = await generateWithRetry(
      process.env.GEMINI_API_KEY,
      `${systemPrompt}\n${languageHint}\nFarmer question: ${message.trim()}`,
      process.env.GEMINI_CHAT_MODEL,
    );
    res.json({ response: result.response.text() });
  } catch (error) {
    if ([429, 500, 503].includes(error.status || error.response?.status)) {
      return res.status(503).json({ error: 'AI सेवा अभी व्यस्त है, कृपया कुछ देर बाद फिर प्रयास करें' });
    }
    next(error);
  }
});

module.exports = router;
