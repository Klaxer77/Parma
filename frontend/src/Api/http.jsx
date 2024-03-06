import axios from 'axios';

export const $profile = axios.create({
  // baseURL: 'http://84.38.183.246/api/v1/user/',
  baseURL: 'http://localhost:8000/api/v1/user/',
  withCredentials: true,
});

export const $login = axios.create({
<<<<<<< HEAD
  // baseURL: 'http://84.38.183.246/auth/jwt/create/',
  baseURL: 'http://localhost:8000/auth/jwt/create/',
=======
  baseURL: 'http://84.38.183.246/auth/jwt',
>>>>>>> c41720402e963e6475dc68c404752a8ebf3d7bd0
});

export const $map = axios.create({
  // baseURL: 'http://84.38.183.246/api/v1/',
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

const baseURL = 'http://84.38.183.246'

export default baseURL


