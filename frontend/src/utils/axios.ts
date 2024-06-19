import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://k-blog.blog/",
});
