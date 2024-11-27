import request from '@/axios';
/* 全国-综合排名 */
export const operators = params => {
  return request({
    url: '/analysis-system/dashboard/nation/experience-index/operators',
    method: 'get',
    params: {
      ...params,
    },
  });
};
/* 省份排名 */
export const businesses = params => {
  return request({
    url: '/analysis-system/dashboard/nation/experience-index/businesses',
    method: 'get',
    params: {
      ...params,
    },
  });
};
/* 业务趋势 */
export const trend = params => {
  return request({
    url: '/analysis-system/dashboard/nation/experience-index/trend',
    method: 'get',
    params: {
      ...params,
    },
  });
};
/* 业务类型下拉框 */
export const businesstypelist = params => {
  return request({
    url: '/analysis-system/condition/business-type-list',
    method: 'get',
    params: {
      ...params,
    },
  });
};

/* 时间下拉框 */
export const timelist = params => {
  return request({
    url: '/analysis-system/condition/time-list',
    method: 'get',
    params: {
      ...params,
    },
  });
};

/* 省份大屏 业务体验指数排名 */
export const provinces = params => {
  return request({
    url: '/analysis-system/dashboard/nation/experience-index/provinces',
    method: 'get',
    params: {
      ...params,
    },
  });
};
