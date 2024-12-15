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
        <searchReport
          @getSearch="getSearch"
          :provinceList="provinceList"
          :monitorParamList="monitorParamList"
        />
      </template>

      <template #menu="scope">
        <el-button text type="primary" @click.stop="getView(scope.row)">
          <!-- <el-icon><View /></el-icon> -->
          <span>根因分析</span>
        </el-button>
      </template>
      <template #actualValue="{ row }">
        <span style="color: red">{{ row.actualValue }}</span>
      </template>
    </avue-crud>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import searchReport from '../search-form.vue'; // NOSONAR
import { getProvinceList, getMonitorParamList2 } from '@/api/business/threshold.js';
import { businessRemindPage } from '@/api/business/warning.js';
// 导入getToken方法，用于获取token
import { getToken } from 'utils/auth';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// _this, store, option, data, search, loadings, conf, selectionList, selectionChange
const { _this, option, data, search, loadings, conf, selectionList, selectionChange } = useMixins();
// 定义分页信息变量，包括每页大小、当前页码和总条数
let page = ref({ pageSize: 10, currentPage: 1, total: 10, background: false });
const crudRef = ref(null);
const provinceList = ref([]); // 省份下拉框
const monitorParamList = ref([]); // 监控参数下拉框
onMounted(async () => {
  const [provinceRes, monitorParamRes] = await Promise.all([
    getProvinceList(),
    getMonitorParamList2(),
  ]);
  provinceList.value = provinceRes.data.data;
  monitorParamList.value = monitorParamRes.data.data;
});

option.value = {
  ...conf.value,
  align: 'center',
  column: [
    { label: '监控ID', prop: 'businessWarnId' },
    { label: '监控省份', prop: 'province' },
    { label: '监控参数', prop: 'monitorParam' },
    { label: '阈值设置', prop: 'monitorThreshold' },
    { label: '实际值', prop: 'actualValue' },
    { label: '预警月份', prop: 'fileTime' },
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
  businessRemindPage(search.value, { current: pages.currentPage, size: pages.pageSize })
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

// 跳转根因分析
const getView = row => {
  // 使用路由跳转到查看报告页面，并传递报告信息
  _this.$router.push({
    path: '/cause-analysis/index',
    query: { ...row, rootCauseType: 'second' },
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
