import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://bloghiv.herokuapp.com/api/",
});
