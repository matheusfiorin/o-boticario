import axios from 'axios';

const api = axios.create({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Accepts': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem("jwt")
  }
});

export default api;