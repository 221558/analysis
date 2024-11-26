import request from '@/axios';
// 原始报表查询
export const getUploadRecords = params => {
  return request({
    url: '/analysis-system/data-table/upload-records',
    method: 'get',
    params,
  });
};

// 查看

export const getViewDetails = params => {
  return request({
    url: '/analysis-system/data-table/upload-records/download',
    method: 'get',
    params,
    responseType: 'blob',
  });
};
