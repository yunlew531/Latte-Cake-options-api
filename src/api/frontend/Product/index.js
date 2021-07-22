import frontReq from '@/api/frontReq';

export default (id) => frontReq.get(`api/${process.env.VUE_APP_PATH}/product/${id}`);
