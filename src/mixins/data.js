/*
 * @Author: 韩鹏涛 sj-hpt@dimpt.com
 * @Date: 2024-11-26 15:10:11
 * @LastEditors: 韩鹏涛 sj-hpt@dimpt.com
 * @LastEditTime: 2024-11-29 09:53:22
 * @FilePath: /analysis-system-frontend/src/mixins/data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入getCurrentInstance函数，用于获取当前实例
import { ref, getCurrentInstance } from 'vue';
// 导入useStore函数，用于获取vuex中的store
import { useStore } from 'vuex';
export function useMixins() {
  // 获取当前实例
  const { proxy } = getCurrentInstance();
  // 将当前实例赋值给_this
  const _this = proxy;
  // vuex 储存内容
  const store = useStore();
  // const userInfo = computed(() => store.getters.userInfo);
  // 定义选项参考变量，初始值为 null
  const option = ref(null);
  // 定义数据列表变量，初始为空数组
  const data = ref([]);
  // 创建一个响应式对象search
  const search = ref({});
  // 定义加载状态变量，初始为 false
  const loadings = ref(false);
  // 列表配置项
  const conf = ref({
    tip: false,
    border: true, // 是否带有纵向边框
    index: false, // 是否有序号
    indexLabel: '序号', // 序号列标题
    indexWidth: 80, // 序号列宽度
    addBtn: false, // 新增按钮
    editBtn: false, // 修改按钮
    delBtn: false, // 删除按钮
    viewBtn: false, // 查看按钮
    reserveSelection: true, // 翻页多选，保留选中状态
    selection: true, // 是否显示多选框
    refreshBtn: false, // 刷新按钮
    columnBtn: false, // 表格列操作按钮
    searchShowBtn: false, // 搜索按钮
    gridBtn: false, // 卡片模式切换按钮
  });
  // 复选框 多选变量，初始为空数组
  const selectionList = ref([]);

  /**
   * @selection-change
   * @description: 当选择项发生变化时会触发该事件
   * @param {Array} list
   * @return {Array}
   */
  const selectionChange = list => {
    // 更新页面的每页条数
    selectionList.value = list;
  };

  // 返回相关变量和方法
  return { _this, store, option, data, search, loadings, conf, selectionList, selectionChange };
}
