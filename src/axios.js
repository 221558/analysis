/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios';
import store from '@/store/';
import router from '@/router/';
import { serialize } from 'utils/util';
import { getToken } from 'utils/auth';
import { ElMessage } from 'element-plus';
import website from '@/config/website';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { Base64 } from 'js-base64';
import { isURL } from 'utils/validate';
import { baseUrl } from '@/config/env';
import crypto from '@/utils/crypto';

axios.defaults.timeout = 10000;
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
  showSpinner: false,
});
// Token续期
let subscribers = [];
const onAccessTokenFetched = () => {
  subscribers.forEach((callback) => {
    callback();
  });
  subscribers = [];
};
const addSubscriber = (callback) => {
  subscribers.push(callback);
};
// HTTPrequest拦截
axios.interceptors.request.use(
  (config) => {
    NProgress.start(); // start progress bar
    // 地址为已经配置状态则不添加前缀
    if (!isURL(config.url) && !config.url.startsWith(baseUrl)) {
      config.url = baseUrl + config.url;
    }
    const meta = config.meta || {};
    config.headers.Authorization = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
    // headers传递token是否加密
    const isToken = meta.isToken === false;
    const cryptoToken = config.cryptoToken === true;
    const token = getToken();
    if (token && !isToken) {
      config.headers[website.Authorization] = cryptoToken ? `crypto ${crypto.encrypt(token)}` : `bearer ${token}`;
    }
    // headers中配置serialize为true开启序列化
    if (config.method === 'post' && meta.isSerialize === true) {
      config.data = serialize(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// HTTPresponse拦截
let isRefreshToken = true;
axios.interceptors.response.use(
  (res) => {
    NProgress.done();
    const status = res.data.code || 200;
    const statusWhiteList = website.statusWhiteList || [];
    const message = res.data.msg || '未知错误';
    // 如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(status)) return Promise.reject(res);
    /**
     * Token续期说明
     * 1.需要后台在Token即将过期时在headers中返回refresh-token:true
     * 2.后台不需要处理该接口的内部逻辑，直接返回成功标识，Token续期成功后会再次调用该接口
     */
    if (res.headers['refresh-token'] === 'true' || res.headers['Refresh-Token'] === 'true') {
      if (isRefreshToken) {
        store
          .dispatch('RefreshToken')
          .then(() => {
            isRefreshToken = true;
            onAccessTokenFetched();
          })
          .catch(() => {
            isRefreshToken = true;
          });
      }
      isRefreshToken = false;
      return new Promise((resolve) => {
        addSubscriber(() => {
          resolve(axios(res.config));
        });
      });
    }
    // 如果是401则跳转到登录页面
    if (status === 401) store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      ElMessage({
        message,
        type: 'error',
      });
      return Promise.reject(new Error(message));
    }
    return res;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(new Error(error));
  },
);

export default axios;
