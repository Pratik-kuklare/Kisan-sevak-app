# Kisan Sevak REST API

JSON-only Node.js + Express backend for the Kisan Sevak React Native mobile
application. This server does not serve HTML pages or frontend content.

## Features

- OpenWeatherMap weather data with Hindi farming advice
- Mandi reference prices for crops and states with MSP comparison
- Google Gemini farming assistant chat
- Google Gemini Vision crop disease analysis
- 10 Indian government farmer schemes
- In-memory farmer profiles
- CORS enabled for React Native clients

## Run locally

```bash
npm install
copy .env.example .env
npm start
```

Set these values in `.env`:

```env
PORT=3000
OPENWEATHER_API_KEY=your_openweathermap_key
GEMINI_API_KEY=your_gemini_key
GEMINI_CHAT_MODEL=gemini-3.8-flash
GEMINI_VISION_MODEL=gemini-3.8-flash
```

The API listens on `http://localhost:3000` or the port supplied by `PORT`.
Every endpoint returns JSON, including the health response and errors.

## Deploy on Railway

1. Create a Railway project from this repository.
2. Add `OPENWEATHER_API_KEY` and `GEMINI_API_KEY` as Railway variables.
3. Railway uses the `npm start` command automatically.
4. Railway supplies `PORT` automatically.
5. Use the generated public URL in the React Native app.

## API endpoints

### Health response

```http
GET /
```

```json
{
  "name": "Kisan Sevak API",
  "status": "चल रहा है"
}
```

### Weather

```http
GET /api/weather?city=Pune
```

Returns temperature, humidity, wind speed, description, rain forecast and
Hindi farming advice. Requires `OPENWEATHER_API_KEY`.

### Mandi prices

```http
GET /api/mandi?crop=wheat
GET /api/mandi/all
```

Mandi prices are reference values bundled with the application because the
official live provider is unavailable from the current Railway deployment.
They are not real-time market quotes. Replace this dataset with an active
official or commercial provider before using it for trading decisions.

Supported crops: `wheat`, `rice`, `tomato`, `onion`, `potato`, `soybean`,
`mustard`, `cotton`, `maize`, and `chickpea`.

Example:

```json
{
  "crop": "wheat",
  "nameHindi": "गेहूं",
  "marketPrice": 2450,
  "msp": 2425,
  "unit": "रुपये प्रति क्विंटल",
  "mspComparison": "MSP से ऊपर"
}
```

### AI chat

```http
POST /api/chat
Content-Type: application/json
```

Request:

```json
{
  "message": "गेहूं में पानी कब दें?",
  "language": "hindi"
}
```

Response:

```json
{
  "response": "गेहूं में मिट्टी की नमी देखकर सिंचाई करें। खेत में पानी जमा न होने दें।"
}
```

Requires `GEMINI_API_KEY`.

### Crop disease detection

```http
POST /api/disease
Content-Type: application/json
```

Request:

```json
{
  "image": "<base64 encoded image>"
}
```

Returns `diseaseName`, `symptoms`, `treatment`, and `healthy` in Hindi.
The image may be raw base64 or a `data:image/...;base64,...` value.
Requires `GEMINI_API_KEY`.

### Government schemes

```http
GET /api/schemes
```

Returns 10 schemes with name, benefit, eligibility and official link,
including PM-KISAN, PM Fasal Bima, KCC, PM-KUSUM, PM Krishi Sinchai Yojana,
Soil Health Card and other schemes.

### Farmer profile

```http
POST /api/profile
Content-Type: application/json
```

Request:

```json
{
  "phone": "9876543210",
  "name": "राम",
  "state": "महाराष्ट्र",
  "crops": ["wheat"],
  "landSize": 2
}
```

Retrieve the profile:

```http
GET /api/profile/9876543210
```

Profiles are stored in memory only and are lost when the server restarts.

## Error format

Invalid requests, missing API keys, unknown routes and upstream failures use
JSON responses such as:

```json
{
  "error": "city आवश्यक है"
}
```

## Mobile app development

The existing Expo app is separate from this backend. If it is needed for local
development, use `npm run mobile` or `npm run mobile:android`; these commands
do not affect the API server or Railway deployment.
