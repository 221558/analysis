// 导入axios模块
import request from '@/axios';

/**
 * 获取菜单列表
 * @param {number} current - 当前页码
 * @param {number} size - 每页大小
 * @param {Object} params - 其他查询参数
 * @returns {Promise} - 返回包含菜单列表的Promise对象
 */
export const getList = (current, size, params) => {
  return request({
    url: '/blade-system/menu/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  });
};

/**
 * 删除菜单项
 * @param {Array<number>} ids - 要删除的菜单项ID数组
 * @returns {Promise} - 返回表示删除操作结果的Promise对象
 */
export const remove = (ids) => {
  return request({
    url: '/blade-system/menu/remove',
    method: 'post',
    params: {
      ids,
    },
  });
};

/**
 * 添加新菜单项
 * @param {Object} row - 新菜单项的数据
 * @returns {Promise} - 返回表示添加操作结果的Promise对象
 */
export const add = (row) => {
  return request({
    url: '/blade-system/menu/submit',
    method: 'post',
    data: row,
  });
};

/**
 * 更新菜单项
 * @param {Object} row - 更新后的菜单项数据
 * @returns {Promise} - 返回表示更新操作结果的Promise对象
 */
export const update = (row) => {
  return request({
    url: '/blade-system/menu/submit',
    method: 'post',
    data: row,
  });
};

/**
 * 获取菜单项详情
 * @param {number} id - 菜单项的ID
 * @returns {Promise} - 返回包含菜单项详情的Promise对象
 */
export const getMenu = (id) => {
  return request({
    url: '/blade-system/menu/detail',
    method: 'get',
    params: {
      id,
    },
  });
};

/**
 * 获取懒加载菜单列表
 * @param {number} parentId - 父菜单项的ID
 * @param {Object} params - 其他查询参数
 * @returns {Promise} - 返回包含懒加载菜单列表的Promise对象
 */
export const getLazyMenuList = (parentId, params) => {
  return request({
    url: '/blade-system/menu/lazy-menu-list',
    method: 'get',
    params: {
      ...params,
      parentId,
    },
  });
};
