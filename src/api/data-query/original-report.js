import request from '@/axios';
// 原始报表查询
export const getUploadRecords = params => {
  return request({
    url: '/analysis-system/data-table/upload-records',
    method: 'get',
    params,
  });
};
