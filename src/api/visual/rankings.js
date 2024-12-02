import request from '@/axios';
// 排名展示-省间互访时延排名(IPv4)
export const getDelayIpv4 = params => {
  return request({
    url: '/analysis-system/graphic/rank/delay-ipv4',
    method: 'get',
    params,
  });
};

// 排名展示-省间互访时延排名(IPv6)
export const getDelayIpv6 = params => {
  return request({
    url: '/analysis-system/graphic/rank/delay-ipv6',
    method: 'get',
    params,
  });
};

// 排名展示-省间互访丢包排名(IPv4)
export const getLossIpv4 = params => {
  return request({
    url: '/analysis-system/graphic/rank/loss-ipv4',
    method: 'get',
    params,
  });
};
// 排名展示-省间互访丢包排名(IPv6)
export const getLossIpv6 = params => {
  return request({
    url: '/analysis-system/graphic/rank/loss-ipv6',
    method: 'get',
    params,
  });
};

// 排名展示-业务体验指数排名
export const getExperience = params => {
  console.log(params);
  return request({
    url: '/analysis-system/graphic/rank/experience-index',
    method: 'get',
    params,
  });
};

/* 业务类型下拉框 */
export const getBusinesstypeList = params => {
  return request({
    url: '/analysis-system/condition/business-type-list',
    method: 'get',
    params,
  });
};
