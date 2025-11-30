// API Configuration
// Change this to switch between local and deployed backend
const USE_LOCAL_API = true;

export const API_BASE_URL = USE_LOCAL_API 
  ? 'http://localhost:8080'
  : 'https://news-aggregator-dpvh.onrender.com';

export const API_ENDPOINTS = {
  HOME: `${API_BASE_URL}/api/home`,
  NEWS: `${API_BASE_URL}/api/news`,
  TOP_STORIES: `${API_BASE_URL}/api/news/top-stories`,
  SEARCH_SUGGEST: `${API_BASE_URL}/api/search-suggest`,
  SEARCH_INCREMENT: `${API_BASE_URL}/api/search-increment`,
};
