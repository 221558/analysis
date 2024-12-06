import request from '@/axios';
// 获取省份下拉框
export const getProvinceList = () => {
  return request({
    url: '/analysis-system/business-warn/province-list',
    method: 'get',
  });
};
// 获取网络-监控参数下拉框
export const getMonitorParamList1 = () => {
  return request({
    url: '/analysis-system/business-warn/network-param-list',
    method: 'get',
  });
};
// 获取业务-监控参数下拉框
export const getMonitorParamList2 = () => {
  return request({
    url: '/analysis-system/business-warn/business-param-list',
    method: 'get',
  });
};
//阈值网络参数列表
export const getNetworkParamList = (data, params) => {
  return request({
    url: '/analysis-system/business-warn/network-param/page',
    method: 'post',
    data,
    params,
  });
};
//阈值网络参数新增
export const networkParamSave = data => {
  return request({
    url: '/analysis-system/business-warn/network-param/save',
    method: 'post',
    data,
  });
};
//阈值网络参数修改
export const networkParamUpdate = data => {
  return request({
    url: '/analysis-system/business-warn/network-param/update',
    method: 'post',
    data,
  });
};
//批量删除
export const networkParamDelete = ids => {
  return request({
    url: '/analysis-system/business-warn/remove',
    method: 'post',
    params: {
      ids,
    },
  });
};
//阈值业务参数列表
export const getBusinessParamList = (data, params) => {
  return request({
    url: '/analysis-system/business-warn/business-param/page',
    method: 'post',
    data,
    params,
  });
};
//阈值业务参数新增
export const businessParamSave = data => {
  return request({
    url: '/analysis-system/business-warn/business-param/save',
    method: 'post',
    data,
  });
};
//阈值业务参数修改
export const businessParamUpdate = data => {
  return request({
    url: '/analysis-system/business-warn/network-param/update',
    method: 'post',
    data,
  });
};
//监控ID校验
export const checkMonitorId = (monitorId) => {
  return request({
    url: '/analysis-system/business-warn/check-monitor-id',
    method: 'get',
    params: {
      monitorId,
    },
  });
};
