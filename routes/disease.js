const express = require('express');
const { generateWithRetry } = require('./gemini');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { image } = req.body || {};
  if (typeof image !== 'string' || !image.trim()) return res.status(400).json({ error: 'image आवश्यक है' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'Gemini API key कॉन्फ़िगर नहीं है' });

  const match = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  const mimeType = match ? match[1] : 'image/jpeg';
  const base64Data = match ? match[2] : image;
  if (!/^[A-Za-z0-9+/=\r\n]+$/.test(base64Data)) return res.status(400).json({ error: 'image का base64 format अमान्य है' });

  try {
    const result = await generateWithRetry(process.env.GEMINI_API_KEY, [
      'इस फसल की तस्वीर का विश्लेषण करें। केवल JSON में उत्तर दें: {"diseaseName":"...","symptoms":"...","treatment":"...","healthy":true या false}। उत्तर हिंदी (देवनागरी) में दें। यदि बीमारी नहीं है तो diseaseName में "कोई बीमारी नहीं" और healthy में true लिखें। कीटनाशक की सटीक मात्रा न बताएं; सुरक्षित रूप से कृषि विशेषज्ञ से सलाह लेने को कहें।',
      { inlineData: { data: base64Data.replace(/\s/g, ''), mimeType } },
    ], process.env.GEMINI_VISION_MODEL);
    const text = result.response.text().replace(/^```json\s*|\s*```$/g, '').trim();
    let analysis;
    try {
      analysis = JSON.parse(text);
    } catch {
      analysis = { diseaseName: 'विश्लेषण उपलब्ध नहीं है', symptoms: text, treatment: 'कृषि विशेषज्ञ से सलाह लें', healthy: false };
    }
    res.json(analysis);
  } catch (error) {
    if ([429, 500, 503].includes(error.status || error.response?.status)) {
      return res.status(503).json({ error: 'AI सेवा अभी व्यस्त है, कृपया कुछ देर बाद फिर प्रयास करें' });
    }
    next(error);
  }
});

module.exports = router;
