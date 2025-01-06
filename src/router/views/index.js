import Layout from '@/page/index/index.vue';
import Store from '@/store/';

export default [
  {
    // 首页路由
    path: '/wel',
    // 根据操作系统加载不同的组件
    component: () =>
      Store.getters.isMacOs ? import('@/mac/index.vue') : import('@/page/index/index.vue'),
    redirect: '/wel/index',
    children: [
      {
        // 首页子路由
        path: 'index',
        name: '首页',
        meta: { i18n: 'dashboard', icon: 'iconfont iconicon_airplay' },
        // 按需加载组件
        component: () => import(/* webpackChunkName: "views" */ '@/views/wel/index.vue'),
      },
      {
        // 控制台子路由
        path: 'more',
        name: '控制台',
        meta: { i18n: 'more', menu: false },
        // 按需加载组件
        component: () => import(/* webpackChunkName: "views" */ '@/views/wel/dashboard.vue'),
      },
    ],
  },
  {
    // iframe路由
    path: '/iframe',
    component: Layout,
    redirect: '/iframe',
    children: [
      {
        // iframe子路由
        path: '',
        name: '',
        // 按需加载组件
        component: () => import(/* webpackChunkName: "views" */ '@/components/iframe/main.vue'),
      },
    ],
  },
  {
    // 个人信息路由
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [
      {
        // 个人信息子路由
        path: 'index',
        name: '个人信息',
        meta: { i18n: 'info' },
        // 按需加载组件
        component: () => import(/* webpackChunkName: "views" */ '@/views/user/info.vue'),
      },
    ],
  },

  // 编辑核查任务路由
  {
    // 定义路由路径
    path: '/original-report',
    // 定义组件
    component: Layout,
    // 定义重定向路径
    redirect: '/original-report/view-report',
    // 定义子路由
    children: [
      {
        // 定义子路由路径
        path: '/original-report/view-report',
        // 定义路由名称
        name: '数据查询 / 报表查询 / 查看',
        // 定义路由元信息
        meta: { i18n: 'editTask' },
        // 按需加载组件
        component: () =>
          import(
            /* webpackChunkName: "views" */ '@/views/data-query/original-report/view-report.vue'
          ),
      },
    ],
  },
  // 用户管理
  {
    // 定义路由路径
    path: '/system',
    // 定义组件
    component: Layout,
    // 定义重定向路径
    redirect: '/system/user',
    // 定义子路由
    children: [
      {
        // 定义子路由路径
        path: '/system/user',
        // 定义路由名称
        name: '系统管理 / 用户管理',
        // 定义路由元信息
        meta: { i18n: 'editUser' },
        // 按需加载组件
        component: () =>
          import(
            /* webpackChunkName: "views" */ '@/views/system/user.vue'
          ),
      },
    ],
  },
];
