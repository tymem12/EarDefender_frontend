import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://host.docker.internal:9090',
});

export default instance;
