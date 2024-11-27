/**
 * @description 默认
 * @author LI
 * @date 2024-11-25 16:39
 */
import request from '@/axios'

// 条件查询结果
export const downloadFile = params => {
  return request({
    url: '/analysis-system/data-table/upload-records/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

// 时间列表
export const fetchTimeList = params => {
  return request({
    url: '/analysis-system/condition/time-list',
    method: 'get',
    params,
  });
}

// 类型列表
export const fetchTypeList = params => {
  return request({
    url: '/analysis-system/condition/type-list',
    method: 'get',
    params
  })
}

// 省份列表
export const fetchAreaList = params => {
  return request({
    url: '/analysis-system/condition/province-list',
    method: 'get',
    params
  })
}

// 根据类型查询对应的业务下拉框
export const fetchBusinessList = params => {
  return request({
    url: '/analysis-system/condition/service-by-type-list',
    method: 'get',
    params
  })
}

// 根据业务查询对应的指标下拉框
export const fetchTargetList = params => {
  return request({
    url: '/analysis-system/condition/index-by-service-list',
    method: 'get',
    params
  })
}
