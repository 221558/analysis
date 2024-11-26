<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="网络质量" name="first" />
      <el-tab-pane label="业务质量" name="second" />
    </el-tabs>
    <!-- <div style="background-color: #fff; height: 80vh"> -->
    <div style="background-color: #fff">
      <!-- TOP5异常核查项集合图表 -->
      <div ref="delayIpv4" style="height: 350px" />
      <div ref="delayIpv6" style="height: 350px" />
      <div ref="loserIpv4" style="height: 350px" />
      <div ref="loserIpv6" style="height: 350px" />
    </div>
  </basic-container>
</template>
<script setup>
// 引入echarts库
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
const activeName = ref('first');
const delayIpv4 = ref(null);
const delayIpv6 = ref(null);
const loserIpv4 = ref(null);
const loserIpv6 = ref(null);
const getRandomValue = () => {
  return Math.floor(Math.random() * 100) + 1;
};
const data = [
  { label: '北京', value: getRandomValue() },
  { label: '天津', value: getRandomValue() },
  { label: '上海', value: getRandomValue() },
  { label: '重庆', value: getRandomValue() },
  { label: '河北', value: getRandomValue() },
  { label: '山西', value: getRandomValue() },
  { label: '内蒙古', value: getRandomValue() },
  { label: '辽宁', value: getRandomValue() },
  { label: '吉林', value: getRandomValue() },
  { label: '黑龙江', value: getRandomValue() },
  { label: '江苏', value: getRandomValue() },
  { label: '浙江', value: getRandomValue() },
  { label: '安徽', value: getRandomValue() },
  { label: '福建', value: getRandomValue() },
  { label: '江西', value: getRandomValue() },
  { label: '山东', value: getRandomValue() },
  { label: '河南', value: getRandomValue() },
  { label: '湖北', value: getRandomValue() },
  { label: '湖南', value: getRandomValue() },
  { label: '广东', value: getRandomValue() },
  { label: '广西', value: getRandomValue() },
  { label: '海南', value: getRandomValue() },
  { label: '四川', value: getRandomValue() },
  { label: '贵州', value: getRandomValue() },
  { label: '云南', value: getRandomValue() },
  { label: '西藏', value: getRandomValue() },
  { label: '陕西', value: getRandomValue() },
  { label: '甘肃', value: getRandomValue() },
  { label: '青海', value: getRandomValue() },
  { label: '宁夏', value: getRandomValue() },
  { label: '新疆', value: getRandomValue() },
  { label: '香港', value: getRandomValue() },
  { label: '澳门', value: getRandomValue() },
  { label: '台湾', value: getRandomValue() },
];

onMounted(() => {
  getDelayIpv4(data, delayIpv4.value);
  getDelayIpv6(data, delayIpv6.value);
  getLoserIpv4(data, loserIpv4.value);
  getLoserIpv6(data, loserIpv6.value);
});

const getDelayIpv4 = (data, ref) => {
  handleData(data, ref);
};
const getDelayIpv6 = (data, ref) => {
  handleData(data, ref);
};
const getLoserIpv4 = (data, ref) => {
  handleData(data, ref);
};
const getLoserIpv6 = (data, ref) => {
  handleData(data, ref);
};

const handleData = (data, ref) => {
  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);
  let myChart = echarts.init(ref, null, { renderer: 'canvas', useDirtyRect: false });
  let option = {
    grid: { top: '10%', left: '1%', right: '1%', bottom: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: {
        interval: 0, // 强制显示所有标签
        // rotate: 45, // 旋转标签以防止重叠
        margin: 10, // 标签与轴线的距离
      },
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: values,
        type: 'bar',
        barWidth: 20,
        barCategoryGap: 10, // 缩小柱状图之间的间距
        label: { show: true, position: 'top', color: '#909399' },
      },
    ],
  };
  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }
  window.addEventListener('resize', myChart.resize);
};

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>
<style lang="scss" scoped>
:deep(.el-card) {
  background-color: transparent !important;
}
:deep(.el-tabs__header) {
  margin: 0;
}
:deep(.el-tabs__item) {
  width: 120px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #dcdfe6;
}
:deep(.is-active) {
  background-color: #fff;
  border: none;
}
:deep(
    .el-tabs--card > .el-tabs__header .el-tabs__nav,
    .el-tabs--card > .el-tabs__header .el-tabs__item
  ) {
  border: none !important;
}
:deep(.el-tabs--card > .el-tabs__header) {
  border-bottom: none !important;
}
</style>