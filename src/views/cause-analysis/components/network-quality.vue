<template>
  <div class="table-container">
    <Steps :steps="steps" />
    <avue-crud ref="crudRef" :data="data" :option="option">
      <template #menu-left>
        <div style="font-weight: 600; font-size: 16px">当前查询预警参数</div>
      </template>
      <template #menu-right>
        <el-button type="primary" @click="isShow = true">预警选择</el-button>
        <el-button type="primary" @click="toAnalyse"> 开始分析 </el-button>
      </template>
      <template #actualValue="{ row }">
        <span style="color: red">{{ row.actualValue }}</span>
      </template>
    </avue-crud>
    <RankTable
      :analysisResults="analysisResults"
      :analysisType="'networkQuality'"
      :provinceType="provinceType"
      v-if="reFresh"
    />
  </div>
  <el-dialog title="新增" v-model="isShow" width="40%">
    <SelectTable v-if="isShow" :analysisType="'networkQuality'" :selectItem="data" />
    <template #footer>
      <div style="display: flex; justify-content: center">
        <el-button type="primary" @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="selectConfirm">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import mittBus from '@/utils/mitt';
import Steps from './steps.vue';
import SelectTable from './select-table.vue';
import RankTable from './rank-table.vue';
import { nextTick, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { rootCauseList } from '@/api/root-case';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// _this, store, option, data, search, loadings, conf, selectionList, selectionChange
const { _this, option, data, search, loadings, conf, selectionList, selectionChange } = useMixins();
// 定义分页信息变量，包括每页大小、当前页码和总条数
let page = ref({ pageSize: 10, currentPage: 1, total: 10, background: false });
const crudRef = ref(null);
const steps = ref(1); //分析步骤
const isShow = ref(false); // 是否显示弹窗

option.value = {
  ...conf.value,
  align: 'center',
  menu: false,
  selection: false,
  maxHeight:100,
  column: [
    { label: '监控ID', prop: 'businessWarnId' },
    { label: '监控省份', prop: 'province' },
    { label: '监控参数', prop: 'monitorParam' },
    { label: '阈值设置', prop: 'monitorThreshold' },
    { label: '实际值', prop: 'actualValue' },
    { label: '预警月份', prop: 'fileTime' },
  ],
};
const selectItem = ref({});
mittBus.on('selectItem', item => {
  selectItem.value = item;
});
const provinceType = ref('全国');
const reFresh = ref(true);
//确定选择
const selectConfirm = () => {
  isShow.value = false;
  steps.value = 1;
  data.value = [selectItem.value];
  analysisResults.value = [];
  reFresh.value = false; // 强制刷新,展示不同表头
  nextTick(() => {
    reFresh.value = true;
  });
  provinceType.value = selectItem.value.province;
};
const analysisResults = ref([]); //分析结果
// 开始分析
const toAnalyse = () => {
  if (!data.value[0].id) {
    return ElMessage.warning('请选择至少一条数据');
  }
  steps.value = 2;
  rootCauseList(data.value[0].id).then(res => {
    steps.value = 3;
    analysisResults.value = res.data.data;
    console.log('analysisResults.value', analysisResults.value);
  });
};

onMounted(() => {
  const routerParams = _this.$route.query; // 获取路由参数
  if (Object.keys(routerParams).length > 0) {
    data.value = [{ ...routerParams }];
  } else {
    data.value = [];
  }
});
</script>

<style lang="scss" scoped>
.table-container {
  // 设置背景颜色为白色
  background-color: #fff;
  // 设置内边距为15px
  padding: 20px 28px;
  // 设置左下角圆角半径为5px
  border-bottom-left-radius: 5px;
  // 设置右下角圆角半径为5px
  border-bottom-right-radius: 5px;
}
</style>
