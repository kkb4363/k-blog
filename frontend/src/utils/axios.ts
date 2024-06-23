import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

// dev
// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080",
// });
