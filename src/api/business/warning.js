import request from '@/axios';
//预警网络预警列表
export const networkRemindPage = (data, params) => {
  return request({
    url: '/analysis-system/business-warn/network-remind/page',
    method: 'post',
    data,
    params,
  });
};

//预警业务预警列表
export const businessRemindPage = (data, params) => {
  return request({
    url: '/analysis-system/business-warn/business-remind/page',
    method: 'post',
    data,
    params,
  });
};
