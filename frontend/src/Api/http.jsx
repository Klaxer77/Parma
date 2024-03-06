import axios from 'axios';

export const $profile = axios.create({
  baseURL: 'http://localhost:8000/api/v1/user/',
  withCredentials: true,
});

export const $login = axios.create({
  baseURL: 'http://localhost:8000/api/auth/jwt',
  withCredentials: true,
});

export const $map = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
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

const baseURL = 'http://localhost/:8000'

export default baseURL


