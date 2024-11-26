/**
 * @description 默认
 * @author LI
 * @date 2024-11-26 10:34
 */
import request from '@/axios';

/**
 * 下载文件
 * @param params
 * @returns {AxiosPromise}
 */
export const dataDownload = (params) => {
  return request({
    url: '/analysis-system/data-file/upload-records/download',
    method: 'get',
    params,
    responseType: 'blob',
  })
}

/**
 * 获取上传记录列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getUploadRecords = (params) => {
  return request({
    url: '/analysis-system/data-file/upload-records',
    method: 'get',
    params,
  })
}

/**
 * 历史录入记录中删除
 * @param params
 * @returns {AxiosPromise}
 */
export const deleteUploadRecord = (params) => {
  return request({
    url: `/analysis-system/data-file/upload-records/${params.recordId}`,
    method: 'delete',
  })
}

/**
 * 获取文件类型下拉框
 * @param params
 * @returns {AxiosPromise}
 */
export const getFileTypeList = (params) => {
  return request({
    url: '/analysis-system/condition/file-type-list',
    method: 'get',
    params,
  })
}
