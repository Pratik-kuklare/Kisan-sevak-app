const express = require('express');

const router = express.Router();
const profiles = new Map();

router.post('/', (req, res) => {
  const { phone, name, state, crops, landSize } = req.body || {};
  if (typeof phone !== 'string' || !phone.trim() || typeof name !== 'string' || !name.trim() || typeof state !== 'string' || !state.trim() || !Array.isArray(crops) || typeof landSize !== 'number' || landSize < 0) {
    return res.status(400).json({ error: 'phone, name, state, crops और landSize सही रूप में आवश्यक हैं' });
  }
  const profile = { phone: phone.trim(), name: name.trim(), state: state.trim(), crops, landSize };
  profiles.set(profile.phone, profile);
  res.status(201).json(profile);
});

router.get('/:phone', (req, res) => {
  const profile = profiles.get(req.params.phone);
  if (!profile) return res.status(404).json({ error: 'किसान प्रोफ़ाइल नहीं मिली' });
  res.json(profile);
});

module.exports = router;
