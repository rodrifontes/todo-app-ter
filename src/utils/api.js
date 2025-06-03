import axios from "axios";

export const api = axios.create({
  baseURL: 'http://10.13.214.164:3001',
});