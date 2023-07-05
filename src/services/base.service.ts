import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const publicService = axios.create({
  baseURL: BASE_URL,
});

const service = axios.create({
  baseURL: BASE_URL,
});

export { service, publicService, BASE_URL };
