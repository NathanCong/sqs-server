import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

function getBaseUrl() {
  return process.env.BASE_URL;
}

/**
 * 创建axios实例
 */
const request: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error)
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
);

/**
 * GET 请求
 */
export function get(url: string, params?: unknown) {
  return request.get(url, { params });
}

/**
 * POST 请求（默认 JSON）
 */
export function post(url: string, data?: unknown) {
  return request.post(url, data);
}

/**
 * POST 请求（流式响应）
 */
export function postForStream(url: string, data?: unknown) {
  return request.post(url, data, { responseType: 'stream' });
}
