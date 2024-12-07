import axios from 'axios';
import config from './config/axiosConfig';

const instance = axios.create({
  baseURL: config.connectorBaseURL,
});

export default instance;
