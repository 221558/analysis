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
      :analysisType="'businessQuality'"
      :provinceType="provinceType"
    />
  </div>
  <el-dialog title="新增" v-model="isShow" width="40%">
    <SelectTable v-if="isShow" :analysisType="'businessQuality'" :selectItem="data" />
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
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
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
const analysisResults = ref([]); //分析结果
const provinceType = ref('全国');
// 开始分析
const toAnalyse = () => {
  console.log('data', data.value);
  if (data.value.length == 0) {
    return ElMessage.warning('请选择至少一条数据');
  }
  steps.value = 2;

  // _this
  //   .$confirm('确定将选择数据删除?', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning',
  //   })
  //   .then(() => {
  //     return remove(selectionList.value.map(item => item.id));
  //   })
  //   .then(() => {
  //     _this.onLoad(_this.page);
  //     _this.$message({
  //       type: 'success',
  //       message: '操作成功!',
  //     });
  //   });
};

const selectItem = ref({});
mittBus.on('selectItem', item => {
  selectItem.value = item;
});
//确定选择
const selectConfirm = () => {
  isShow.value = false;
  data.value = [selectItem.value];
};

onMounted(() => {
  const routerParams = _this.$route.query; // 获取路由参数
  data.value = [{ ...routerParams }] || [];
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
