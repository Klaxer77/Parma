import axios from 'axios';

export const $profile = axios.create({
  baseURL: 'http://localhost:8000/api/v1/user/',
});

export const $login = axios.create({
  baseURL: 'http://localhost:8000/auth/jwt/create/',
  withCredentials: true
});

 export const config = {
  headers: {
    Authorization: `JWT ${localStorage.getItem('access')}`
  }
};
