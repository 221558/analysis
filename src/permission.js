// 导入路由和状态管理库
import router from './router/';
import store from './store';
// 导入验证工具函数
// import { validatenull } from '@/utils/validate';
// 导入获取Token的工具函数
import { getToken } from '@/utils/auth';
// 导入并配置NProgress库，用于页面加载进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

// 定义锁屏页面的路径常量
const lockPage = '/lock';

// 在路由跳转前进行权限验证和状态设置
router.beforeEach((to, from, next) => {
  // 获取路由元数据或查询参数中的menu状态
  const meta = to.meta || {};
  const isMenu = meta.menu === undefined ? to.query.menu : meta.menu;
  // 将isMenu状态保存到 Vuex store
  store.commit('SET_IS_MENU', isMenu === undefined);

  // 如果用户已登录
  if (getToken()) {
    // 如果系统处于锁屏状态且目标路径不是锁屏页，则跳转到锁屏页
    if (store.getters.isLock && to.path != lockPage) {
      next({ path: lockPage });
      // 如果已登录用户尝试访问登录页，则重定向到主页
    } else if (to.path === '/login') {
      next({ path: '/' });
    }
    // 如果用户信息为空，则尝试获取用户信息
    else if (!store.getters.userInfo) {
      store
        .dispatch('GetUserInfo')
        .then(() => {
          // 获取用户信息成功后，确认路由
          next({ ...to, replace: true });
        })
        .catch(() => {
          // 获取用户信息失败，注销用户并跳转到登录页
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' });
          });
        });
    } else {
      // 处理非锁屏且需要用户信息的路由
      // const meta = to.meta || {};
      const query = to.query || {};
      // 根据meta配置打开新窗口或添加标签页
      if (meta.target) {
        window.open(query.url.replace(/#/g, '&'));
        return;
      } else if (meta.isTab !== false) {
        store.commit('ADD_TAG', {
          name: query.name || to.name,
          path: to.path,
          fullPath: to.path,
          params: to.params,
          query: to.query,
          meta,
        });
      }
      // 允许路由跳转
      next();
    }
  }
  // 用户未登录时，限制访问未授权页面
  else if (meta.isAuth === false) {
    next();
  } else {
    next('/login');
  }
});

// 在路由跳转后完成进度条和页面标题设置
router.afterEach((to) => {
  NProgress.done();
  const title = router.$avueRouter.generateTitle(to, { label: 'name' });
  router.$avueRouter.setTitle(title);
  store.commit('SET_IS_SEARCH', false);
});
