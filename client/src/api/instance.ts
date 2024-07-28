import axios, { AxiosInstance } from "axios";
const isProd = import.meta.env.VITE_PROD;
let APIInstance: AxiosInstance;

export function createAxiosInstance() {
  const instance = axios.create({
    baseURL: isProd
      ? "https://account-service-kdvp.onrender.com/api"
      : `http://localhost:5001/api`,
  });
  instance.interceptors.request.use(
    (config) => {
      if (config.url?.includes("/auth"))
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "token"
        )}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    // @ts-ignore
    (response: unknown) => {
      return response;
    },
    (response: any) => {
      if (axios.isCancel(response)) {
        const res = {
          response: {
            data: response,
          },
        };

        throw res;
      } else if (response.response.status === 403) {
        window.location.href = "/#/404";
      }
      return Promise.reject(response);
    }
  );

  APIInstance = instance;
}

export function getInstance(): AxiosInstance {
  createAxiosInstance();
  return APIInstance || axios;
}
