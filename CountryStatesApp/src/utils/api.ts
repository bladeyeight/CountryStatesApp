import axios from 'axios';

const secureApi = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

secureApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default secureApi;
