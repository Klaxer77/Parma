import axios from 'axios';

const $profile = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/client',
});

 // http://localhost:8000/auth/jwt/create/


//  export const config = {
//   headers: {
//     Authorization: `JWT ${localStorage.getItem('accessToken')}`
//   }
// };

//  export default $api;