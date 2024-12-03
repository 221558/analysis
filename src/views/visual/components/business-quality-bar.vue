<!-- 排名展示-业务质量 -->
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
          <el-form class="form" :inline="true" :model="form">
            <el-form-item label="业务选择">
              <el-select
                style="width: 120px"
                v-model="form.businessType"
                placeholder="选择业务"
                @change="getExperienceEanking(form)"
              >
                <el-option
                  v-for="item in businesstypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="时间选择">
              <el-date-picker
                v-model="form.fileTime"
                type="month"
                :clearable="false"
                placeholder="选择月份"
                value-format="YYYY-MM"
                :disabled-date="disabledDate"
                @change="getExperienceEanking(form)"
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
import { nextTick, onMounted, ref } from 'vue';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// monthDataList
const { monthDataList } = useMixins();

import { getBusinesstypeList, getExperience } from '@/api/visual/rankings';

// 定义一个响应式变量activeName，初始值为'first'
const activeName = ref('first');

// 定义一个响应式变量experienceEanking，初始值为null
const experienceEanking = ref(null);
const businesstypeList = ref([]);
const data = ref([]);
const form = ref({ businessType: '', fileTime: '' });

// 定义禁用未来日期的函数
const disabledDate = time => {
  // 如果传入的时间大于当前时间，则返回true，表示禁用该日期
  return time.getTime() > Date.now();
};

onMounted(() => {
  // 调用getBusinesstypeList函数，获取业务类型列表
  getBusinesstypeList().then(res => {
    // 将获取到的数据赋值给businesstypeList
    businesstypeList.value = res.data.data;
    // 设置表单中的businessType值为businesstypeList中的第一个元素的value值
    form.value.businessType = businesstypeList.value[0].value;
    // 设置表单中的fileTime值为monthDataList中的第一个元素的value值
    form.value.fileTime = monthDataList.value[0].value;
    // 在下一个tick中调用getExperienceEanking函数，并传入表单的值
    nextTick(() => {
      getExperienceEanking(form.value);
    });
  });
});

const getExperienceEanking = form => {
  getExperience(form).then(res => {
    data.value = res.data.data;
    nextTick(() => {
      // 调用handleData函数，处理数据并生成图表
      handleData(data.value);
    });
  });
};

// 定义一个函数，用于处理数据并生成图表
const handleData = data => {
  // 初始化图表
  let myChart = echarts.init(experienceEanking.value, null, {
    renderer: 'canvas',
    useDirtyRect: false,
  });
  // 定义图表的配置项
  let option = {
    color: ['#5087ec'],
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    // 设置图表的网格
    grid: { top: '10%', left: '1%', right: '1%', bottom: '5%', containLabel: true },
    // 设置x轴
    xAxis: {
      type: 'category',
      data: data.xaxis,
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
        data: data.yaxis,
        type: 'bar',
        barWidth: 20,
        barCategoryGap: 10, // 缩小柱状图之间的间距
        label: {
          show: true,
          position: 'top',
          color: '#5087ec',
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
</script>


<style lang="scss" scoped>
// 导入样式文件
@use '@/styles/bar-line.scss';
</style>