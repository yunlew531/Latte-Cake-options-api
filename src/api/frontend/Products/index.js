import frontReq from '@/api/frontReq';

const PATH = process.env.VUE_APP_PATH;

export const getPageProducts = (page) => frontReq.get(`api/${PATH}/products?page=${page}`);

export const getAllProducts = () => frontReq.get(`api/${PATH}/products/all`);
