<template>
  <!-- 基础容器 -->
  <basic-container>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" type="card">
      <!-- 遍历tabs数组，生成标签页 -->
      <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.label" :name="tab.name" />
    </el-tabs>
    <!-- 如果activeName不为undefined，则显示对应名称的slot -->
    <slot v-if="activeName !== undefined" :name="activeName"></slot>
  </basic-container>
</template>

<script setup>
import { ref, watch } from 'vue';

// 定义props，tabs为必填项，类型为数组，defaultActive为默认值，类型为字符串，默认为空字符串
const props = defineProps({
  tabs: { type: Array, required: true },
  defaultActive: { type: String, default: '' },
});

// 定义activeName，初始值为props.defaultActive或props.tabs[0]?.name
const activeName = ref(props.defaultActive || props.tabs[0]?.name);

watch(
  () => props.tabs,
  newTabs => {
    if (!newTabs.find(tab => tab.name === activeName.value)) {
      activeName.value = newTabs[0]?.name;
    }
    console.log('activeName', activeName.value);
  },
  { deep: true }
);
</script>


<style lang="scss" scoped>
:deep(.el-card) {
  // 设置el-card的背景颜色为透明
  background-color: transparent !important;
}
:deep(.el-tabs__header) {
  // 设置el-tabs__header的外边距为0
  margin: 0;
}
:deep(.el-tabs__item) {
  // 设置el-tabs__item的宽度为120px
  width: 120px;
  // 设置el-tabs__item的左上角和右上角的圆角半径为20px
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  // 设置el-tabs__item的背景颜色为#ebedf0
  background-color: #ebedf0;
}
:deep(.is-active) {
  // 设置is-active的背景颜色为#fff
  background-color: #fff;
  // 设置is-active的边框为none
  border: none;
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  // 设置el-tabs--card > .el-tabs__header .el-tabs__nav的边框为none
  border: none !important;
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  // 设置el-tabs--card > .el-tabs__header .el-tabs__item的边框为none
  border: none !important;
}

:deep(.el-tabs--card > .el-tabs__header) {
  // 设置el-tabs--card > .el-tabs__header的底部边框为none
  border-bottom: none !important;
}
</style>