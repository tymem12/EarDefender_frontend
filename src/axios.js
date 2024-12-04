import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://34.77.80.233:9090',
});

export default instance;
