import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { v4 } from 'uuid';

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.status === 401) {
    localStorage.removeItem('access_token');
  }

  return Promise.reject(error);
};

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  timeout: 10000,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'x-api-key': import.meta.env.VITE_PUBLIC_API_KEY,
    'x-request-id': v4(),
  },
});

api.interceptors.request.use(onRequest, onRequestError);
api.interceptors.response.use(onResponse, onResponseError);

export default api;
