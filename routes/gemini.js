const { GoogleGenerativeAI } = require('@google/generative-ai');

function isRetryable(error) {
  return [429, 500, 503].includes(error.status || error.response?.status);
}

async function generateWithRetry(apiKey, content, configuredModel) {
  const models = (configuredModel || 'gemini-flash-latest,gemini-3.8-flash')
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);
  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError;

  for (const modelName of models) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        return await genAI.getGenerativeModel({ model: modelName }).generateContent(content);
      } catch (error) {
        lastError = error;
        if (!isRetryable(error)) break;
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

module.exports = { generateWithRetry };
