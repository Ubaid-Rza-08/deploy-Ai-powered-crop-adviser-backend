// services/api.js
import { API_CONFIG } from '../data/constants';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  async makeRequest(url, options = {}) {
    const defaultOptions = {
      headers: {
        ...options.headers,
      },
    };

    // Skip adding Authorization header for auth-related endpoints
    const authEndpoints = ['/auth/send-otp', '/auth/verify-otp', '/auth/signup', '/auth/refresh'];
    const isAuthEndpoint = authEndpoints.some(endpoint => url.includes(endpoint));
    const token = localStorage.getItem('accessToken');

    if (token && !isAuthEndpoint) {
      defaultOptions.headers.Authorization = `Bearer ${token}`;
    }

    if (options.body && typeof options.body === 'string') {
      defaultOptions.headers['Content-Type'] = 'application/json';
    }

    const finalOptions = { ...defaultOptions, ...options };

    try {
      console.log(`Making API request to: ${url}`);
      const response = await fetch(url, finalOptions);
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If can't parse JSON error, use default message
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('API Request failed:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
      }
      
      throw error;
    }
  }

  async sendOTP(phone) {
    return this.makeRequest(`${this.baseURL}/auth/send-otp`, {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  }

  async verifyOTP(phone, otp) {
    return this.makeRequest(`${this.baseURL}/auth/verify-otp`, {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    });
  }

  async signup(userData) {
    return this.makeRequest(`${this.baseURL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async sendChatMessage(message, language, imageFile = null) {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('language', language);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const headers = {};
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.makeRequest(API_CONFIG.CHATBOT_URL, {
      method: 'POST',
      headers,
      body: formData,
    });
  }

  async getWeather(city) {
    return this.makeRequest(`${this.baseURL}/location?city=${encodeURIComponent(city)}`, {
      method: 'GET',
    });
  }
}

const apiService = new ApiService();
export default apiService;