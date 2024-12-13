<template>
  <basic-container>
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
        <searchReport @getSearch="getSearch" />
      </template>
      <template #menu-right>
        <el-button type="primary" plain @click="getDownload('more', ids)"> 批量下载 </el-button>
      </template>
      <template #logResult="{ row }">
        <div style="display: flex; justify-content: center; align-items: center">
          <span
            :style="{
              border: `4px solid ${row.logResult == '成功' ? '#00D528' : 'red'}`,
              borderRadius: '50%',
              width: '7px',
              height: '7px',
              marginRight: '5px',
            }"
          ></span>
          <span :style="{ color: row.logResult == '成功' ? '#00D528' : 'red' }">{{
            row.logResult
          }}</span>
        </div>
      </template>
      <template #menu="scope">
        <el-button text type="primary" @click.stop="getDownload('one', scope.row)">
          <el-icon><Download /></el-icon>
          <span>下载</span>
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import searchReport from './components/search-report.vue'; // NOSONAR
import { logList, logDownload } from '@/api/system/log';
import { useMixins } from '@/mixins/data.js';
const { _this, option, data, search, loadings, conf, selectionList, selectionChange } = useMixins();
// 定义分页信息变量，包括每页大小、当前页码和总条数
let page = ref({ pageSize: 10, currentPage: 1, total: 10, background: false });
const ids = computed(() => {
  return selectionList.value.map(item => String(item.id)).join(',');
});
option.value = {
  // 将conf.value中的属性展开
  ...conf.value,
  // 设置表格内容的对齐方式为居中
  align: 'center',
  column: [
    { label: '编号', prop: 'num' },
    { label: '记录时间', prop: 'createTime' },
    { label: '用户', prop: 'userName' },
    { label: '日志类型', prop: 'logType' },
    { label: '日志内容', prop: 'logContent' },
    { label: '结果', prop: 'logResult' },
  ].map(item => {
    return { ...item, overHidden: true };
  }),
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
  logList({ current: pages.currentPage, size: pages.pageSize, ...search.value })
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
// 定义一个函数getDownload，参数为row
const getDownload = (type, row) => {
  if (type == 'more' && selectionList.value.length === 0) {
    return ElMessage.warning('请选择至少一条数据');
  } else {
    logDownload({ ids: type == 'more' ? row : row.id }).then(res => {
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
        link.setAttribute(
          'download',
          type == 'more' ? '日志数据.xlsx' : '日志数据 ' + row.num + '.xlsx'
        );
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
  }
};
</script>
