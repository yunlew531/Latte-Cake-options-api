import axios from 'axios';

const frontReq = axios.create({
  baseURL: process.env.VUE_APP_URL
});

export const PATH = process.env.VUE_APP_PATH;

export default frontReq;
