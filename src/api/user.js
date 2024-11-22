// 引入axios请求库
import request from '@/axios';
// 引入网站配置
import website from '@/config/website';

/**
 * 使用用户名和密码登录的函数
 * @param {string} tenantId - 租户ID
 * @param {string} account - 用户账号
 * @param {string} password - 用户密码
 * @param {string} type - 用户类型
 * @param {string} key - 验证码密钥
 * @param {string} code - 验证码
 * @returns {Promise} - 返回登录请求的Promise对象
 */
export const loginByUsername = (tenantId, account, password, type, key, code) =>
  request({
    url: '/blade-auth/token',
    method: 'post',
    headers: {
      'Captcha-Key': key,
      'Captcha-Code': code,
    },
    params: {
      grantType: website.captchaMode ? 'captcha' : 'password',
      tenantId,
      account,
      password,
      type,
    },
  });

/**
 * 使用社交账号登录的函数
 * @param {string} tenantId - 租户ID
 * @param {string} source - 社交来源
 * @param {string} code - 社交账号授权码
 * @param {string} state - 社交登录状态
 * @returns {Promise} - 返回登录请求的Promise对象
 */
export const loginBySocial = (tenantId, source, code, state) =>
  request({
    url: '/blade-auth/token',
    method: 'post',
    headers: {
      'Tenant-Id': tenantId,
    },
    params: {
      tenantId,
      source,
      code,
      state,
      grantType: 'social',
      scope: 'all',
    },
  });

/**
 * 获取按钮权限的函数
 * @returns {Promise} - 返回按钮权限请求的Promise对象
 */
export const getButtons = () =>
  request({
    url: '/blade-system/menu/buttons',
    method: 'get',
  });

/**
 * 获取用户信息的函数
 * @returns {Promise} - 返回用户信息请求的Promise对象
 */
export const getUserInfo = () =>
  request({
    url: '/user/getUserInfo',
    method: 'get',
  });

/**
 * 刷新令牌的函数
 * @param {string} refreshToken - 刷新令牌
 * @returns {Promise} - 返回刷新令牌请求的Promise对象
 */
export const refreshToken = (refreshToken) =>
  request({
    url: '/blade-auth/token',
    method: 'post',
    params: {
      refreshToken,
      grantType: 'refresh_token',
      scope: 'all',
    },
  });

/**
 * 注册访客用户的函数
 * @param {Object} form - 表单对象，包含tenantId、name、account和password属性
 * @param {string} oauthId - OAuth ID
 * @returns {Promise} - 返回注册访客用户请求的Promise对象
 */
export const registerGuest = (form, oauthId) =>
  request({
    url: '/blade-system/user/register-guest',
    method: 'post',
    params: {
      tenantId: form.tenantId,
      name: form.name,
      account: form.account,
      password: form.password,
      oauthId,
    },
  });

/**
 * 获取菜单的函数
 * @returns {Promise} - 返回菜单请求的Promise对象
 */
export const getMenu = () =>
  request({
    url: '/blade-system/menu/routes',
    method: 'get',
  });

/**
 * 获取验证码的函数
 * @returns {Promise} - 返回验证码请求的Promise对象
 */
export const getCaptcha = () =>
  request({
    url: '/blade-auth/captcha',
    method: 'get',
  });

/**
 * 获取顶级菜单的函数
 * @returns {Promise} - 返回顶级菜单请求的Promise对象
 */
export const getTopMenu = () =>
  request({
    url: '/user/getTopMenu',
    method: 'get',
  });

/**
 * 发送日志的函数
 * @param {Array} list - 日志列表
 * @returns {Promise} - 返回发送日志请求的Promise对象
 */
export const sendLogs = (list) =>
  request({
    url: '/user/send-logs',
    method: 'post',
    data: list,
  });

/**
 * 用户登出的函数
 * 注意：当前实现直接返回一个模拟的成功响应，实际应用中应通过API完成登出操作
 * @returns {Promise} - 返回一个模拟的成功响应的Promise对象
 */
export const logout = () =>
  // request({
  //   url: '/blade-auth/logout',
  //   method: 'post',
  // });
  new Promise((resolve) => {
    const data = {
      code: 200,
      success: true,
      data: '',
      msg: '操作成功',
    };
    resolve({ data });
  });
