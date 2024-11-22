// 从 'vite-plugin-mock' 包中导入 createProdMockServer 函数，用于创建生产环境下的模拟服务器
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 导入不同模块的 mock 数据
import menuModule from '../mock/menu';
import userModule from '../mock/user';
import crudModule from '../mock/crud';

/**
 * 设置生产环境下的模拟服务器
 * 该函数将所有模块的 mock 数据合并并传递给 createProdMockServer 函数，以创建一个包含所有 mock 数据的模拟服务器
 */
export const setupProdMockServer = () => {
  createProdMockServer([...menuModule, ...userModule, ...crudModule]);
};
