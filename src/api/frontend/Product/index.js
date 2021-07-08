import frontReq from '@/api/frontReq';

export const getProductInfo = (id) => frontReq.get(`api/${process.env.VUE_APP_PATH}/product/${id}`);

export default {};
