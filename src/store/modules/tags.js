// 导入本地存储相关工具函数
import { setStore, getStore } from 'utils/store';
// 导入网站配置
import website from '@/config/website';

// 定义欢迎页标签
const tagWel = website.fistPage;
// 定义导航状态对象，包括标签列表、当前标签和欢迎页标签
const navs = {
  state: {
    tagList: getStore({ name: 'tagList' }) || [], // 从本地存储获取标签列表，若不存在则初始化为空数组
    tag: getStore({ name: 'tag' }) || {}, // 从本地存储获取当前标签，若不存在则初始化为空对象
    tagWel, // 欢迎页标签
  },
  mutations: {
    // 添加标签
    ADD_TAG: (state, action) => {
      // 若标签名称为函数，则执行并获取返回值作为标签名称
      if (typeof action.name === 'function') action.name = action.name(action.query);
      state.tag = action; // 设置当前标签
      setStore({ name: 'tag', content: state.tag }); // 保存当前标签到本地存储
      // 若标签列表中不存在该标签，则将其添加到列表中
      if (state.tagList.some((ele) => ele.fullPath == action.fullPath)) return;
      state.tagList.push(action);
      setStore({ name: 'tagList', content: state.tagList }); // 更新本地存储的标签列表
    },
    // 删除标签
    DEL_TAG: (state, action) => {
      state.tagList = state.tagList.filter((item) => {
        return item.fullPath !== action.fullPath; // 过滤掉需要删除的标签
      });
      setStore({ name: 'tagList', content: state.tagList }); // 更新本地存储的标签列表
    },
    // 删除所有标签
    DEL_ALL_TAG: (state, tagList = []) => {
      state.tagList = tagList; // 用传入的标签列表替换当前列表
      setStore({ name: 'tagList', content: state.tagList }); // 更新本地存储的标签列表
    },
    // 删除其他标签，保留当前标签和欢迎页标签
    DEL_TAG_OTHER: (state) => {
      state.tagList = state.tagList.filter((item) => {
        return [state.tag.fullPath, website.fistPage.path].includes(item.fullPath); // 保留当前标签和欢迎页标签
      });
      setStore({ name: 'tagList', content: state.tagList }); // 更新本地存储的标签列表
    },
  },
};
export default navs; // 导出导航配置
