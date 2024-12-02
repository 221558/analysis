import request from '@/axios';
// 趋势展示-省间互访时延排名(IPv4)
export const getDelayIpv4 = params => {
  return request({
    url: '/analysis-system/graphic/trend/delay-ipv4',
    method: 'get',
    params,
  });
};

// 趋势展示-省间互访时延排名(IPv6)
export const getDelayIpv6 = params => {
  return request({
    url: '/analysis-system/graphic/trend/delay-ipv6',
    method: 'get',
    params,
  });
};

// 趋势展示-省间互访丢包排名(IPv4)
export const getLossIpv4 = params => {
  return request({
    url: '/analysis-system/graphic/trend/loss-ipv4',
    method: 'get',
    params,
  });
};
// 趋势展示-省间互访丢包排名(IPv6)
export const getLossIpv6 = params => {
  return request({
    url: '/analysis-system/graphic/trend/loss-ipv6',
    method: 'get',
    params,
  });
};

// 趋势展示-业务体验指数排名
export const getExperience = params => {
  return request({
    url: '/analysis-system/graphic/trend/experience-index',
    method: 'get',
    params,
  });
};
