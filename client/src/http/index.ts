import axios from "axios";

export const BASE_URL = `${process.env.REACT_APP_API_URL}api/`;

const $host = axios.create({
  baseURL: BASE_URL,
});

const $authHost = axios.create({
  baseURL: BASE_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
