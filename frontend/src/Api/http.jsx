import axios from 'axios';

export const $profile = axios.create({
  baseURL: 'http://localhost:8000/api/v1/user/',
  withCredentials: true,
});

export const $login = axios.create({
  baseURL: 'http://localhost:8000/auth/jwt/create/',
});

