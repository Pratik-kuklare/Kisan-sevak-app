const API_BASE_URL = 'https://kisan-sevak-app-production.up.railway.app';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || 'API अनुरोध विफल हुआ');
  return body;
}

export const api = {
  getWeather: ({ city, latitude, longitude } = {}) => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (latitude !== undefined) params.set('latitude', latitude);
    if (longitude !== undefined) params.set('longitude', longitude);
    return request(`/api/weather?${params.toString()}`);
  },
  getMandiPrices: () => request('/api/mandi/all'),
  sendChat: (message, language = 'hindi') => request('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message, language }),
  }),
  analyzeDisease: async (imageBase64) => request('/api/disease', {
    method: 'POST',
    body: JSON.stringify({ image: imageBase64 }),
  }),
};

export { API_BASE_URL };
