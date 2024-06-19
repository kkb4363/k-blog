import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    "http://k-blog-env.eba-r5k4kdec.ap-northeast-2.elasticbeanstalk.com/",
});
