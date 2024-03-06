import axios from 'axios';

export const $profile = axios.create({

  // baseURL: 'http://localhost:8000/api/v1/user/',
  baseURL: 'http://84.38.183.246/api/v1/user/',
  withCredentials: true,
});

export const $login = axios.create({
  baseURL: 'http://84.38.183.246/api/auth/jwt/',
  // baseURL: 'http://localhost:8000/api/auth/jwt/',

});

export const $map = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/v1/',
  baseURL: 'http://84.38.183.246/api/v1/',
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

// const baseURL = 'http://localhost/:8000'
const baseURL = 'http://84.38.183.246'

export default baseURL


