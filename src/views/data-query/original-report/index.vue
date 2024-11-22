<template>
  <basic-container>
    <searchReport :selectionList="selectionList" @getSearch="getSearch" />
    <avue-crud
      ref="crudRef"
      :data="data"
      :option="option"
      v-model:page="page"
      v-model:search="search"
      :table-loading="loadings"
      @size-change="sizeChange"
      @current-change="currentChange"
      @refresh-change="refreshChange"
      @search-change="searchChange"
      @search-reset="resetChange"
      @selection-change="selectionChange"
      @on-load="onLoad"
    >
      <template #menu="scope">
        <el-button text type="primary" @click.stop="getView(scope.row)">
          <el-icon><View /></el-icon>
          <span>查看</span>
        </el-button>
        <el-button text type="primary" @click.stop="getDownload(scope.row)">
          <el-icon><Download /></el-icon>
          <span>下载</span>
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script setup>
import { ref } from 'vue';
/* eslint-disable no-unused-vars */
import searchReport from './components/search-report.vue'; // NOSONAR
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// _this, store, option, data, search, loadings, conf, selectionList, selectionChange
/* eslint-disable no-unused-vars */
const { _this, option, data, search, loadings, conf, selectionList, selectionChange } = useMixins();
// 定义分页信息变量，包括每页大小、当前页码和总条数
const page = ref({ pageSize: 10, currentPage: 1, total: 10 });

option.value = {
  ...conf.value,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  selection: true,
  column: [
    { label: '表格编号', prop: 'num' },
    { label: '表格名', prop: 'name' },
    { label: '所属月份', prop: 'month' },
    { label: '说明', prop: 'explain' },
  ],
};

data.value = [
  { num: '1-1-1', name: '1省间联通网内互访时延', month: '2023-11', explain: '说明' },
  { num: '1-1-2', name: '2三家运营商最小时延', month: '2023-10', explain: '说明' },
  { num: '1-1-3', name: '3省间联通网内互访时延', month: '2023-09', explain: '说明' },
  { num: '1-1-4', name: '4三家运营商最小时延', month: '2023-08', explain: '' },
  { num: '1-1-5', name: '5省间联通网内互访时延', month: '2023-07', explain: '' },
  { num: '1-1-6', name: '6三家运营商最小时延', month: '2023-06', explain: '' },
  { num: '1-1-7', name: '7省间联通网内互访时延', month: '2023-05', explain: '' },
  { num: '1-1-8', name: '8三家运营商最小时延', month: '2023-04', explain: '' },
  { num: '1-1-9', name: '9省间联通网内互访时延', month: '2023-03', explain: '' },
  { num: '1-1-10', name: '10三家运营商最小时延', month: '2023-02', explain: '' },
  { num: '1-1-11', name: '11省间联通网内互访时延', month: '2023-01', explain: '' },
  { num: '1-1-12', name: '12三家运营商最小时延', month: '2022-12', explain: '' },
];
// 每页多少条
/* eslint-disable no-unused-vars */
const sizeChange = val => {
  // 将当前页码重置为1
  page.value.currentPage = 1;
  // 将每页显示条数设置为val
  page.value.pageSize = val;
  // 重新加载数据
  onLoad(page.value);
};

// 当前页数
/* eslint-disable no-unused-vars */
const currentChange = val => {
  // 将当前页码设置为val
  page.value.currentPage = val;
  // 重新加载数据
  onLoad(page.value);
};

// 刷新
/* eslint-disable no-unused-vars */
const refreshChange = () => {
  onLoad(page.value);
};

// 搜索
/* eslint-disable no-unused-vars */
const searchChange = () => {
  page.value.currentPage = 1;
  onLoad(page.value);
};

// 搜索清空
/* eslint-disable no-unused-vars */
const resetChange = () => {
  // 将搜索条件重置为空对象
  search.value = {};
  // 重新加载数据
  onLoad(page.value);
};
// 查询
/* eslint-disable no-unused-vars */
const onLoad = pages => {
  loadings.value = true;
  // 模拟分页
  page.value.total = 40;
  loadings.value = false;
};
// 定义一个函数，用于获取搜索表单
/* eslint-disable no-unused-vars */
const getSearch = form => {
  // 打印搜索表单
  console.log(form);
};

// 定义一个函数，用于查看报告
/* eslint-disable no-unused-vars */
const getView = row => {
  // 使用路由跳转到查看报告页面，并传递报告信息
  _this.$router.push({ path: '/original-report/view-report', query: row });
};

// 定义一个函数getDownload，参数为row
const getDownload = row => {
  // 打印'下载模板'
  console.log('下载模板');
};
</script>