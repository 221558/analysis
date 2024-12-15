import request from '@/axios';
// 日志列表
export const logList = params => {
  return request({
    url: '/analysis-system/business-log/list',
    method: 'get',
    params,
  });
};
// 日志下载
export const logDownload = params => {
  return request({
    url: '/analysis-system/business-log/download',
    method: 'get',
    params,
    responseType: 'blob',
  });
};
