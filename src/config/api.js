//Defines all the API endpoints and base URLs for your backend connection

export const API_BASE_URL = "https://your-backend-url.com/api";

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  getUserProfile: `${API_BASE_URL}/user/profile`,
  updateProfile: `${API_BASE_URL}/user/update`,
  getMatches: `${API_BASE_URL}/matches`,
};

