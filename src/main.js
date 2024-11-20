// 导入Vue的createApp函数，用于创建Vue应用
import { createApp } from 'vue';
// 导入网站配置信息
import website from './config/website';
// 导入axios实例，用于处理HTTP请求
import axios from './axios';
// 导入路由配置
import router from './router/';
// 导入状态管理配置
import store from './store';
// 导入国际化配置，包括语言设置和消息内容
import i18n, { language, messages } from './lang/';
// 导入ElementPlus图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 导入Tailwind CSS样式文件
import 'styles/tailwind.css';
// 导入ElementPlus组件库及其样式文件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 导入Avue表单组件库及其样式文件
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
// 导入crud操作相关的混入
import crudCommon from '@/mixins/crud.js';
// 导入获取屏幕信息的工具函数
import { getScreen } from './utils/util';
// 导入权限控制相关配置
import './permission';
// 导入错误处理机制
import error from './error';
// 导入UEditor插件
import avueUeditor from 'avue-plugin-ueditor';
// 导入基础布局组件
import basicBlock from 'components/basic-block/main.vue';
import basicContainer from 'components/basic-container/main.vue';
// 导入主应用组件
import App from './App.vue';
// 导入动画样式库
import 'animate.css';
// 导入日期处理库
import dayjs from 'dayjs';
// 导入全局样式文件
import 'styles/common.scss';

// 将crudCommon和axios挂载到全局对象window上，以便在浏览器环境中直接访问
window.$crudCommon = crudCommon;
window.axios = axios;
// 创建Vue应用实例
const app = createApp(App);
// 注册ElementPlus图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 注册自定义的基础布局组件
app.component('basicContainer', basicContainer);
app.component('basicBlock', basicBlock);
// 将全局属性挂载到Vue应用实例上
app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.website = website;
app.config.globalProperties.getScreen = getScreen;
// 使用错误处理机制
app.use(error);
// 使用国际化配置
app.use(i18n);
// 使用状态管理
app.use(store);
// 使用路由配置
app.use(router);
// 使用ElementPlus组件库，支持国际化
app.use(ElementPlus, {
  locale: messages[language],
});
// 使用Avue表单组件库，配置axios和国际化支持
app.use(Avue, {
  axios,
  calcHeight: -165,
  locale: messages[language],
});
// 使用UEditor插件，配置axios支持
app.use(avueUeditor, { axios });
// 将应用挂载到指定的DOM元素上
app.mount('#app');
