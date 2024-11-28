<template>
  <basic-container>
    <!-- 使用el-tabs组件，v-model绑定activeName，type为card，@tab-click绑定handleClick方法 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!-- 第一个tab-pane，label为网络质量，name为first -->
      <el-tab-pane label="网络质量" name="first" />
      <!-- 第二个tab-pane，label为业务质量，name为second -->
      <el-tab-pane label="业务质量" name="second" />
    </el-tabs>
    <!-- 如果activeName为first，则显示networkQuality组件 -->
    <networkQuality v-if="activeName == 'first'" />
    <!-- 否则显示businessQuality组件 -->
    <businessQuality v-else />
  </basic-container>
</template>
<script setup>
// 引入Vue的ref函数
import { ref } from 'vue';
// 定义一个响应式的变量activeName，初始值为'first'
const activeName = ref('first');
// 网络质量
import networkQuality from './components/network-quality-line.vue'; // NOSONAR
// 业务质量
import businessQuality from './components/business-quality-line.vue'; // NOSONAR
// 定义一个点击事件处理函数
const handleClick = (tab, event) => {
  // 打印出点击的tab和事件
  console.log(tab, event);
};
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
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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