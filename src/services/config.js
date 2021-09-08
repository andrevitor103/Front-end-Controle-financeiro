import axios from "axios";

export const http = axios.create({
  baseURL: "https://app-back-emdia.herokuapp.com/api",
});
