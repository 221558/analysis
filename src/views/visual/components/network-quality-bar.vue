<template>
  <div class="chart-box">
    <!-- 省间互访时延排名（IPv4） -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="8">
          <div class="title">省间互访时延排名（IPv4）</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="16">
          <el-form class="form" :inline="true" :model="formInline">
            <el-form-item label="时间选择">
              <el-date-picker v-model="formInline.region" type="month" placeholder="选择月份" />
            </el-form-item>
            <div class="detail">详情</div>
            <el-icon class="icon"><ArrowRight /></el-icon>
          </el-form>
        </el-col>
      </el-row>
      <!-- 体验指数排名图表 -->
      <div ref="delayIpv4" style="height: 350px" />
    </div>
    <!-- 省间互访时延排名（IPv6） -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="8">
          <div class="title">省间互访时延排名（IPv6）</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="16">
          <el-form class="form" :inline="true" :model="formInline">
            <el-form-item label="时间选择">
              <el-date-picker v-model="formInline.region" type="month" placeholder="选择月份" />
            </el-form-item>
            <div class="detail">详情</div>
            <el-icon class="icon"><ArrowRight /></el-icon>
          </el-form>
        </el-col>
      </el-row>
      <!-- 体验指数排名图表 -->
      <div ref="delayIpv6" style="height: 350px" />
    </div>
    <!-- 省间互访丢包排名（IPv4） -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="8">
          <div class="title">省间互访丢包排名（IPv4）</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="16">
          <el-form class="form" :inline="true" :model="formInline">
            <el-form-item label="时间选择">
              <el-date-picker v-model="formInline.region" type="month" placeholder="选择月份" />
            </el-form-item>
            <div class="detail">详情</div>
            <el-icon class="icon"><ArrowRight /></el-icon>
          </el-form>
        </el-col>
      </el-row>
      <!-- 体验指数排名图表 -->
      <div ref="loserIpv4" style="height: 350px" />
    </div>

    <!-- 省间互访丢包排名（IPv6） -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="8">
          <div class="title">省间互访丢包排名（IPv6）</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="16">
          <el-form class="form" :inline="true" :model="formInline">
            <el-form-item label="省份">
              <el-select style="width: 120px" v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间选择">
              <el-date-picker v-model="formInline.region" type="month" placeholder="选择月份" />
            </el-form-item>
            <div class="detail">详情</div>
            <el-icon class="icon"><ArrowRight /></el-icon>
          </el-form>
        </el-col>
      </el-row>
      <!-- 体验指数排名图表 -->
      <div ref="loserIpv6" style="height: 350px" />
    </div>
  </div>
</template>
<script setup>
// 引入echarts库
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
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
  // getDelayIpv4(data, delayIpv4.value);
  // getDelayIpv6(data, delayIpv6.value);
  // getLoserIpv4(data, loserIpv4.value);
  // getLoserIpv6(data, loserIpv6.value);

  handleData(data, delayIpv4.value);
  handleData(data, delayIpv6.value);
  handleData(data, loserIpv4.value);
  handleData(data, loserIpv6.value);
});

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
    color: ['#5087ec'],
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
        type: 'bar',
        barWidth: 20,
        barCategoryGap: 10, // 缩小柱状图之间的间距
        label: {
          show: true,
          position: 'top',
          color: '#5087ec',
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
@import '@/styles/bar-line.scss';
</style>