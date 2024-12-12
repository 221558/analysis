<template>
  <div>
    <avue-crud
      ref="crudRef"
      :data="data"
      :option="option"
      v-model:page="page"
      v-model:search="search"
      :table-loading="loadings"
      @row-update="rowUpdate"
      @row-save="rowSave"
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
      <!-- <template #menu="scope">
        <el-button text type="primary" @click.stop="getEdit(scope.row)">
          <span>{{ btnText }}</span>
        </el-button>
      </template> -->
      <template #actualValue="{ row }">
        <span style="color: red">{{ row.actualValue }}</span>
      </template>
      <template #test="{ row }">
        <el-button type="primary" text plain @click="getEdit(row)">{{
          row.test ? '已选择' : '选择'
        }}</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import mittBus from '@/utils/mitt';
import { ElMessage } from 'element-plus';
import searchReport from './search-form.vue'; // NOSONAR
import {
  getProvinceList,
  getMonitorParamList1,
  getMonitorParamList2,
  businessParamSave,
  businessParamUpdate,
  checkMonitorId,
} from '@/api/business/threshold.js';
import { networkRemindPage, businessRemindPage } from '@/api/business/warning.js';
// 导入getToken方法，用于获取token
import { getToken } from 'utils/auth';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// _this, store, option, data, search, loadings, conf, selectionList, selectionChange
const { _this, option, data, search, loadings, conf, selectionList, selectionChange } = useMixins();
// 定义分页信息变量，包括每页大小、当前页码和总条数
let page = ref({ pageSize: 10, currentPage: 1, total: 10, background: false });
const crudRef = ref(null);
const props = defineProps(['analysisType', 'selectItem']);
const provinceList = ref([]); // 省份下拉框
const monitorParamList = ref([]); // 业务-监控参数下拉框

option.value = {
  ...conf.value,
  align: 'center',
  // selection: false,
  // menuWidth: 100,
  menu: false,
  column: [
    { label: '监控ID', prop: 'businessWarnId' },
    { label: '监控省份', prop: 'province' },
    { label: '监控参数', prop: 'monitorParam' },
    { label: '阈值设置', prop: 'monitorThreshold' },
    { label: '实际值', prop: 'actualValue' },
    { label: '预警月份', prop: 'fileTime' },
    { label: '操作', prop: 'test', value: false },
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
  if (props.analysisType == 'networkQuality') {
    networkRemindPage(search.value, { current: pages.currentPage, size: pages.pageSize })
      .then(res => {
        const datContent = res.data.data;
        data.value = datContent.records;
        page.value.total = datContent.total;
        loadings.value = false;
      })
      .catch(() => {
        loadings.value = false;
      });
  } else {
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
  }
};
// 定义一个函数，用于获取搜索表单
const getSearch = form => {
  // 打印搜索表单
  search.value = form;
  onLoad(page.value);
};
// 定义一个函数，用于编辑行数据
const getEdit = row => {
  row.test = !row.test;
  data.value.map(item => {
    if (item.id != row.id) {
      item.test = false;
    }
  });
  mittBus.emit('selectItem', row);
};
onMounted(async () => {
  const [provinceRes, monitorParamRes1, monitorParamRes2] = await Promise.all([
    getProvinceList(),
    getMonitorParamList1(), //网络参数
    getMonitorParamList2(), //业务参数
  ]);
  provinceList.value = provinceRes.data.data;
  monitorParamList.value =
    props.analysisType == 'networkQuality'
      ? monitorParamRes1.data.data
      : monitorParamRes2.data.data;
  data.value.map(item => {
    if (item.id == props.selectItem[0].id) {
      item.test = true;
    } else {
      item.test = false;
    }
  });
});
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
