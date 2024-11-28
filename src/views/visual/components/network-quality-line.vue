<template>
  <div class="chart-box">
    <el-row :gutter="24">
      <el-col :span="isSmallScreen ? 24 : 12">
        <!-- IPv4省间互访时延 -->
        <div class="border">
          <!-- 头部 -->
          <el-row class="headers">
            <!-- 左侧标题 -->
            <el-col :span="6">
              <div class="title">IPv4省间互访时延</div>
            </el-col>
            <!-- 右侧搜索框 -->
            <el-col :span="18">
              <el-form class="form" :inline="true" :model="formInline">
                <el-form-item label="省份">
                  <el-select style="width: 90px" v-model="formInline.region" placeholder="全国">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="value2"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                  />
                </el-form-item>
                <div class="detail">详情</div>
                <el-icon class="icon"><ArrowRight /></el-icon>
              </el-form>
            </el-col>
          </el-row>
          <!-- 体验指数排名图表 -->
          <div ref="delayIpv4" style="height: 350px" />
        </div>
      </el-col>
      <!-- IPv6省间互访时延 -->
      <el-col :span="isSmallScreen ? 24 : 12">
        <div class="border">
          <!-- 头部 -->
          <el-row class="headers">
            <!-- 左侧标题 -->
            <el-col :span="6">
              <div class="title">IPv6省间互访时延</div>
            </el-col>
            <!-- 右侧搜索框 -->
            <el-col :span="18">
              <el-form class="form" :inline="true" :model="formInline">
                <el-form-item label="省份">
                  <el-select style="width: 90px" v-model="formInline.region" placeholder="全国">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="value2"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                  />
                </el-form-item>
                <div class="detail">详情</div>
                <el-icon class="icon"><ArrowRight /></el-icon>
              </el-form>
            </el-col>
          </el-row>
          <!-- 体验指数排名图表 -->
          <div ref="delayIpv6" style="height: 350px" />
        </div>
      </el-col>
      <!-- IPv4省间互访丢包 -->
      <el-col :span="isSmallScreen ? 24 : 12">
        <div class="border">
          <!-- 头部 -->
          <el-row class="headers">
            <!-- 左侧标题 -->
            <el-col :span="6">
              <div class="title">IPv4省间互访丢包</div>
            </el-col>
            <!-- 右侧搜索框 -->
            <el-col :span="18">
              <el-form class="form" :inline="true" :model="formInline">
                <el-form-item label="省份">
                  <el-select style="width: 90px" v-model="formInline.region" placeholder="全国">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="value2"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                  />
                </el-form-item>
                <div class="detail">详情</div>
                <el-icon class="icon"><ArrowRight /></el-icon>
              </el-form>
            </el-col>
          </el-row>
          <!-- 体验指数排名图表 -->
          <div ref="loserIpv4" style="height: 350px" />
        </div>
      </el-col>
      <!-- IPv6省间互访丢包 -->
      <el-col :span="isSmallScreen ? 24 : 12">
        <div class="border">
          <!-- 头部 -->
          <el-row class="headers">
            <!-- 左侧标题 -->
            <el-col :span="6">
              <div class="title">IPv6省间互访丢包</div>
            </el-col>
            <!-- 右侧搜索框 -->
            <el-col :span="18">
              <el-form class="form" :inline="true" :model="formInline">
                <el-form-item label="省份">
                  <el-select style="width: 90px" v-model="formInline.region" placeholder="全国">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="value2"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                  />
                </el-form-item>
                <div class="detail">详情</div>
                <el-icon class="icon"><ArrowRight /></el-icon>
              </el-form>
            </el-col>
          </el-row>
          <!-- 体验指数排名图表 -->
          <div ref="loserIpv6" style="height: 350px" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
// 引入echarts库
import * as echarts from 'echarts';

import { ref, onMounted, onUnmounted, watchEffect } from 'vue';

// 定义一个响应式变量来存储屏幕宽度
const screenWidth = ref(window.innerWidth);

// 定义一个响应式变量来存储是否是小屏幕
const isSmallScreen = ref(screenWidth.value < 768);

// 监听屏幕宽度变化的函数
const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

// 使用 watchEffect 监听 screenWidth 的变化
watchEffect(() => {
  isSmallScreen.value = screenWidth.value < 1566;
  console.log(isSmallScreen.value);
});

// 在组件挂载时添加事件监听器
onMounted(() => {
  window.addEventListener('resize', handleResize);
  // getDelayIpv4(data, delayIpv4.value);
  // getDelayIpv6(data, delayIpv6.value);
  // getLoserIpv4(data, loserIpv4.value);
  // getLoserIpv6(data, loserIpv6.value);

  handleData(data, delayIpv4.value);
  handleData(data, delayIpv6.value);
  handleData(data, loserIpv4.value);
  handleData(data, loserIpv6.value);
});

// 在组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// 定义一个响应式变量，用于存储当前激活的标签页名称
const activeName = ref('first');
// 定义一个响应式变量，用于存储IPv4的延迟时间
const delayIpv4 = ref(null);
// 定义一个响应式变量，用于存储IPv6的延迟时间
const delayIpv6 = ref(null);
// 定义一个响应式变量，用于存储IPv4的丢包率
const loserIpv4 = ref(null);
// 定义一个响应式变量，用于存储IPv6的丢包率
const loserIpv6 = ref(null);
// 定义一个响应式变量，用于存储输入框的值
const value2 = ref('');
const formInline = ref({
  user: '',
  region: '',
});

// 定义一个函数，用于生成一个1到100之间的随机整数
const getRandomValue = () => {
  // 生成一个1到100之间的随机整数
  return Math.floor(Math.random() * 100) + 1;
};
const data = [
  { label: '2024-01', value: getRandomValue() },
  { label: '2024-02', value: getRandomValue() },
  { label: '2024-03', value: getRandomValue() },
  { label: '2024-04', value: getRandomValue() },
  { label: '2024-05', value: getRandomValue() },
  { label: '2024-06', value: getRandomValue() },
  { label: '2024-07', value: getRandomValue() },
  { label: '2024-08', value: getRandomValue() },
  { label: '2024-09', value: getRandomValue() },
  { label: '2024-10', value: getRandomValue() },
  { label: '2024-11', value: getRandomValue() },
];

// const getDelayIpv4 = (data, ref) => {
//   handleData(data, ref);
// };
// const getDelayIpv6 = (data, ref) => {
//   handleData(data, ref);
// };
// const getLoserIpv4 = (data, ref) => {
//   handleData(data, ref);
// };
// const getLoserIpv6 = (data, ref) => {
//   handleData(data, ref);
// };

const handleData = (data, ref) => {
  // 将data中的每个元素的label属性提取出来，存入labels数组中
  const labels = data.map(item => item.label);
  // 将data中的每个元素的value属性提取出来，存入values数组中
  const values = data.map(item => item.value);
  // 初始化echarts实例，ref为容器，null为配置项，{ renderer: 'canvas', useDirtyRect: false }为渲染器
  let myChart = echarts.init(ref, null, { renderer: 'canvas', useDirtyRect: false });
  // 定义图表的配置项
  let option = {
    color: ['#259eff'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: params => {
        const data = params[0];
        return `${data.name} <br> ${data.marker}${data.seriesName} \u00A0${data.value}ms`;
      },
    },
    // 设置图表的网格
    grid: { top: '10%', left: '1%', right: '1%', bottom: '5%', containLabel: true },
    // 设置x轴
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: {
        interval: 0, // 强制显示所有标签
        // rotate: 45, // 旋转标签以防止重叠
        margin: 10, // 标签与轴线的距离
      },
    },
    // 设置y轴
    yAxis: {
      type: 'value',
      // 在每个值后面加上单位 "ms"
      axisLabel: { formatter: '{value}ms' },
    },
    // 设置图表的系列
    series: [
      {
        name: '数据',
        data: values,
        type: 'line',
        barWidth: 20,
        barCategoryGap: 10, // 缩小柱状图之间的间距
        label: {
          show: true,
          position: 'top',
          color: '#259eff',
          formatter: params => params.data + 'ms',
        },
      },
    ],
  };
  // 如果配置项存在且为对象，则设置图表的配置项
  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }
  // 监听窗口大小变化事件，当窗口大小变化时，重新调整图表大小
  window.addEventListener('resize', myChart.resize);
};
const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>

<style lang="scss" scoped>
// 导入样式文件
@use '@/styles/bar-line.scss';
</style>