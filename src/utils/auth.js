// 导入js-cookie库，用于操作浏览器的cookies
import Cookies from 'js-cookie';

// 定义存放访问令牌的cookie键名
const TokenKey = 'saber3-access-token';
// 定义存放刷新令牌的cookie键名
const RefreshTokenKey = 'saber3-refresh-token';

/**
 * 获取访问令牌
 * @returns {string} 返回存储在cookie中的访问令牌
 */
export function getToken() {
  return Cookies.get(TokenKey);
}

/**
 * 设置访问令牌到cookie
 * @param {string} token 访问令牌字符串
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

/**
 * 获取刷新令牌
 * @returns {string} 返回存储在cookie中的刷新令牌
 */
export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey);
}

/**
 * 设置刷新令牌到cookie
 * @param {string} token 刷新令牌字符串
 */
export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token);
}

/**
 * 从cookie中移除访问令牌
 */
export function removeToken() {
  return Cookies.remove(TokenKey);
}

/**
 * 从cookie中移除刷新令牌
 */
export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey);
}
