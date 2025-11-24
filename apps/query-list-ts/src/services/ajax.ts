import { message } from "antd";
import axios from "axios";
import { getToken } from "../utils/user-token";
const instance = axios.create({
  baseURL: 'http://localhost:3005/',
  timeout: 10 * 1000,
  headers: {},
});

// request 拦截
// request 拦截
instance.interceptors.request.use(
  (config) => {
    const publicPaths = [
      '/api/auth/login',
      '/api/auth/register',
    ];
    const isPublic = publicPaths.some(path => config.url?.startsWith(path));
    if (!isPublic) {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      // 如果没 token 且不是公开接口，后续会被后端拦截为 401（这是正常的）
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// response 拦截
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;

  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }
  
    // throw new Error(msg);
  }

  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
