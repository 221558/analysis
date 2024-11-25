/**
 * @description 默认
 * @author LI
 * @date 2024-11-25 16:39
 */
import request from '@/axios';

// 条件查询结果
export const downloadFile = params => {
  return request({
    url: '/analysis-system/data-table/upload-records/download',
    method: 'get',
    params,
    responseType: 'blob'
  });
};
