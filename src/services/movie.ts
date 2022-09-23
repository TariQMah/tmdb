import axios from "axios";
import { baseUrl, movie_db_api_key } from "../constant/baseUrl";

export const axiosApi = axios.create({
  baseURL: baseUrl,
});

axiosApi.interceptors.request.use((config) => {
  config.params = {
    api_key: movie_db_api_key,

    ...config.params,
  };
  return config;
});

const MovieApi = {
  get: async (url: string) => {
    return axiosApi.get(url);
  },
  set: async (url: string, body: any) => {
    return axiosApi.post(url, body);
  },
};

export default MovieApi;
