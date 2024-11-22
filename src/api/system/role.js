// 导入axios模块
import request from '@/axios';

/**
 * 获取角色列表
 * @param {number} current - 当前页码
 * @param {number} size - 每页大小
 * @param {object} params - 其他查询参数
 * @returns {Promise} - 返回包含角色列表的Promise对象
 */
export const getList = (current, size, params) => {
  return request({
    url: '/blade-system/role/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  });
};

/**
 * 获取授权用的菜单树
 * @returns {Promise} - 返回包含菜单树数据的Promise对象
 */
export const grantTree = () => {
  return request({
    url: '/blade-system/menu/grant-tree',
    method: 'get',
  });
};

/**
 * 角色授权
 * @param {array} roleIds - 角色ID数组
 * @param {array} menuIds - 菜单ID数组
 * @param {array} dataScopeIds - 数据范围ID数组
 * @returns {Promise} - 返回包含授权结果的Promise对象
 */
export const grant = (roleIds, menuIds, dataScopeIds) => {
  return request({
    url: '/blade-system/role/grant',
    method: 'post',
    data: {
      roleIds,
      menuIds,
      dataScopeIds,
    },
  });
};

/**
 * 删除角色
 * @param {array} ids - 角色ID数组
 * @returns {Promise} - 返回包含删除结果的Promise对象
 */
export const remove = (ids) => {
  return request({
    url: '/blade-system/role/remove',
    method: 'post',
    params: {
      ids,
    },
  });
};

/**
 * 添加角色
 * @param {object} row - 角色数据对象
 * @returns {Promise} - 返回包含添加结果的Promise对象
 */
export const add = (row) => {
  return request({
    url: '/blade-system/role/submit',
    method: 'post',
    data: row,
  });
};

/**
 * 更新角色
 * @param {object} row - 角色数据对象
 * @returns {Promise} - 返回包含更新结果的Promise对象
 */
export const update = (row) => {
  return request({
    url: '/blade-system/role/submit',
    method: 'post',
    data: row,
  });
};

/**
 * 获取角色及其权限信息
 * @param {array} roleIds - 角色ID数组
 * @returns {Promise} - 返回包含角色及其权限信息的Promise对象
 */
export const getRole = (roleIds) => {
  return request({
    url: '/blade-system/menu/role-tree-keys',
    method: 'get',
    params: {
      roleIds,
    },
  });
};

/**
 * 获取角色树
 * @param {string} tenantId - 租户ID
 * @returns {Promise} - 返回包含角色树数据的Promise对象
 */
export const getRoleTree = (tenantId) => {
  return request({
    url: '/blade-system/role/tree',
    method: 'get',
    params: {
      tenantId,
    },
  });
};
