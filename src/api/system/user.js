// 导入axios模块
import request from '@/axios';

/**
 * 获取用户列表
 * @param {number} current 当前页码
 * @param {number} size 页面大小
 * @param {object} params 其他请求参数
 * @returns {Promise} 请求promise对象
 */
export const getList = (current, size, params) => {
  return request({
    url: '/blade-system/user/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  });
};

/**
 * 删除用户
 * @param {Array<number>} ids 待删除的用户ID数组
 * @returns {Promise} 请求promise对象
 */
export const remove = (ids) => {
  return request({
    url: '/blade-system/user/remove',
    method: 'post',
    params: {
      ids,
    },
  });
};

/**
 * 添加用户
 * @param {object} row 用户信息对象
 * @returns {Promise} 请求promise对象
 */
export const add = (row) => {
  return request({
    url: '/blade-system/user/submit',
    method: 'post',
    data: row,
  });
};

/**
 * 更新用户信息
 * @param {object} row 用户信息对象
 * @returns {Promise} 请求promise对象
 */
export const update = (row) => {
  return request({
    url: '/blade-system/user/update',
    method: 'post',
    data: row,
  });
};

/**
 * 给用户分配角色
 * @param {Array<number>} userIds 用户ID数组
 * @param {Array<number>} roleIds 角色ID数组
 * @returns {Promise} 请求promise对象
 */
export const grant = (userIds, roleIds) => {
  return request({
    url: '/blade-system/user/grant',
    method: 'post',
    params: {
      userIds,
      roleIds,
    },
  });
};

/**
 * 获取单个用户信息
 * @param {number} id 用户ID
 * @returns {Promise} 请求promise对象
 */
export const getUser = (id) => {
  return request({
    url: '/blade-system/user/detail',
    method: 'get',
    params: {
      id,
    },
  });
};

/**
 * 获取当前用户信息
 * @returns {Promise} 请求promise对象
 */
export const getUserInfo = () => {
  return request({
    url: '/blade-system/user/info',
    method: 'get',
  });
};

/**
 * 重置用户密码
 * @param {Array<number>} userIds 用户ID数组
 * @returns {Promise} 请求promise对象
 */
export const resetPassword = (userIds) => {
  return request({
    url: '/blade-system/user/reset-password',
    method: 'post',
    params: {
      userIds,
    },
  });
};

/**
 * 更新当前用户密码
 * @param {string} oldPassword 旧密码
 * @param {string} newPassword 新密码
 * @param {string} newPassword1 确认新密码
 * @returns {Promise} 请求promise对象
 */
export const updatePassword = (oldPassword, newPassword, newPassword1) => {
  return request({
    url: '/blade-system/user/update-password',
    method: 'post',
    params: {
      oldPassword,
      newPassword,
      newPassword1,
    },
  });
};
