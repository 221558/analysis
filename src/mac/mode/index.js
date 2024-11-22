// 导入MessageConstructor组件
import MessageConstructor from './index.vue';
// 导入createVNode和render函数
import { createVNode, render } from 'vue';

// 导出一个函数
export default (function () {
  // 返回一个函数
  return (opts = {}) => {
    // 定义options对象，将opts赋值给app属性
    const options = {
      app: opts,
    };
    // 创建一个div元素
    const parent = document.createElement('div');
    // 创建一个vnode节点
    const instance = createVNode(MessageConstructor, options);
    // 给vnode节点添加onDestroy属性，当调用该属性时，将parent元素渲染为null
    instance.props.onDestroy = () => {
      render(null, parent);
    };
    // 将vnode节点渲染到parent元素中
    render(instance, parent);
    // 将parent元素添加到body元素中
    document.body.appendChild(parent.firstElementChild);
    // 返回vnode节点
    return instance;
  };
})();
