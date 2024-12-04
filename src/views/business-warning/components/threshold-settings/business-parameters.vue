<template>
  <div class="table-container">
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
      <template #menu-left>
        <searchReport :selectionList="selectionList" @getSearch="getSearch" />
      </template>
      <template #menu-right>
        <el-button type="primary" plain @click="getDownload"> 新增 </el-button>
        <el-button type="primary" plain @click="getDownload"> 批量新增 </el-button>
      </template>
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import searchReport from './search-form.vue'; // NOSONAR
import { getUploadRecords, getDownloadFile } from '@/api/data-query/original-report';
// 导入getToken方法，用于获取token
import { getToken } from 'utils/auth';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// _this, store, option, data, search, loadings, conf, selectionList, selectionChange
const { _this, option, data, search, loadings, conf, selectionList, selectionChange } = useMixins();
// 定义分页信息变量，包括每页大小、当前页码和总条数
let page = ref({ pageSize: 10, currentPage: 1, total: 10, background: false });

option.value = {
  ...conf.value,
  align: 'center',
  column: [
    { label: '监控ID', prop: 'sheetIndex' },
    { label: '监控省份', prop: 'sheetName' },
    { label: '监控参数', prop: 'fileTime' },
    { label: '实际值', prop: 'explain' },
    { label: '预警月份', prop: 'explain' },
  ],
};
// 每页多少条
const sizeChange = val => {
  // 将当前页码重置为1
  page.value.currentPage = 1;
  // 将每页显示条数设置为val
  page.value.pageSize = val;
};

// 当前页数
const currentChange = val => {
  // 将当前页码设置为val
  page.value.currentPage = val;
};

// 刷新
const refreshChange = () => {
  onLoad(page.value);
};

// 搜索
const searchChange = () => {
  page.value.currentPage = 1;
  onLoad(page.value);
};

// 搜索清空
const resetChange = () => {
  // 将搜索条件重置为空对象
  search.value = {};
  // 重新加载数据
  onLoad(page.value);
};
// 查询

const onLoad = pages => {
  loadings.value = true;
  getUploadRecords({ current: pages.currentPage, size: pages.pageSize, ...search.value })
    .then(res => {
      const datContent = res.data.data;
      data.value = datContent.records;
      page.value.total = datContent.total;
      loadings.value = false;
    })
    .catch(() => {
      loadings.value = false;
    });
};
// 定义一个函数，用于获取搜索表单
const getSearch = form => {
  // 打印搜索表单
  search.value = form;
  onLoad(page.value);
};

// 定义一个函数，用于查看报告
const getView = row => {
  // 使用路由跳转到查看报告页面，并传递报告信息
  _this.$router.push({ path: '/original-report/view-report', query: row });
};

// 定义一个函数getDownload，参数为row
const getDownload = row => {
  getDownloadFile({ recordIds: row.id }).then(res => {
    // 如果返回的状态码为200
    if (res.status == 200) {
      // 创建一个Blob对象，将返回的数据作为参数传入
      const url = window.URL.createObjectURL(new Blob([res.data]));
      // 创建一个a标签
      const link = document.createElement('a');
      // 设置a标签的样式为不显示
      link.style.display = 'none';
      // 设置a标签的href属性为Blob对象的URL
      link.href = url;
      // 设置a标签的download属性为row对象的deviceFileName属性
      link.setAttribute('download', row.sheetName + row.fileTime + '.xlsx');
      // 将a标签添加到body中
      document.body.appendChild(link);
      // 模拟点击a标签，触发下载
      link.click();
      // 将a标签从body中移除
      document.body.removeChild(link);
      // 释放Blob对象的URL
      window.URL.revokeObjectURL(link.href);
    } else {
      // 如果返回的状态码不为200，则弹出错误提示
      ElMessage.error('下载失败，请稍后再试。');
    }
  });
};
</script>

<style lang="scss" scoped>
.table-container {
  // 设置背景颜色为白色
  background-color: #fff;
  // 设置内边距为15px
  padding: 20px 15px 15px 15px;
  // 设置左下角圆角半径为5px
  border-bottom-left-radius: 5px;
  // 设置右下角圆角半径为5px
  border-bottom-right-radius: 5px;
}
</style>