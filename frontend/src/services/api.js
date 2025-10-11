/*import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default API;*/

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://rural-health-referral-system.onrender.com'
});

// This is an "interceptor". It runs before every single request.
API.interceptors.request.use(req => {
  // It checks if a token exists in local storage
  if (localStorage.getItem('token')) {
    // If it exists, it adds it to the 'Authorization' header
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API;
