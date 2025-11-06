import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../utils/constants';

const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    // In production app, these errors would be logged to an error tracking service such as Sentry or LogRocket
    if (error.response) {
      const status = error.response.status;
      const message = error.message || 'An error occurred';

      switch (status) {
        case 404:
          console.error('Resource not found:', error.config?.url);
          break;
        case 500:
          console.error('Server error:', error.config?.url);
          break;
        default:
          console.error('API Error:', status, message);
      }
    } else if (error.request) {
      console.error('Network error: No response received');
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default httpClient;
