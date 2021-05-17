import axios from "axios";
import httpCommons from './baseUrl';
import { getToken } from "./utils/common";

const token = getToken();
export default axios.create({
  baseURL: httpCommons + "api",
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json",
    "x-auth-token": `${token}`
  }
});