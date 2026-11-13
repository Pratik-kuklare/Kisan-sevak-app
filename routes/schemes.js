const express = require('express');

const router = express.Router();
const schemes = [
  { name: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)', benefit: 'पात्र किसानों को सालाना 6,000 रुपये', eligibility: 'छोटे और सीमांत सहित सभी पात्र भू-धारक किसान', link: 'https://pmkisan.gov.in/' },
  { name: 'प्रधानमंत्री फसल बीमा योजना', benefit: 'फसल नुकसान पर बीमा सुरक्षा', eligibility: 'अधिसूचित फसल उगाने वाले किसान', link: 'https://pmfby.gov.in/' },
  { name: 'किसान क्रेडिट कार्ड (KCC)', benefit: 'कम ब्याज पर खेती के लिए ऋण', eligibility: 'किसान, बटाईदार और कृषि गतिविधि करने वाले लोग', link: 'https://www.myscheme.gov.in/schemes/kcc' },
  { name: 'प्रधानमंत्री किसान ऊर्जा सुरक्षा एवं उत्थान महाभियान (PM-KUSUM)', benefit: 'सौर पंप और सौर ऊर्जा पर सहायता', eligibility: 'किसान और किसान समूह', link: 'https://pmkusum.mnre.gov.in/' },
  { name: 'प्रधानमंत्री कृषि सिंचाई योजना', benefit: 'सिंचाई सुविधा और पानी बचाने वाली तकनीक पर सहायता', eligibility: 'किसान और कृषि समूह', link: 'https://pmksy.gov.in/' },
  { name: 'मृदा स्वास्थ्य कार्ड योजना', benefit: 'मिट्टी की जांच और उर्वरक सलाह', eligibility: 'सभी किसान', link: 'https://soilhealth.dac.gov.in/' },
  { name: 'राष्ट्रीय कृषि विकास योजना', benefit: 'कृषि और संबद्ध क्षेत्रों के विकास के लिए सहायता', eligibility: 'राज्य की पात्र कृषि परियोजनाएं और किसान समूह', link: 'https://rkvy.nic.in/' },
  { name: 'परंपरागत कृषि विकास योजना', benefit: 'जैविक खेती के लिए प्रशिक्षण और सहायता', eligibility: 'किसान समूह और क्लस्टर', link: 'https://pgsindia-ncof.gov.in/' },
  { name: 'कृषि अवसंरचना कोष', benefit: 'भंडारण और कृषि ढांचे के लिए ऋण पर ब्याज सहायता', eligibility: 'किसान, FPO, सहकारी संस्थाएं और उद्यमी', link: 'https://agriinfra.dac.gov.in/' },
  { name: 'राष्ट्रीय खाद्य सुरक्षा मिशन', benefit: 'बीज, प्रशिक्षण और तकनीक से उत्पादकता बढ़ाना', eligibility: 'अधिसूचित फसलों के किसान', link: 'https://nfsm.gov.in/' },
];

router.get('/', (req, res) => res.json({ schemes }));

module.exports = router;
