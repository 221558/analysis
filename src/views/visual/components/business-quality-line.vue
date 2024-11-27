<template>
  <div class="chart-box">
    <!-- 外层容器 -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="4">
          <div class="title">业务体验指数排名</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="20">
          <el-form class="form" :inline="true" :model="formInline">
            <el-form-item label="省份">
              <el-select style="width: 120px" v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务选择">
              <el-select style="width: 120px" v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间选择">
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
      <div ref="experienceEanking" style="height: 600px" />
    </div>
  </div>
</template>
<script setup>
// 引入echarts库
import * as echarts from 'echarts';
// 导入onMounted和ref函数
import { onMounted, ref } from 'vue';
// 定义一个响应式变量activeName，初始值为'first'
const activeName = ref('first');
// 定义一个响应式变量experienceEanking，初始值为null
const experienceEanking = ref(null);
// 定义一个响应式变量value2，初始值为空字符串
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

onMounted(() => {
  // getExperienceEanking(data, experienceEanking.value);
  handleData(data, experienceEanking.value);
});

// const getExperienceEanking= (data, ref) => {
//   handleData(data, ref);
// };

// 定义一个函数，用于处理数据并生成图表
const handleData = (data, ref) => {
  // 获取数据的标签
  const labels = data.map(item => item.label);
  // 获取数据的值
  const values = data.map(item => item.value);
  // 初始化图表
  let myChart = echarts.init(ref, null, { renderer: 'canvas', useDirtyRect: false });
  // 定义图表的配置项
  let option = {
    color: ['#259eff'],
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
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
    yAxis: { type: 'value' },
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
          // formatter: params => params.data + 'ms',
        },
      },
    ],
  };
  // 如果配置项存在且为对象，则设置图表的配置项
  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }
  // 监听窗口大小变化，重新调整图表大小
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