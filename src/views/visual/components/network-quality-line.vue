<!-- 趋势展示-网络质量 -->
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
              <el-form class="form" :inline="true" :model="delayIpv4Form">
                <el-form-item label="省份">
                  <el-select
                    style="width: 90px"
                    v-model="delayIpv4Form.province"
                    placeholder="全国"
                    @change="getDelayIpv4Data(delayIpv4Form)"
                  >
                    <el-option
                      v-for="item in provinceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="delayIpv4TimeList"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    :clearable="false"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    @change="getDelayIpv4Data(delayIpv4Form)"
                    :disabled-date="disabledDate"
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
              <el-form class="form" :inline="true" :model="delayIpv6Form">
                <el-form-item label="省份">
                  <el-select
                    style="width: 90px"
                    v-model="delayIpv6Form.province"
                    placeholder="全国"
                    @change="getDelayIpv6Data(delayIpv6Form)"
                  >
                    <el-option
                      v-for="item in provinceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="delayIpv6TimeList"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    :clearable="false"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    @change="getDelayIpv6Data(delayIpv6Form)"
                    :disabled-date="disabledDate"
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
              <el-form class="form" :inline="true" :model="loserIpv4Form">
                <el-form-item label="省份">
                  <el-select
                    style="width: 90px"
                    v-model="loserIpv4Form.province"
                    placeholder="全国"
                    @change="getLoserIpv4Data(loserIpv4Form)"
                  >
                    <el-option
                      v-for="item in provinceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="loserIpv4TimeList"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    :clearable="false"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    @change="getLoserIpv4Data(loserIpv4Form)"
                    :disabled-date="disabledDate"
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
              <el-form class="form" :inline="true" :model="loserIpv6Form">
                <el-form-item label="省份">
                  <el-select
                    style="width: 90px"
                    v-model="loserIpv6Form.province"
                    placeholder="全国"
                    @change="getLoserIpv6Data(loserIpv4Form)"
                  >
                    <el-option
                      v-for="item in provinceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="loserIpv6TimeList"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    :clearable="false"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    @change="getLoserIpv6Data(loserIpv4Form)"
                    :disabled-date="disabledDate"
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
import { ref, onMounted, onUnmounted, watchEffect, nextTick } from 'vue';
import { getDelayIpv4, getDelayIpv6, getLossIpv4, getLossIpv6 } from '@/api/visual/trend-display';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// monthDataList
const { monthDataList } = useMixins();
// 定义一个响应式变量来存储屏幕宽度
const screenWidth = ref(window.innerWidth);
const isSmallScreen = ref(screenWidth.value < 768);
const handleResize = () => {
  screenWidth.value = window.innerWidth;
};
watchEffect(() => {
  isSmallScreen.value = screenWidth.value < 1566;
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

const provinceList = ref([{ label: '全国', value: '全国' }]);
const delayIpv4Form = ref({ province: provinceList.value[0].value, startTime: '', endTime: '' });
const delayIpv6Form = ref({ province: provinceList.value[0].value, startTime: '', endTime: '' });
const loserIpv4Form = ref({ province: provinceList.value[0].value, startTime: '', endTime: '' });
const loserIpv6Form = ref({ province: provinceList.value[0].value, startTime: '', endTime: '' });
const delayIpv4TimeList = ref([]);
const delayIpv6TimeList = ref([]);
const loserIpv4TimeList = ref([]);
const loserIpv6TimeList = ref([]);

// 在组件挂载时添加事件监听器
onMounted(() => {
  window.addEventListener('resize', handleResize);
  getHandleData();
});

// 定义禁用未来日期的函数
const disabledDate = time => {
  // 如果传入的时间大于当前时间，则返回true，表示禁用该日期
  return time.getTime() > Date.now();
};

const setFormAndTimeList = timeList => {
  if (monthDataList.value && monthDataList.value.length > 0) {
    const length = monthDataList.value.length - 1;
    timeList.value[0] = monthDataList.value[0].value;
    timeList.value[1] = monthDataList.value[length].value;
    nextTick(() => {
      getDelayIpv4Data(delayIpv4Form.value);
      getDelayIpv6Data(delayIpv6Form.value);
      getLoserIpv4Data(loserIpv4Form.value);
      getLoserIpv6Data(loserIpv6Form.value);
    });
  }
};
const getHandleData = () => {
  setFormAndTimeList(delayIpv4TimeList);
  setFormAndTimeList(delayIpv6TimeList);
  setFormAndTimeList(loserIpv4TimeList);
  setFormAndTimeList(loserIpv6TimeList);
};
const getDelayIpv4Data = form => {
  getDelayIpv4(handleTime(form, delayIpv4TimeList.value)).then(res => {
    nextTick(() => {
      handleData(res.data.data, delayIpv4.value);
    });
  });
};
const getDelayIpv6Data = form => {
  getDelayIpv6(handleTime(form, delayIpv6TimeList.value)).then(res => {
    nextTick(() => {
      handleData(res.data.data, delayIpv6.value);
    });
  });
};
const getLoserIpv4Data = form => {
  getLossIpv4(handleTime(form, loserIpv4TimeList.value)).then(res => {
    nextTick(() => {
      handleData(res.data.data, loserIpv4.value);
    });
  });
};
const getLoserIpv6Data = form => {
  getLossIpv6(handleTime(form, loserIpv6TimeList.value)).then(res => {
    nextTick(() => {
      handleData(res.data.data, loserIpv6.value);
    });
  });
};

const handleTime = (form, timeList) => {
  form.startTime = timeList[0];
  form.endTime = timeList[1];
  return form;
};

const handleData = (data, ref) => {
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
      data: data.xaxis,
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
        data: data.yaxis,
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
// 在组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
// 导入样式文件
@use '@/styles/bar-line.scss';
</style>