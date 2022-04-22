import axios from "axios";
import { getToken } from "./auth";

const url = process.env.REACT_APP_URL_API;

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const apiAuth = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
    Accept: "/",
  },
});

export { api, apiAuth };
