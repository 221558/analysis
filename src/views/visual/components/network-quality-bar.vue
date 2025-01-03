
<!-- 排名展示-网络质量 -->
<template>
  <div class="chart-box">
    <!-- 省间互访时延排名（IPv4） -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="6">
          <div class="title">省间互访时延排名（IPv4）</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="18">
          <el-form class="form" :inline="true" :model="delayIpv4Form">
            <el-form-item label="时间选择">
              <el-date-picker
                v-model="delayIpv4Form.fileTime"
                type="month"
                :clearable="false"
                placeholder="选择月份"
                value-format="YYYY-MM"
                :disabled-date="disabledDate"
                @change="getDelayIpv4Data(delayIpv4Form)"
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
    <!-- 省间互访时延排名（IPv6） -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="6">
          <div class="title">省间互访时延排名（IPv6）</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="18">
          <el-form class="form" :inline="true" :model="delayIpv6Form">
            <el-form-item label="时间选择">
              <el-date-picker
                v-model="delayIpv6Form.fileTime"
                type="month"
                :clearable="false"
                placeholder="选择月份"
                value-format="YYYY-MM"
                :disabled-date="disabledDate"
                @change="getDelayIpv6Data(delayIpv6Form)"
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
    <!-- 省间互访丢包排名（IPv4） -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="6">
          <div class="title">省间互访丢包排名（IPv4）</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="18">
          <el-form class="form" :inline="true" :model="loserIpv4Form">
            <el-form-item label="时间选择">
              <el-date-picker
                v-model="loserIpv4Form.fileTime"
                type="month"
                :clearable="false"
                placeholder="选择月份"
                value-format="YYYY-MM"
                :disabled-date="disabledDate"
                @change="getLoserIpv4Data(loserIpv4Form)"
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

    <!-- 省间互访丢包排名（IPv6） -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="6">
          <div class="title">省间互访丢包排名（IPv6）</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="18">
          <el-form class="form" :inline="true" :model="loserIpv6Form">
            <el-form-item label="时间选择">
              <el-date-picker
                v-model="loserIpv6Form.fileTime"
                type="month"
                :clearable="false"
                placeholder="选择月份"
                value-format="YYYY-MM"
                :disabled-date="disabledDate"
                @change="getLoserIpv6Data(loserIpv6Form)"
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
  </div>
</template>
<script setup>
// 引入echarts库
import * as echarts from 'echarts';
import { nextTick, onMounted, ref } from 'vue';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// monthDataList
const { monthDataList } = useMixins();
import { getDelayIpv4, getDelayIpv6, getLossIpv4, getLossIpv6 } from '@/api/visual/rankings';

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
const data = ref([]);

// 定义禁用未来日期的函数
const disabledDate = time => {
  // 如果传入的时间大于当前时间，则返回true，表示禁用该日期
  return time.getTime() > Date.now();
};
// 定义一个名为delayIpv4Form的响应式对象，初始值为monthDataList.value[0].value
const delayIpv4Form = ref({ fileTime: monthDataList.value[0].value });
// 定义一个名为delayIpv6Form的响应式对象，初始值为monthDataList.value[0].value
const delayIpv6Form = ref({ fileTime: monthDataList.value[0].value });
// 定义一个名为loserIpv4Form的响应式对象，初始值为monthDataList.value[0].value
const loserIpv4Form = ref({ fileTime: monthDataList.value[0].value });
// 定义一个名为loserIpv6Form的响应式对象，初始值为monthDataList.value[0].value
const loserIpv6Form = ref({ fileTime: monthDataList.value[0].value });

onMounted(() => {
  // 获取IPv4延迟数据
  getDelayIpv4Data(delayIpv4Form.value);
  // 获取IPv6延迟数据
  getDelayIpv6Data(delayIpv6Form.value);
  // 获取IPv4丢包数据
  getLoserIpv4Data(loserIpv4Form.value);
  // 获取IPv6丢包数据
  getLoserIpv6Data(loserIpv6Form.value);
});

// 定义一个函数，用于获取IPv4延迟数据
const getDelayIpv4Data = form => {
  // 调用getDelayIpv4函数，传入form参数
  getDelayIpv4(form).then(res => {
    // 在nextTick函数中处理数据
    nextTick(() => {
      // 调用handleData函数，传入res.data.data和delayIpv4.value参数
      handleData(res.data.data, delayIpv4.value);
    });
  });
};
// 定义一个函数，用于获取延迟IPv6数据
const getDelayIpv6Data = form => {
  // 调用getDelayIpv6函数，传入form参数
  getDelayIpv6(form).then(res => {
    // 在nextTick函数中处理数据
    nextTick(() => {
      // 调用handleData函数，传入res.data.data和delayIpv6.value参数
      handleData(res.data.data, delayIpv6.value);
    });
  });
};
// 定义一个函数，用于获取IPv4数据
const getLoserIpv4Data = form => {
  // 调用getLossIpv4函数，传入form参数
  getLossIpv4(form).then(res => {
    // 在下一个tick中处理数据
    nextTick(() => {
      // 调用handleData函数，传入res.data.data和loserIpv4.value参数
      handleDataLoser(res.data.data, loserIpv4.value);
    });
  });
};
// 定义一个函数，用于获取IPv6数据
const getLoserIpv6Data = form => {
  // 调用getLossIpv6函数，传入form参数
  getLossIpv6(form).then(res => {
    // 在下一个tick中处理数据
    nextTick(() => {
      // 调用handleData函数，传入res.data.data和loserIpv6.value参数
      handleDataLoser(res.data.data, loserIpv6.value);
    });
  });
};

const handleData = (data, ref) => {
  if (!ref) {
    return;
  }
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
      data: data.xaxis,
      axisLabel: {
        interval: 0, // 强制显示所有标签
        // rotate: 45, // 旋转标签以防止重叠
        margin: 10, // 标签与轴线的距离
      },
    },
    // 设置y轴    // 在每个值后面加上单位 "ms"
    yAxis: { type: 'value', axisLabel: { formatter: '{value}ms' } },
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
const handleDataLoser = (data, ref) => {
  if (!ref) {
    return;
  }
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
        return `${data.name} <br> ${data.marker}${data.seriesName} \u00A0${data.value}`;
      },
    },
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
    // 设置y轴    // 在每个值后面加上单位 "ms"
    yAxis: { type: 'value', axisLabel: { formatter: '{value}' } },
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