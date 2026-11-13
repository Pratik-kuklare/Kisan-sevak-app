require('dotenv').config();

const express = require('express');
const cors = require('cors');

const weatherRoutes = require('./routes/weather');
const mandiRoutes = require('./routes/mandi');
const chatRoutes = require('./routes/chat');
const diseaseRoutes = require('./routes/disease');
const schemesRoutes = require('./routes/schemes');
const profileRoutes = require('./routes/profile');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.json({ name: 'Kisan Sevak API', status: 'चल रहा है' });
});

app.use('/api/weather', weatherRoutes);
app.use('/api/mandi', mandiRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/profile', profileRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'यह API endpoint नहीं मिला' });
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  res.status(error.status || 500).json({
    error: error.message || 'सर्वर में अनपेक्षित त्रुटि हुई',
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Kisan Sevak API listening on port ${port}`);
  });
}

module.exports = app;
