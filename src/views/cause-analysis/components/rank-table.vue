<template>
  <div class="table-container1">
    <avue-crud
      ref="crudRef"
      :data="props.analysisResults"
      :option="option"
    >
      <template #menu-left>
        <div style="font-weight: 600; font-size: 16px">分析结果</div>
      </template>
    </avue-crud>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// _this, store, option, data, search, loadings, conf, selectionList, selectionChange
const { _this, option, data, search, loadings, conf, selectionList, selectionChange } = useMixins();
// 定义分页信息变量，包括每页大小、当前页码和总条数
const crudRef = ref(null);
const props = defineProps(['analysisResults', 'analysisType', 'provinceType']);

option.value = {
  ...conf.value,
  align: 'center',
  menu: false,
  selection: false,
  index: true,
  column: [
    {
      label: '本月排名最差三省',
      prop: 'worst',
      hide: props.analysisType == 'businessQuality' || props.provinceType != '全国',
    },
    {
      label: '本月排名下降最多三省',
      prop: 'declineMost',
      hide: props.analysisType == 'businessQuality' || props.provinceType != '全国',
    },
    {
      label: '互访体验最差三省',
      prop: 'worst',
      hide: props.analysisType == 'businessQuality' || props.provinceType == '全国',
    },
    {
      label: '互访体验下降最多三省',
      prop: 'declineMost',
      hide: props.analysisType == 'businessQuality' || props.provinceType == '全国',
    },
    {
      label: '本月排名最差五省',
      prop: 'worst',
      hide: props.analysisType == 'networkQuality' || props.provinceType != '全国',
    },
    {
      label: '本月排名下降最多五省',
      prop: 'declineMost',
      hide: props.analysisType == 'networkQuality' || props.provinceType != '全国',
    },
    {
      label: '质差指标',
      prop: 'worst',
      hide: props.analysisType == 'networkQuality' || props.provinceType == '全国',
    },
    {
      label: '下降最多指标',
      prop: 'declineMost',
      hide: props.analysisType == 'networkQuality' || props.provinceType == '全国',
    },
  ],
};
onMounted(async () => {
});
</script>

<style lang="scss" scoped>
.table-container1 {
  // 设置背景颜色为白色
  background-color: #fff;
  // 设置内边距为15px
  // padding: 20px 15px 15px 15px;
  // 设置左下角圆角半径为5px
  border-bottom-left-radius: 5px;
  // 设置右下角圆角半径为5px
  border-bottom-right-radius: 5px;
  border-top: 1px solid #ebeef5;
  padding-top: 30px;
  margin-top: 70px;
}
</style>
