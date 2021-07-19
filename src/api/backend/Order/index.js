import backReq, { PATH } from '@/api/backReq';

export const putEditOrder = (orderId, data) =>
  backReq.put(`api/${PATH}/admin/order/${orderId}`, data);

export const delOrder = (orderId) => backReq.delete(`api/${PATH}/admin/order/${orderId}`);
