import axios from 'axios';

export const $profile = axios.create({
  baseURL: 'http://84.38.183.246/api/v1/user/',
  withCredentials: true,
});

export const $login = axios.create({
  baseURL: 'http://84.38.183.246/auth/jwt/create/',
});

export const $map = axios.create({
  baseURL: 'http://84.38.183.246/api/v1/',
  withCredentials: true,
});

$map.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  }
);

$profile.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  }
);

const baseUrl = 'http://localhost:3000/'

export default baseUrl

