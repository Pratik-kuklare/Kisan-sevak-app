const express = require('express');

const router = express.Router();

const mandiPrices = {
  wheat: { hindi: 'गेहूं', english: 'Wheat', msp2026: 2425, states: { madhya_pradesh: [2380, 'भोपाल मंडी'], punjab: [2450, 'लुधियाना मंडी'], haryana: [2420, 'करनाल मंडी'], uttar_pradesh: [2390, 'कानपुर मंडी'], rajasthan: [2360, 'जयपुर मंडी'], maharashtra: [2410, 'पुणे मंडी'], gujarat: [2370, 'अहमदाबाद मंडी'], bihar: [2350, 'पटना मंडी'] } },
  rice: { hindi: 'धान', english: 'Paddy/Rice', msp2026: 2360, states: { punjab: [2380, 'अमृतसर मंडी'], haryana: [2360, 'कैथल मंडी'], uttar_pradesh: [2340, 'वाराणसी मंडी'], west_bengal: [2320, 'कोलकाता मंडी'], andhra_pradesh: [2350, 'विजयवाड़ा मंडी'], telangana: [2340, 'हैदराबाद मंडी'], odisha: [2310, 'भुवनेश्वर मंडी'], chhattisgarh: [2330, 'रायपुर मंडी'] } },
  soybean: { hindi: 'सोयाबीन', english: 'Soybean', msp2026: 5100, states: { madhya_pradesh: [4850, 'इंदौर मंडी'], maharashtra: [4900, 'लातूर मंडी'], rajasthan: [4820, 'कोटा मंडी'], karnataka: [4880, 'हुबली मंडी'] } },
  mustard: { hindi: 'सरसों', english: 'Mustard', msp2026: 5950, states: { rajasthan: [5800, 'जयपुर मंडी'], haryana: [5850, 'हिसार मंडी'], madhya_pradesh: [5780, 'ग्वालियर मंडी'], uttar_pradesh: [5820, 'आगरा मंडी'], punjab: [5870, 'फिरोजपुर मंडी'], gujarat: [5760, 'राजकोट मंडी'] } },
  cotton: { hindi: 'कपास', english: 'Cotton', msp2026: 7521, states: { gujarat: [7200, 'राजकोट मंडी'], maharashtra: [7150, 'अकोला मंडी'], telangana: [7180, 'वारंगल मंडी'], andhra_pradesh: [7160, 'गुंटूर मंडी'], madhya_pradesh: [7100, 'खरगोन मंडी'], haryana: [7220, 'सिरसा मंडी'], punjab: [7250, 'अबोहर मंडी'] } },
  chickpea: { hindi: 'चना', english: 'Chickpea', msp2026: 5650, states: { madhya_pradesh: [5500, 'इंदौर मंडी'], rajasthan: [5480, 'जोधपुर मंडी'], maharashtra: [5520, 'अकोला मंडी'], karnataka: [5460, 'गुलबर्गा मंडी'], uttar_pradesh: [5490, 'कानपुर मंडी'], andhra_pradesh: [5440, 'कुर्नूल मंडी'] } },
  maize: { hindi: 'मक्का', english: 'Maize', msp2026: 2225, states: { karnataka: [2150, 'दावणगेरे मंडी'], andhra_pradesh: [2180, 'निजामाबाद मंडी'], bihar: [2120, 'पटना मंडी'], uttar_pradesh: [2140, 'मेरठ मंडी'], madhya_pradesh: [2130, 'सागर मंडी'], rajasthan: [2110, 'कोटा मंडी'] } },
  groundnut: { hindi: 'मूंगफली', english: 'Groundnut', msp2026: 7100, states: { gujarat: [6900, 'जूनागढ़ मंडी'], andhra_pradesh: [6850, 'कुर्नूल मंडी'], rajasthan: [6800, 'बीकानेर मंडी'], karnataka: [6820, 'चित्रदुर्ग मंडी'], tamil_nadu: [6880, 'तिरुवल्लूर मंडी'] } },
  tomato: { hindi: 'टमाटर', english: 'Tomato', msp2026: null, states: { karnataka: [1800, 'कोलार मंडी'], andhra_pradesh: [1650, 'मदनपल्ले मंडी'], maharashtra: [1400, 'पुणे मंडी'], madhya_pradesh: [1200, 'इंदौर मंडी'], uttar_pradesh: [1100, 'लखनऊ मंडी'], gujarat: [1300, 'सूरत मंडी'] } },
  onion: { hindi: 'प्याज', english: 'Onion', msp2026: null, states: { maharashtra: [1800, 'लासलगाव मंडी'], madhya_pradesh: [1600, 'इंदौर मंडी'], karnataka: [1700, 'हुबली मंडी'], gujarat: [1550, 'भावनगर मंडी'], rajasthan: [1500, 'अलवर मंडी'], uttar_pradesh: [1450, 'आगरा मंडी'] } },
  potato: { hindi: 'आलू', english: 'Potato', msp2026: null, states: { uttar_pradesh: [1200, 'आगरा मंडी'], west_bengal: [1100, 'हुगली मंडी'], bihar: [1050, 'पटना मंडी'], punjab: [1150, 'जालंधर मंडी'], madhya_pradesh: [1000, 'इंदौर मंडी'], gujarat: [1080, 'सूरत मंडी'] } },
  garlic: { hindi: 'लहसुन', english: 'Garlic', msp2026: null, states: { madhya_pradesh: [14000, 'मंदसौर मंडी'], rajasthan: [13500, 'कोटा मंडी'], gujarat: [13000, 'गोंडल मंडी'], uttar_pradesh: [12500, 'हाथरस मंडी'] } },
  sugarcane: { hindi: 'गन्ना', english: 'Sugarcane', msp2026: 370, states: { uttar_pradesh: [370, 'मेरठ मंडी'], maharashtra: [365, 'पुणे मंडी'], karnataka: [360, 'बेलगाम मंडी'], tamil_nadu: [355, 'कोयंबटूर मंडी'], bihar: [350, 'पटना मंडी'] } },
  lentil: { hindi: 'मसूर', english: 'Lentil', msp2026: 6700, states: { madhya_pradesh: [6500, 'सागर मंडी'], uttar_pradesh: [6480, 'कानपुर मंडी'], bihar: [6450, 'पटना मंडी'], rajasthan: [6520, 'जयपुर मंडी'] } },
  moong: { hindi: 'मूंग', english: 'Green Gram', msp2026: 8700, states: { rajasthan: [8400, 'जोधपुर मंडी'], madhya_pradesh: [8350, 'इंदौर मंडी'], maharashtra: [8300, 'अकोला मंडी'], andhra_pradesh: [8250, 'कुर्नूल मंडी'], karnataka: [8280, 'गुलबर्गा मंडी'] } },
  urad: { hindi: 'उड़द', english: 'Black Gram', msp2026: 7400, states: { madhya_pradesh: [7200, 'इंदौर मंडी'], maharashtra: [7150, 'अकोला मंडी'], andhra_pradesh: [7100, 'कुर्नूल मंडी'], karnataka: [7080, 'गुलबर्गा मंडी'], uttar_pradesh: [7050, 'कानपुर मंडी'] } },
};

function toRecord(crop, details, state) {
  const selected = state && details.states[state];
  const first = Object.entries(details.states)[0];
  const [price, mandi] = selected || first || [details.msp2026, 'राष्ट्रीय औसत'];
  return {
    crop,
    hindi: details.hindi,
    english: details.english,
    price,
    marketPrice: price,
    unit: 'क्विंटल',
    msp2026: details.msp2026,
    msp: details.msp2026,
    mspComparison: details.msp2026 === null ? 'MSP उपलब्ध नहीं है' : price >= details.msp2026 ? 'MSP से ऊपर' : 'MSP से नीचे',
    mandi,
    state: state || (selected ? state : 'national'),
  };
}

router.get('/all', (req, res) => {
  const state = typeof req.query.state === 'string' ? req.query.state.toLowerCase() : '';
  const data = Object.entries(mandiPrices).map(([crop, details]) => toRecord(crop, details, state));
  res.json({
    success: true,
    date: new Date().toLocaleDateString('hi-IN'),
    source: 'Kisan Sevak संदर्भ भाव; लाइव सरकारी डेटा उपलब्ध नहीं',
    state: state || 'national',
    data,
    prices: data,
  });
});

router.get('/:crop', (req, res) => {
  const crop = req.params.crop.toLowerCase();
  const details = mandiPrices[crop];
  if (!details) return res.status(404).json({ success: false, message: 'फसल नहीं मिली' });
  const state = typeof req.query.state === 'string' ? req.query.state.toLowerCase() : '';
  const record = toRecord(crop, details, state);
  const allStates = Object.entries(details.states).map(([stateName, [price, mandi]]) => ({ state: stateName, price, mandi }));
  res.json({
    success: true,
    ...record,
    date: new Date().toLocaleDateString('hi-IN'),
    source: 'Kisan Sevak संदर्भ भाव; लाइव सरकारी डेटा उपलब्ध नहीं',
    all_states: allStates,
  });
});

module.exports = router;
